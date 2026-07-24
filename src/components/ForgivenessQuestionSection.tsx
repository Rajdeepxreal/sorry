import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2, RotateCcw, PartyPopper } from 'lucide-react';

interface ForgivenessQuestionSectionProps {
  recipientName: string;
  senderName: string;
  onForgiven?: () => void;
}

export const ForgivenessQuestionSection: React.FC<ForgivenessQuestionSectionProps> = ({
  recipientName,
  senderName,
  onForgiven,
}) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logStatus, setLogStatus] = useState<string | null>(null);

  // "No" Button Evasive Position state
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [evasionCount, setEvasionCount] = useState(0);
  const noButtonContainerRef = useRef<HTMLDivElement>(null);

  const playfulMessages = [
    "Nice try! 😜",
    "Button slipped! 🙈",
    "Are you sure, Bornaa? 🥹",
    "Nope, can't click me! 💕",
    "Try the pink button! 💖",
    "I'm too fast! 💨",
    "Forgive me please? 🥹",
    "Wrong button! 😘",
  ];

  // Evasive "No" Button movement trigger
  const handleMoveNoButton = () => {
    const btnWidth = 160;
    const btnHeight = 44;
    const maxX = Math.max(20, window.innerWidth - btnWidth - 20);
    const maxY = Math.max(20, window.innerHeight - btnHeight - 20);

    const newX = Math.floor(Math.random() * maxX) + 10;
    const newY = Math.floor(Math.random() * maxY) + 10;

    setNoButtonPos({ x: newX, y: newY });
    setEvasionCount((prev) => prev + 1);
  };

  // Trigger screen-wide confetti explosion on "Yes"
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6, x: 0.2 },
      colors: ['#D81B60', '#FCE4EC', '#E1BEE7', '#ffffff'],
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6, x: 0.8 },
      colors: ['#D81B60', '#FCE4EC', '#E1BEE7', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        shapes: ['circle', 'square'],
        colors: ['#D81B60', '#FCE4EC', '#E1BEE7', '#ffffff'],
      });
    }, 300);
  };

  const handleAcceptYes = () => {
    setIsSubmitting(true);
    triggerConfetti();

    try {
      const responseLog = {
        recipientName,
        userResponse: 'YES',
        timestamp: new Date().toISOString(),
        notes: `Accepted with ${evasionCount} 'No' button escape attempts!`,
      };
      const existingLogs = JSON.parse(localStorage.getItem('forgiveness_responses') || '[]');
      existingLogs.push(responseLog);
      localStorage.setItem('forgiveness_responses', JSON.stringify(existingLogs));
      setLogStatus('Saved response with love! 💕');
    } catch (e) {
      console.warn('Storage log:', e);
    } finally {
      setIsSubmitting(false);
      setHasAccepted(true);
      if (onForgiven) onForgiven();
    }
  };

  return (
    <section id="the-question" className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto z-20 text-center">
      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          /* Interactive Question View */
          <motion.div
            key="question-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-xl rounded-[36px] sm:rounded-[40px] p-6 sm:p-14 border border-white shadow-2xl relative overflow-hidden"
          >
            {/* Glowing Accent Ring */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#D81B60]" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE4EC]/80 text-[#D81B60] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-5 sm:mb-6 border border-[#FCE4EC]">
              <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
              The Moment of Truth
            </div>

            <h2 className="text-3xl sm:text-6xl font-serif font-medium text-[#333333] leading-tight mb-4">
              Will you forgive me, {recipientName}?
            </h2>

            <p className="text-[#555555] font-serif text-sm sm:text-xl max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed">
              I promise to make it up to you every single day with endless affection, warmth, and love.
            </p>

            {/* Buttons Area */}
            <div
              ref={noButtonContainerRef}
              className="relative min-h-[140px] flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 pt-2"
            >
              {/* BIG "YES" BUTTON */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAcceptYes}
                disabled={isSubmitting}
                className="relative z-30 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#D81B60] hover:bg-[#c21552] text-white font-serif text-lg sm:text-2xl font-medium shadow-xl shadow-pink-200 hover:shadow-2xl transition-all flex items-center gap-3 ring-6 sm:ring-8 ring-[#FCE4EC] cursor-pointer"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white animate-bounce" />
                <span>Yes, I Forgive You! 💖</span>
              </motion.button>

              {/* EVASIVE "NO" BUTTON */}
              {noButtonPos === null ? (
                /* Initial Inline Position */
                <motion.button
                  onMouseEnter={handleMoveNoButton}
                  onTouchStart={handleMoveNoButton}
                  onClick={handleMoveNoButton}
                  className="px-8 py-3.5 rounded-full bg-slate-200/90 hover:bg-slate-300 text-slate-600 font-sans font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer border border-slate-300"
                >
                  No 😢
                </motion.button>
              ) : (
                /* Random Evasive Bouncing Position around Screen */
                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  onMouseEnter={handleMoveNoButton}
                  onTouchStart={handleMoveNoButton}
                  onClick={handleMoveNoButton}
                  style={{ position: 'fixed', top: 0, left: 0, zIndex: 50 }}
                  className="px-6 py-3 rounded-full bg-[#FCE4EC] text-[#D81B60] font-sans font-bold text-xs uppercase tracking-wider shadow-xl ring-2 ring-[#D81B60] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>{playfulMessages[evasionCount % playfulMessages.length]}</span>
                </motion.button>
              )}
            </div>

            {evasionCount > 0 && (
              <p className="text-xs font-sans text-[#D81B60] italic mt-6 uppercase tracking-wider opacity-80">
                (Psst... the 'No' button is too shy to be clicked! 😉)
              </p>
            )}
          </motion.div>
        ) : (
          /* Full-Screen "Thank You!" Celebration View */
          <motion.div
            key="celebration-view"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[36px] sm:rounded-[40px] p-8 sm:p-16 border border-white shadow-2xl text-center relative overflow-hidden"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D81B60] text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-200 ring-8 ring-[#FCE4EC] animate-bounce">
              <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-6xl font-serif font-medium text-[#333333] mb-4"
            >
              Thank You, {recipientName}! 💖
            </motion.h2>

            <p className="text-lg sm:text-2xl font-serif text-[#D81B60] max-w-xl mx-auto leading-relaxed mb-6 font-medium">
              You’ve made me the happiest person in the world!
            </p>

            <p className="text-sm sm:text-base font-sans text-[#555555] max-w-md mx-auto leading-relaxed mb-8">
              I promise to treasure your forgiveness, hold your hand tighter, and love you more each passing day.
            </p>

            {logStatus && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-[#D81B60] text-xs font-semibold mb-8 border border-pink-200">
                <CheckCircle2 className="w-4 h-4 text-[#D81B60]" />
                <span>{logStatus}</span>
              </div>
            )}

            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => {
                  setHasAccepted(false);
                  setNoButtonPos(null);
                  setEvasionCount(0);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#FCE4EC] bg-white hover:bg-[#FCE4EC]/40 text-[#D81B60] text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay Celebration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
