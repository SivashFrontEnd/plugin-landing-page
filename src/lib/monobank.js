import { supabase } from '@/lib/customSupabaseClient';

/**
 * Creates a MonoBank invoice by calling a Supabase Edge Function.
 * @param {string} email - Customer email address
 * @returns {Promise<string>} - Payment page URL
 */
export async function createMonoBankInvoice(email) {
  try {
    const { data, error } = await supabase.functions.invoke('create-invoice', {
      body: JSON.stringify({
        email,
        amount: 80000, // Amount in kopiykas (1 UAH for testing, as requested sum was 100)
        productName: 'Плагін "Оплата частинами та Миттєва розстрочка ПриватБанк"',
      }),
    });

    if (error) {
      throw new Error(error.message || 'Не вдалося створити рахунок');
    }

    if (!data.pageUrl) {
      throw new Error('Не вдалося отримати посилання на оплату.');
    }

    return data.pageUrl;
  } catch (error) {
    console.error('MonoBank invoice creation error:', error);
    throw error;
  }
}