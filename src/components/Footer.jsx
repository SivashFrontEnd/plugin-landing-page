import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-cyan-500/20">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold neon-text text-cyan-400 mb-2">
              JSDevPro
            </p>
            <p className="text-gray-400">
              Професійні рішення для WordPress
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="https://jsdevpro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group"
            >
              <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>jsdevpro.com</span>
            </a>

            <a
              href="https://www.instagram.com/jsdevpro/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>@jsdevpro</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-cyan-500/20 text-center text-gray-500 text-sm"
        >
          <p>© 2025 JSDevPro. Всі права захищені.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;