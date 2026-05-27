import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import VideoInstruction from '@/components/VideoInstruction';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Оплата частинами та Миттєва розстрочка ПриватБанк</title>
        <meta
          name="description"
          content="Плагін Оплата частинами та Миттєва розстрочка ПриватБанк – швидка покупка для ваших клієнтів."
        />
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <HeroSection />
        <FeaturesSection />
        <VideoInstruction />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

