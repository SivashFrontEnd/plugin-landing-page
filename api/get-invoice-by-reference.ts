import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const reference = req.query.reference as string;

    if (!reference) {
      return res.status(400).json({ error: "reference is required" });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      SELECT invoice_id FROM orders WHERE reference = ${reference} LIMIT 1
    `;

    if (!rows[0]) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ invoice_id: rows[0].invoice_id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}