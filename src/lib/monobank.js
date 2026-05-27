/**
 * Creates a MonoBank invoice by calling a Vercel API Function.
 * @param {string} email - Customer email address
 * @returns {Promise<{ pageUrl: string; reference?: string; invoiceId?: string }>}
 */
export async function createMonoBankInvoice(email) {
  try {
    const response = await fetch('/api/create-monobank-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerEmail: email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Не вдалося створити рахунок');
    }

    if (!data?.pageUrl) {
      throw new Error('Не вдалося отримати посилання на оплату.');
    }

    return {
      pageUrl: data.pageUrl,
      reference: data.reference,
      invoiceId: data.invoiceId,
    };
  } catch (error) {
    console.error('MonoBank invoice creation error:', error);
    throw error;
  }
}