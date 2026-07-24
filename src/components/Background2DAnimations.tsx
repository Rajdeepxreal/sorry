import React, { useMemo } from 'react';

export const Background2DAnimations: React.FC = () => {
  // Generate random stable properties for 2D Petals
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8 + Math.sin(i) * 12) % 96}%`,
      duration: `${7 + (i % 7) * 2.2}s`,
      delay: `${(i * 0.7) % 6}s`,
      size: 16 + (i % 5) * 6,
      rotate: i * 25,
      color: i % 3 === 0 ? '#E91E63' : i % 3 === 1 ? '#D81B60' : '#F48FB1',
    }));
  }, []);

  // Generate random stable properties for 2D Floating Hearts
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 8.5 + 4) % 94}%`,
      duration: `${9 + (i % 5) * 3}s`,
      delay: `${(i * 1.1) % 7}s`,
      size: 14 + (i % 4) * 6,
      color: i % 2 === 0 ? '#D81B60' : '#EC407A',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Romantic Ambient Gradient Light Pods */}
      <div
        className="absolute top-10 left-[10%] w-72 sm:w-[30rem] h-72 sm:h-[30rem] rounded-full bg-[#FCE4EC] blur-3xl opacity-50 animate-bokeh"
        style={{ animationDuration: '10s' }}
      />
      <div
        className="absolute bottom-20 right-[5%] w-80 sm:w-[35rem] h-80 sm:h-[35rem] rounded-full bg-[#F8BBD0]/40 blur-3xl opacity-40 animate-bokeh"
        style={{ animationDuration: '14s', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[40rem] h-96 sm:h-[40rem] rounded-full bg-[#E1BEE7]/30 blur-3xl opacity-30 animate-bokeh"
        style={{ animationDuration: '18s', animationDelay: '4s' }}
      />

      {/* 2D Falling Rose Petals Layer */}
      {petals.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="absolute top-0 animate-fall-petal"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0px 2px 4px rgba(216, 27, 96, 0.2))',
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            <path
              d="M12 2C6 2 2 8 2 16C2 24 8 30 12 30C16 30 22 24 22 16C22 8 18 2 12 2Z"
              fill={p.color}
              fillOpacity="0.75"
            />
            <path
              d="M12 4C8 4 5 9 5 16C5 21 8 26 12 28"
              stroke="#FFF"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}

      {/* 2D Rising Romantic Hearts Layer */}
      {hearts.map((h) => (
        <div
          key={`heart-${h.id}`}
          className="absolute bottom-0 animate-float-heart-up"
          style={{
            left: h.left,
            animationDuration: h.duration,
            animationDelay: h.delay,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            fillOpacity="0.35"
            stroke={h.color}
            strokeWidth="1.5"
            strokeOpacity="0.6"
            style={{ filter: 'drop-shadow(0px 0px 6px rgba(216, 27, 96, 0.25))' }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
