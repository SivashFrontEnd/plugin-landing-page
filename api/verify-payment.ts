import type { VercelRequest, VercelResponse } from "@vercel/node";

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
    const invoiceId = body?.invoiceId;

    if (!invoiceId) {
      throw new Error("invoiceId is required");
    }

    const MONOBANK_TOKEN = process.env.MONOBANK_TOKEN;
    if (!MONOBANK_TOKEN) throw new Error("MONOBANK_TOKEN is not configured.");

    const response = await fetch(
      `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`,
      { headers: { "X-Token": MONOBANK_TOKEN } }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errText || "Failed to check invoice status");
    }

    const invoiceData = await response.json();

    return setCors(res).status(200).json({
      status: invoiceData.status,
      invoiceId: invoiceData.invoiceId,
      amount: invoiceData.amount,
      reference: invoiceData.reference,
      failureReason: invoiceData.failureReason,
      errCode: invoiceData.errCode,
      modifiedDate: invoiceData.modifiedDate,
    });
  } catch (error: any) {
    console.error("verify-payment error:", error);
    return setCors(res).status(400).json({ error: error.message ?? "Unexpected error" });
  }
}