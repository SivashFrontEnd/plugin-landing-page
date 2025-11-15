import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Плагін "Оплата частинами та Миттєва розстрочка ПриватБанк" для WooCommerce</title>
        <meta name="description" content="Збільште продажі на Вашому сайті з плагіном оплати частинами ПриватБанк для WooCommerce WordPress. Покупка один раз, без ліцензій." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <HeroSection />
        <FeaturesSection />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;