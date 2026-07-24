import React from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  recipientName: string;
  subtitle: string;
  onScrollToLetter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  subtitle,
  onScrollToLetter,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between px-4 sm:px-12 py-6 sm:py-8 pt-4 sm:pt-6 z-10 select-none">
      {/* Top Minimal Navigation Bar */}
      <nav className="h-14 sm:h-16 flex items-center justify-between z-10 w-full max-w-7xl mx-auto border-b border-[#FCE4EC]/80 pb-3 sm:pb-4">
        <span className="text-lg sm:text-2xl font-serif italic text-[#D81B60] font-semibold tracking-tighter uppercase">
          With Love
        </span>
        <div className="flex gap-3 sm:gap-10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-[#4A4A4A]">
          <button onClick={onScrollToLetter} className="hover:text-[#D81B60] transition-colors py-2 px-1 cursor-pointer">
            The Letter
          </button>
          <button onClick={() => document.getElementById('our-memories')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D81B60] transition-colors py-2 px-1 cursor-pointer">
            Memories
          </button>
          <button onClick={() => document.getElementById('the-question')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#D81B60] transition-colors py-2 px-1 cursor-pointer">
            Forgiveness
          </button>
        </div>
      </nav>

      {/* Hero Headline & Title */}
      <div className="max-w-4xl mx-auto my-auto py-8 sm:py-12 text-center flex flex-col items-center justify-center w-full px-2">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-pill px-4 py-1.5 sm:px-5 sm:py-2 rounded-full flex items-center gap-2 border border-[#FCE4EC] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D81B60] animate-pulse" />
            <span className="text-[9px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#D81B60] uppercase">
              A Special Message For Bornaa
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-serif text-[#333333] font-medium leading-[1.12] tracking-tight">
              I am so <br />
              <span className="italic text-[#D81B60] underline decoration-[#FCE4EC] decoration-4 sm:decoration-8 underline-offset-4 sm:underline-offset-8">
                sorry, {recipientName}...
              </span>
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="absolute -top-5 -right-4 sm:-top-8 sm:-right-8 text-[#D81B60]"
            >
              <Heart className="w-6 h-6 sm:w-10 sm:h-10 fill-[#FCE4EC] text-[#D81B60] animate-pulse-glow" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-2xl font-serif text-[#555555] max-w-2xl mx-auto leading-relaxed mt-1 sm:mt-2 px-2"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-col items-center gap-2 cursor-pointer group pb-6"
        onClick={onScrollToLetter}
      >
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#D81B60] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
          Open My Letter
        </span>
        <div className="p-3 rounded-full bg-white/70 border border-white/90 shadow-md backdrop-blur-md group-hover:bg-white group-hover:scale-110 transition-all duration-300">
          <ChevronDown className="w-4 h-4 text-[#D81B60] animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

