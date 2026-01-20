import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1920&q=80"
          alt="Club Elite Luxury Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl mb-6 bg-gradient-to-r from-[#C39738] via-white to-[#9D50BB] bg-clip-text text-transparent">
            CLUB ÉLITE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-body text-white/80 text-lg md:text-xl max-w-2xl mb-12"
        >
          Where luxury meets the night. Experience the pinnacle of sophisticated entertainment.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="px-12 py-4 rounded-2xl backdrop-blur-[60px] bg-gradient-to-r from-[#9D50BB]/30 to-[#C39738]/30 border border-white/10 text-white font-body text-lg hover:border-[#9D50BB]/50 transition-all duration-300 shadow-lg hover:shadow-[#9D50BB]/20"
        >
          Explore Offerings
        </motion.button>
      </motion.div>
    </div>
  );
}
