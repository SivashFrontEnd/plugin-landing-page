import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const DEFAULT_SITE_URL = "https://oplata-chastynamy.online";

const setCors = (res: VercelResponse) =>
  res
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    return setCors(res).status(200).end("ok");
  }

  try {
    const body = req.body;
    const amount = Number(process.env.PLUGIN_PRICE_KOPIYKAS ?? 84000);
    const customerEmail = String(body?.customerEmail ?? "").trim();
    const productName = "Оплата частинами та Миттєва розстрочка ПриватБанк";

    if (!amount || !Number.isInteger(amount) || amount <= 0) {
      throw new Error("Invalid amount. Provide value in kopiykas (integer > 0).");
    }
    if (!customerEmail) {
      throw new Error("Customer email is required.");
    }

    const MONOBANK_TOKEN = process.env.MONOBANK_TOKEN;
    if (!MONOBANK_TOKEN) throw new Error("MONOBANK_TOKEN is not configured.");

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) throw new Error("DATABASE_URL is not configured.");

    const sql = neon(DATABASE_URL);

    const SITE_URL = (process.env.PUBLIC_SITE_URL ?? req.headers.origin ?? DEFAULT_SITE_URL).replace(/\/$/, "");
    const WEBHOOK_URL = `${SITE_URL}/api/payment-webhook`;

    const reference = `order_${Date.now()}`;
    const successUrl = `${SITE_URL}/payment/success?reference=${reference}`;
    const failUrl = `${SITE_URL}/payment/fail?reference=${reference}`;
    const redirectUrl = `${SITE_URL}/payment/redirect?reference=${reference}`;

    const invoicePayload = {
      amount,
      ccy: 980,
      merchantPaymInfo: {
        reference,
        destination: `Оплата за плагін: ${productName}`,
        customerEmails: [customerEmail],
        basketOrder: [
          {
            name: productName,
            qty: 1,
            sum: amount,
            total: amount,
            code: "plugin_privatbank_001",
            unit: "шт.",
            tax: [2],
          },
        ],
      },
      redirectUrl,
      successUrl,
      failUrl,
      webHookUrl: WEBHOOK_URL,
      validity: 3600,
    };

    const response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": MONOBANK_TOKEN,
        "X-Cms": "React-Landing",
        "X-Cms-Version": "1.0.0",
      },
      body: JSON.stringify(invoicePayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errText || "MonoBank API request failed");
    }
    if (!data.invoiceId || !data.pageUrl) {
      throw new Error("MonoBank response missing invoiceId or pageUrl.");
    }

    try {
      await sql`
        INSERT INTO orders (email, invoice_id, amount, status, reference)
        VALUES (${customerEmail}, ${data.invoiceId}, ${amount}, 'pending', ${reference})
      `;
    } catch (dbError) {
      console.error("Error saving order to database:", dbError);
    }

    return setCors(res).status(200).json({
      pageUrl: data.pageUrl,
      invoiceId: data.invoiceId,
      reference,
      successUrl,
      failUrl,
      redirectUrl,
    });
  } catch (error: any) {
    console.error("create-monobank-invoice error:", error);
    return setCors(res).status(400).json({ error: error.message ?? "Unexpected error" });
  }
}