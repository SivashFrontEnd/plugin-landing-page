import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoInstruction = () => {
  const videoId = 'yUVfQ0Yx0js';
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="neon-text text-cyan-200">Відео</span> інструкція
          </h2>
          <p className="text-gray-400 text-lg">
            Дізнайтеся, як швидко налаштувати та використовувати плагін
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-4 md:p-6 overflow-hidden neon-glow-hover group-hover:border-cyan-500/60 transition-all duration-300">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <iframe
                src={embedUrl}
                title="Відео інструкція"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="mt-4 text-center">
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                <Play className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                <span className="text-sm md:text-base">Відкрити на YouTube</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoInstruction;

