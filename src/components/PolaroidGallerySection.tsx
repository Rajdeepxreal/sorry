import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PolaroidPhoto } from '../types';
import { Sparkles, MapPin, Calendar, X } from 'lucide-react';

interface PolaroidGallerySectionProps {
  photos: PolaroidPhoto[];
}

export const PolaroidGallerySection: React.FC<PolaroidGallerySectionProps> = ({
  photos,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  return (
    <section id="our-memories" className="relative py-16 sm:py-24 px-4 max-w-7xl mx-auto z-10">
      {/* Glowing String of Lights Decorative Bar */}
      <div className="relative w-full mb-10 sm:mb-14 flex justify-between items-center px-2 sm:px-4 overflow-hidden">
        {/* String wire */}
        <div className="absolute top-1/2 inset-x-0 h-0.5 bg-gradient-to-r from-[#FCE4EC] via-[#D81B60]/40 to-[#FCE4EC] -translate-y-1/2 z-0" />
        {/* Twinkling Light Bulbs */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FCE4EC] border border-white shadow-md animate-twinkle"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>

      {/* Gallery Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE4EC]/80 text-[#D81B60] text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-3 border border-[#FCE4EC]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D81B60]" />
          Our Moments • Reasons I Cherish Bornaa
        </motion.div>
        <h2 className="text-3xl sm:text-6xl font-serif font-medium text-[#333333]">
          Our Favorite Memories
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#555555] uppercase tracking-[0.2em] opacity-70 mt-2 max-w-lg mx-auto">
          Every picture holds a thousand reasons why you mean everything to me
        </p>
      </div>

      {/* Organic Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start px-2 sm:px-6">
        {photos.map((photo, idx) => {
          const rotation = photo.rotation ?? (idx % 2 === 0 ? -3 : 3);
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.04,
                rotate: 0,
                zIndex: 20,
                boxShadow: '0 25px 50px -12px rgba(216, 27, 96, 0.25)',
              }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer relative bg-white p-4 pt-5 pb-6 rounded-2xl border border-[#FCE4EC] shadow-xl transition-all duration-300 group"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {/* Tape Graphic on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#FCE4EC]/90 border border-white/80 rounded-xs backdrop-blur-xs opacity-90 shadow-xs z-10" />

              {/* Photo Image Frame */}
              <div className="relative aspect-[4/5] w-full bg-[#FFFDF9] overflow-hidden rounded-xl border border-slate-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#D81B60]/0 group-hover:bg-[#D81B60]/5 transition-colors duration-300" />
              </div>

              {/* Handwritten Caption */}
              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#333333] font-semibold leading-snug line-clamp-2">
                  {photo.caption}
                </p>
                {photo.date && (
                  <span className="text-[10px] font-semibold tracking-widest text-[#4A4A4A] opacity-60 uppercase block mt-1">
                    {photo.date} • {photo.location || 'Special Memory'}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#FFFDF9] p-5 sm:p-8 pt-6 pb-8 rounded-[32px] max-w-xl w-full border border-white shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FCE4EC] hover:bg-[#D81B60] text-[#D81B60] hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-[4/5] w-full bg-slate-100 rounded-2xl overflow-hidden border border-[#FCE4EC]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-5 text-center px-2">
                <p className="font-handwriting text-2xl sm:text-4xl text-[#333333] font-bold leading-tight">
                  {selectedPhoto.caption}
                </p>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#555555]">
                  {selectedPhoto.date && (
                    <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
                      <Calendar className="w-3.5 h-3.5 text-[#D81B60]" />
                      {selectedPhoto.date}
                    </span>
                  )}
                  {selectedPhoto.location && (
                    <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
                      <MapPin className="w-3.5 h-3.5 text-[#D81B60]" />
                      {selectedPhoto.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
