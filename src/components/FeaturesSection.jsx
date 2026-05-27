import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Download, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Покупка один раз',
    description: 'Без ліцензій та щорічних платежів',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Збільшення продажів',
    description: 'На Вашому сайті',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    icon: Download,
    title: 'Проста установка',
    description: 'З ZIP-файла',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Headphones,
    title: 'Підтримка',
    description: 'Та допомога в налаштуванні',
    gradient: 'from-pink-500 to-cyan-500',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Переваги <span className="neon-text text-cyan-200">плагіну</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Все, що потрібно для успішних продажів
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-cyan-500/60 neon-glow-hover">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;