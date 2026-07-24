import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Mail, Sparkles, Feather } from 'lucide-react';

interface ApologyLetterSectionProps {
  recipientName: string;
  senderName: string;
  letterText: string;
}

export const ApologyLetterSection: React.FC<ApologyLetterSectionProps> = ({
  recipientName,
  senderName,
  letterText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="apology-letter" className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE4EC]/70 text-[#D81B60] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 border border-[#FCE4EC]"
        >
          <Feather className="w-3.5 h-3.5 text-[#D81B60]" />
          The Letter • From My Heart
        </motion.div>
        <h2 className="text-4xl sm:text-6xl font-serif font-medium text-[#333333]">
          A Letter For You
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#555555] uppercase tracking-[0.2em] opacity-70 mt-2">
          Click the seal to open my message
        </p>
      </div>

      <div className="relative flex justify-center items-center min-h-[460px]">
        {/* Decorative background glow pods from Clean Minimalism aesthetic */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#FCE4EC] rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-[#E1BEE7] rounded-full blur-3xl opacity-50 pointer-events-none" />

        {!isOpen ? (
          /* Closed Glassmorphism Envelope */
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer relative w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 border border-white/80 shadow-2xl text-center flex flex-col items-center justify-center overflow-hidden group"
          >
            <div className="relative z-10 my-6">
              <div className="w-20 h-20 rounded-full bg-[#D81B60] text-white flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-110 transition-all duration-300 ring-8 ring-[#FCE4EC]">
                <Heart className="w-10 h-10 fill-white animate-pulse" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#333333] mb-2 font-medium">
              For {recipientName}
            </h3>
            <p className="text-[11px] font-semibold tracking-widest text-[#4A4A4A] opacity-60 uppercase">
              Sealed with sincerity • Tap to open
            </p>

            <div className="mt-6 flex items-center gap-2 text-[#D81B60] text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <Mail className="w-4 h-4" />
              <span>Unseal Letter</span>
            </div>
          </motion.div>
        ) : (
          /* Opened Letter View */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              className="relative w-full bg-white/70 backdrop-blur-2xl rounded-[40px] p-6 sm:p-12 border border-white/90 shadow-2xl"
            >
              <div className="bg-[#FFFDF9] rounded-[32px] p-6 sm:p-10 border border-[#FCE4EC] shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#FCE4EC] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D81B60]" />
                    <span className="text-[11px] font-bold tracking-[0.25em] text-[#D81B60] uppercase">
                      My Apology
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-[#D81B60] hover:underline font-semibold tracking-wider uppercase transition-colors"
                  >
                    Reseal
                  </button>
                </div>

                {/* Letter Body Text */}
                <div className="font-serif text-lg sm:text-xl text-[#4A4A4A] leading-relaxed whitespace-pre-line space-y-4">
                  {letterText}
                </div>

                {/* Sender Signature */}
                <div className="mt-8 pt-6 border-t border-[#FCE4EC] flex flex-col items-end">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[1px] bg-[#D81B60] opacity-40" />
                    <span className="text-sm font-serif italic text-[#4A4A4A] opacity-70">Forever yours,</span>
                  </div>
                  <span className="font-handwriting text-3xl sm:text-4xl text-[#D81B60] font-bold mt-1">
                    {senderName}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

