import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X } from 'lucide-react';

export const CuteWhiteTeddy: React.FC = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const waveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cuteMessages = [
    "Bornaa, please forgive him! 🧸🌹",
    "Sending you a huge teddy bear hug, Bornaa! 💕",
    "He loves you with all his heart! 🥹💖",
    "You're the sweetest person in the world! ✨",
    "Pretty please say YES! 🌸",
    "Raju is a good guy,please forgive him."
  ];

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    };
  }, []);

  const handleTeddyClick = () => {
    setIsWaving(true);
    setShowSpeechBubble(true);
    setClickCount((prev) => prev + 1);

    if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    waveTimerRef.current = setTimeout(() => {
      setIsWaving(false);
    }, 1800);

    // Auto-minimize/hide speech bubble after 3.5 seconds
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 3500);
  };

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSpeechBubble(false);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
  };

  return (
    <div className="fixed bottom-14 right-2 sm:bottom-20 sm:right-6 z-40 select-none pointer-events-auto">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={handleCloseBubble}
            className="absolute bottom-28 sm:bottom-36 right-0 sm:right-4 w-48 sm:w-56 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl rounded-br-xs border-2 border-[#FCE4EC] shadow-xl text-center cursor-pointer group/bubble"
          >
            {/* Small Close Button */}
            <button
              onClick={handleCloseBubble}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D81B60] text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
              title="Close message"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[#D81B60] font-medium text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin shrink-0" />
              <span>{cuteMessages[clickCount % cuteMessages.length]}</span>
            </div>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b-2 border-r-2 border-[#FCE4EC] transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles when interacted */}
      {isWaving && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -30, scale: 1.4 }}
            transition={{ duration: 1 }}
          >
            <Heart className="w-5 h-5 fill-[#D81B60] text-[#D81B60]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -40, scale: 1.2 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <Heart className="w-4 h-4 fill-[#F48FB1] text-[#F48FB1]" />
          </motion.div>
        </div>
      )}

      {/* White Cute Teddy Bear Body Container */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTeddyClick}
        className="cursor-pointer group relative flex flex-col items-center"
        title="Tap the cute teddy bear!"
      >
        {/* Helper Badge */}
        <div className="mb-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FCE4EC] text-[9px] sm:text-[10px] font-bold text-[#D81B60] uppercase tracking-wider shadow-sm backdrop-blur-xs flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <span>Tap Me! 🧸</span>
        </div>

        {/* SVG White Teddy Bear Sideways / Sitting */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 filter drop-shadow-lg transition-transform duration-300">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Soft Shadow Base */}
            <ellipse cx="60" cy="110" rx="38" ry="8" fill="#000000" fillOpacity="0.12" />

            {/* Left Ear */}
            <circle cx="36" cy="30" r="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="36" cy="30" r="8" fill="#FCE4EC" />

            {/* Right Ear */}
            <circle cx="84" cy="30" r="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="84" cy="30" r="8" fill="#FCE4EC" />

            {/* Body */}
            <ellipse cx="60" cy="78" rx="28" ry="26" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="2" />
            {/* Cream Tummy Patch */}
            <ellipse cx="60" cy="80" rx="18" ry="16" fill="#FFF5F7" />

            {/* Head */}
            <circle cx="60" cy="46" r="28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

            {/* Rosy Cheeks */}
            <ellipse cx="42" cy="52" rx="5" ry="3" fill="#F48FB1" fillOpacity="0.6" />
            <ellipse cx="78" cy="52" rx="5" ry="3" fill="#F48FB1" fillOpacity="0.6" />

            {/* Snout Area */}
            <ellipse cx="60" cy="52" rx="11" ry="8" fill="#FFF5F7" stroke="#FCE4EC" strokeWidth="1" />
            {/* Cute Black Heart Nose */}
            <path
              d="M57.5 48.5C57.5 47 59 46 60 47.2C61 46 62.5 47 62.5 48.5C62.5 50 60 52 60 52C60 52 57.5 50 57.5 48.5Z"
              fill="#333333"
            />
            {/* Mouth */}
            <path
              d="M57 53.5C58.5 55 61.5 55 63 53.5"
              stroke="#333333"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Eyes with twinkling highlights */}
            <motion.g
              animate={{ scaleY: isWaving ? [1, 0.1, 1] : 1 }}
              transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.2 }}
            >
              {/* Left Eye */}
              <circle cx="46" cy="42" r="3.5" fill="#222222" />
              <circle cx="45" cy="40.5" r="1.2" fill="#FFFFFF" />
              {/* Right Eye */}
              <circle cx="74" cy="42" r="3.5" fill="#222222" />
              <circle cx="73" cy="40.5" r="1.2" fill="#FFFFFF" />
            </motion.g>

            {/* Left Paw / Arm */}
            <ellipse cx="32" cy="74" rx="8" ry="12" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(15 32 74)" />

            {/* Right Paw / Waving Arm holding a Red Rose */}
            <motion.g
              animate={{ rotate: isWaving ? [0, -25, 10, -25, 0] : [0, -5, 0] }}
              transition={{
                duration: isWaving ? 1.2 : 3,
                repeat: isWaving ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '88px 70px' }}
            >
              <ellipse cx="88" cy="74" rx="8" ry="12" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(-20 88 74)" />

              {/* Glowing Crystal Heart Wand held in paw */}
              <g transform="translate(88, 56) scale(0.65)">
                {/* Wand Stem */}
                <path d="M0 16 L 2 34" stroke="#FFD54F" strokeWidth="2.5" strokeLinecap="round" />
                {/* Glowing Pink Heart Gem */}
                <path
                  d="M0 6 C-6 0 -12 6 -6 12 L0 18 L6 12 C12 6 6 0 0 6 Z"
                  fill="#D81B60"
                  stroke="#FFF5F7"
                  strokeWidth="1"
                />
                <circle cx="-1" cy="6" r="1.5" fill="#FFFFFF" />
                {/* Sparkle Rays */}
                <path d="M-8 2 L-10 -2 M8 2 L10 -2 M0 -2 L0 -6 M-6 16 L-9 18 M6 16 L9 18" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </motion.g>

            {/* Left Foot Paw Pad */}
            <ellipse cx="40" cy="100" rx="10" ry="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="40" cy="100" r="4" fill="#FCE4EC" />

            {/* Right Foot Paw Pad */}
            <ellipse cx="80" cy="100" rx="10" ry="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="80" cy="100" r="4" fill="#FCE4EC" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
