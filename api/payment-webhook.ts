import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { list, generateSignedUrl } from "@vercel/blob";

const setCors = (res: VercelResponse) =>
  res
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return setCors(res).status(200).end("ok");
  }

  try {
    const webhookData = req.body;
    const invoiceId = webhookData?.invoiceId;
    const status = webhookData?.status;
    const modifiedDate = webhookData?.modifiedDate;

    if (!invoiceId) {
      return setCors(res).status(400).json({ error: "invoiceId is required" });
    }

    console.log(`Webhook received: invoiceId=${invoiceId}, status=${status}`);

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) throw new Error("DATABASE_URL is not configured.");

    const sql = neon(DATABASE_URL);

    let reference = webhookData?.reference;
    if (!reference) {
      const rows = await sql`SELECT reference FROM orders WHERE invoice_id = ${invoiceId} LIMIT 1`;
      if (rows[0]) reference = rows[0].reference;
    }

    const paymentData = {
      invoice_id: invoiceId,
      status,
      amount: webhookData?.amount,
      reference,
      failure_reason: webhookData?.failureReason,
      err_code: webhookData?.errCode,
      modified_date: modifiedDate ? new Date(modifiedDate).toISOString() : null,
      created_date: webhookData?.createdDate ? new Date(webhookData.createdDate).toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const existing = await sql`SELECT modified_date FROM payments WHERE invoice_id = ${invoiceId} LIMIT 1`;

    if (existing[0] && modifiedDate) {
      const existingMs = existing[0].modified_date ? new Date(existing[0].modified_date).getTime() : 0;
      const newMs = new Date(modifiedDate).getTime();
      if (newMs > existingMs) {
        await sql`
          UPDATE payments SET
            status = ${paymentData.status},
            amount = ${paymentData.amount},
            reference = ${paymentData.reference},
            failure_reason = ${paymentData.failure_reason},
            err_code = ${paymentData.err_code},
            modified_date = ${paymentData.modified_date},
            updated_at = ${paymentData.updated_at}
          WHERE invoice_id = ${invoiceId}
        `;
        console.log(`Payment updated: invoiceId=${invoiceId}, status=${status}`);
      } else {
        console.log("Skipping update: existing modifiedDate is newer");
      }
    } else {
      await sql`
        INSERT INTO payments (invoice_id, status, amount, reference, failure_reason, err_code, modified_date, created_date, updated_at)
        VALUES (
          ${paymentData.invoice_id}, ${paymentData.status}, ${paymentData.amount},
          ${paymentData.reference}, ${paymentData.failure_reason}, ${paymentData.err_code},
          ${paymentData.modified_date}, ${paymentData.created_date}, ${paymentData.updated_at}
        )
      `;
      console.log(`Payment created: invoiceId=${invoiceId}, status=${status}`);
    }

    if (["success", "failure", "expired", "reversed"].includes(status)) {
      const orderStatus = status === "success" ? "paid" : "failed";
      await sql`
        UPDATE orders SET status = ${orderStatus}, updated_at = ${new Date().toISOString()}
        WHERE invoice_id = ${invoiceId}
      `;
    }

    if (status === "success") {
      try {
        const orderRows = await sql`SELECT email FROM orders WHERE invoice_id = ${invoiceId} LIMIT 1`;
        const email = orderRows[0]?.email;

        if (email) {
          const { blobs } = await list({ prefix: "privatbank-plugin.zip" });
          const blob = blobs[0];

          if (!blob) throw new Error("ZIP file not found in Blob storage");

          const signedUrl = await generateSignedUrl(blob.url, { expiresIn: 3600 });

          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (RESEND_API_KEY) {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "JsDevPro <noreply@oplata-chastynamy.online>",
                to: email,
                subject: "Ваш плагін готовий до завантаження",
                html: `
                  <h2>Дякуємо за покупку!</h2>
                  <p>Ваш плагін готовий до завантаження:</p>
                  <a href="${signedUrl}">Завантажити ZIP</a>
                  <p>Посилання дійсне протягом 1 години.</p>
                `,
              }),
            });
            console.log(`Email sent to ${email}`);
          }
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return setCors(res).status(200).json({ success: true, status });
  } catch (error: any) {
    console.error("payment-webhook error:", error);
    return setCors(res).status(500).json({ error: error.message ?? "Unexpected error" });
  }
}