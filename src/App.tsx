import React, { useState, useEffect } from 'react';
import { AppCustomization } from './types';
import { DEFAULT_CUSTOMIZATION } from './data/defaultData';
import { ThreeBackground } from './components/ThreeBackground';
import { Background2DAnimations } from './components/Background2DAnimations';
import { HeroSection } from './components/HeroSection';
import { ApologyLetterSection } from './components/ApologyLetterSection';
import { PolaroidGallerySection } from './components/PolaroidGallerySection';
import { ForgivenessQuestionSection } from './components/ForgivenessQuestionSection';
import { AmbientAudio } from './components/AmbientAudio';
import { CuteWhiteTeddy } from './components/CuteWhiteTeddy';
import { Heart, ChevronUp } from 'lucide-react';

export default function App() {
  const [customization] = useState<AppCustomization>(DEFAULT_CUSTOMIZATION);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress for Three.js background blur/dimming
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#FFFDF9] text-[#333333] selection:bg-[#FCE4EC] selection:text-[#D81B60] overflow-x-hidden">
      {/* 2D Ambient Background Petals & Glows */}
      <Background2DAnimations />

      {/* 3D Three.js Interactive Velvet Red Rose Bouquet Background */}
      <ThreeBackground
        roseModelUrl={customization.roseModelUrl}
        scrollProgress={scrollProgress}
      />

      {/* Sideways Cute White Teddy Bear Animation holding a Red Rose */}
      <CuteWhiteTeddy />

      {/* Ambient Music Box Audio Toggle */}
      <AmbientAudio />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-12 sm:space-y-20">
        {/* Section 1: Hero */}
        <HeroSection
          recipientName={customization.recipientName}
          subtitle={customization.heroSubtitle}
          onScrollToLetter={() => scrollToSection('apology-letter')}
        />

        {/* Section 2: Apology Letter (2D Envelope Animation) */}
        <ApologyLetterSection
          recipientName={customization.recipientName}
          senderName={customization.senderName}
          letterText={customization.apologyLetter}
        />

        {/* Section 3: Polaroid Photo Gallery ("Reasons I Cherish Bornaa") */}
        <PolaroidGallerySection
          photos={customization.photos}
        />

        {/* Section 4: Forgiveness Question & Evasive No Button */}
        <ForgivenessQuestionSection
          recipientName={customization.recipientName}
          senderName={customization.senderName}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-4 text-center border-t border-[#FCE4EC] backdrop-blur-md bg-white/50 mt-20">
        <div className="max-w-md mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[#D81B60] font-serif font-medium text-sm sm:text-base">
            <span>Made with all my love for {customization.recipientName}</span>
            <Heart className="w-4 h-4 fill-[#D81B60] text-[#D81B60] animate-pulse" />
          </div>
          <p className="text-xs text-[#555555] uppercase tracking-widest font-semibold opacity-70">
            Always & Forever • {customization.senderName}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 p-3 rounded-full bg-white/80 hover:bg-white text-[#333333] hover:text-[#D81B60] shadow-sm border border-[#FCE4EC] transition-all hover:scale-105 cursor-pointer"
            title="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
