import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PaymentRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking');
  const invoiceId = searchParams.get('invoiceId');
  const reference = searchParams.get('reference');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      let currentInvoiceId = invoiceId;

      // Если invoiceId не передан, пытаемся найти его по reference через API
      if (!currentInvoiceId && reference) {
        try {
          const res = await fetch(`/api/get-invoice-by-reference?reference=${reference}`);
          const data = await res.json();
          if (data?.invoice_id) {
            currentInvoiceId = data.invoice_id;
          }
        } catch (error) {
          console.error('Error fetching invoiceId:', error);
        }
      }

      if (!currentInvoiceId) {
        console.error('invoiceId not found');
        setStatus('error');
        setTimeout(() => {
          navigate(`/payment/fail?reference=${reference || ''}`, { replace: true });
        }, 2000);
        return;
      }

      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceId: currentInvoiceId }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error('Error checking payment status:', data.error);
          setStatus('error');
          setTimeout(() => {
            navigate(`/payment/fail?reference=${reference || ''}`, { replace: true });
          }, 2000);
          return;
        }

        const paymentStatus = data?.status;

        if (paymentStatus === 'success') {
          navigate(`/payment/success?reference=${reference || ''}`, { replace: true });
        } else if (['failure', 'expired', 'reversed'].includes(paymentStatus)) {
          navigate(`/payment/fail?reference=${reference || ''}`, { replace: true });
        } else if (['processing', 'hold', 'created'].includes(paymentStatus)) {
          setTimeout(() => checkPaymentStatus(), 2000);
        } else {
          navigate(`/payment/fail?reference=${reference || ''}`, { replace: true });
        }
      } catch (error) {
        console.error('Error in checkPaymentStatus:', error);
        setStatus('error');
        setTimeout(() => {
          navigate(`/payment/fail?reference=${reference || ''}`, { replace: true });
        }, 2000);
      }
    };

    checkPaymentStatus();

    const timeout = setTimeout(() => {
      if (status === 'checking') {
        navigate(`/payment/fail?reference=${reference || ''}`, { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [invoiceId, reference, navigate, status]);

  return (
    <>
      <Helmet>
        <title>Перевірка оплати — ПриватБанк плагін</title>
        <meta name="description" content="Перевірка статусу оплати..." />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-4">
        <div className="max-w-md w-full bg-gray-900/60 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 mx-auto mb-6 animate-spin" />
          <h1 className="text-2xl font-bold mb-4">Перевірка оплати...</h1>
          <p className="text-gray-300">
            Будь ласка, зачекайте. Ми перевіряємо статус вашого платежу.
          </p>
        </div>
      </section>
    </>
  );
};

export default PaymentRedirect;
