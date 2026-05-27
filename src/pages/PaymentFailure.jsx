import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <>
      <Helmet>
        <title>Оплата не пройшла — ПриватБанк плагін</title>
        <meta
          name="description"
          content="Оплату не завершено. Повторіть спробу або зверніться до підтримки."
        />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-4">
        <div className="max-w-2xl w-full bg-gray-900/60 border border-red-500/30 rounded-2xl p-8 shadow-2xl text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Оплату не завершено</h1>
          <p className="text-gray-300 text-lg mb-6">
            Платіж було скасовано або сталася помилка під час обробки. Ви можете повторити спробу пізніше.
          </p>

          {reference && (
            <div className="mb-6">
              <p className="text-sm text-gray-400">Номер замовлення:</p>
              <p className="font-mono text-red-300 break-all">{reference}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition"
            >
              Спробувати ще раз
            </Link>
            <a
              href="https://t.me/jsdevpro"
              className="px-6 py-3 rounded-full border border-white/30 hover:border-white text-white font-semibold transition"
            >
              Написати у підтримку
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentFailure;

