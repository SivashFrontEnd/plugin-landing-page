import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <>
      <Helmet>
        <title>Оплата успішна — ПриватБанк плагін</title>
        <meta
          name="description"
          content="Оплата успішна. Перевірте електронну пошту для отримання плагіна."
        />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-4">
        <div className="max-w-2xl w-full bg-gray-900/60 border border-emerald-500/40 rounded-2xl p-8 shadow-2xl text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Дякуємо за оплату!</h1>
          <p className="text-gray-300 text-lg mb-6">
            Ми вже надіслали лист із посиланням на завантаження плагіна на вашу електронну адресу.
          </p>

          {reference && (
            <div className="mb-6">
              <p className="text-sm text-gray-400">Номер замовлення:</p>
              <p className="font-mono text-emerald-300 break-all">{reference}</p>
            </div>
          )}

          <p className="text-gray-400 mb-8">
            Якщо лист не зʼявився у вхідних, перевірте папку «Спам» або зверніться до нашої підтримки.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
            >
              Повернутися на головну
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

export default PaymentSuccess;

