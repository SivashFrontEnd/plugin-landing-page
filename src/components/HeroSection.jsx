import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { createMonoBankInvoice } from '@/lib/monobank';
import woo from "@/assets/images/woo.png";

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePurchase = async () => {
    if (!email.trim()) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть Ваш email",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть коректний email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const paymentUrl = await createMonoBankInvoice(email);
      
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      toast({
        title: "Помилка",
        description: error.message || "Виникла помилка при створенні платежу. Спробуйте ще раз.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20"></div>
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Офіційний плагін для WooCommerce</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Плагін <span className="neon-text text-cyan-400">"Оплата частинами"</span> та{' '}
              <span className="neon-text text-cyan-400">Миттєва розстрочка</span> ПриватБанк
            </h1>

            <p className="text-lg md:text-xl text-gray-300">
              для WooCommerce WordPress
            </p>

            <p className="text-gray-400 text-lg">
              Збільште конверсію продажів на 40% завдяки можливості оплати частинами. 
              Простий у встановленні, без щомісячних платежів.
            </p>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Введіть Ваш email для отримання файлу після оплати"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900/50 border-cyan-500/30 focus:border-cyan-500 text-white placeholder:text-gray-500 h-14 text-lg"
              />

              <Button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 neon-glow neon-glow-hover transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isLoading ? 'Обробка...' : 'КУПИТИ'}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Безпечна оплата через MonoBank
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden neon-glow">
              <img 
                className="w-full h-auto rounded-2xl" 
                alt="ПриватБанк WooCommerce плагін"
               src={woo} />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;