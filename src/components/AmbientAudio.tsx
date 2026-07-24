import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface PianoNote {
  pitch: number;    // MIDI note number (e.g. 60 = C4, 72 = C5)
  time: number;     // Beats offset
  duration: number; // Beats length
  velocity?: number;// 0 to 1 volume expression
}

// Convert MIDI note number to frequency in Hz
const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

// MIDI Note Definitions
const C3 = 48, E3 = 52, G3 = 55, B3 = 59;
const A2 = 45, C4 = 60, D4 = 62, E4 = 64, G4 = 67;
const F2 = 41, F3 = 53, A3 = 57;
const D3 = 50, F4 = 65, A4 = 69;

const B4 = 71, C5 = 72, D5 = 74, E5 = 76, F5 = 77, G5 = 79, A5 = 81, B5 = 83, C6 = 84;

// Lyrical, romantic piano pieces (rolling arpeggiated bass + sweet romantic melody)
const ROMANTIC_PIANO_SONGS = [
  {
    title: 'River Flows In You Style',
    bpm: 72,
    notes: [
      // Measure 1: A Minor arpeggio + Melody
      { pitch: A2, time: 0, duration: 2, velocity: 0.6 },
      { pitch: E3, time: 0.5, duration: 1.5, velocity: 0.5 },
      { pitch: A3, time: 1.0, duration: 1.5, velocity: 0.5 },
      { pitch: C4, time: 1.5, duration: 1.5, velocity: 0.5 },
      { pitch: E5, time: 0, duration: 0.8, velocity: 0.75 },
      { pitch: D5, time: 0.75, duration: 0.75, velocity: 0.7 },
      { pitch: C5, time: 1.5, duration: 0.75, velocity: 0.7 },
      { pitch: B4, time: 2.25, duration: 0.75, velocity: 0.65 },

      // Measure 2: F Major
      { pitch: F2, time: 3, duration: 2, velocity: 0.6 },
      { pitch: C4, time: 3.5, duration: 1.5, velocity: 0.5 },
      { pitch: F4, time: 4.0, duration: 1.5, velocity: 0.5 },
      { pitch: A4, time: 4.5, duration: 1.5, velocity: 0.5 },
      { pitch: C5, time: 3.0, duration: 1.5, velocity: 0.8 },
      { pitch: A4, time: 4.5, duration: 1.5, velocity: 0.7 },

      // Measure 3: C Major
      { pitch: C3, time: 6, duration: 2, velocity: 0.6 },
      { pitch: G3, time: 6.5, duration: 1.5, velocity: 0.5 },
      { pitch: C4, time: 7.0, duration: 1.5, velocity: 0.5 },
      { pitch: E4, time: 7.5, duration: 1.5, velocity: 0.5 },
      { pitch: G5, time: 6.0, duration: 1.0, velocity: 0.85 },
      { pitch: E5, time: 7.0, duration: 1.0, velocity: 0.75 },
      { pitch: G5, time: 8.0, duration: 1.0, velocity: 0.8 },

      // Measure 4: G Major
      { pitch: G3, time: 9, duration: 2, velocity: 0.6 },
      { pitch: D3, time: 9.5, duration: 1.5, velocity: 0.5 },
      { pitch: G4, time: 10.0, duration: 1.5, velocity: 0.5 },
      { pitch: B4, time: 10.5, duration: 1.5, velocity: 0.5 },
      { pitch: F5, time: 9.0, duration: 1.0, velocity: 0.75 },
      { pitch: E5, time: 10.0, duration: 1.0, velocity: 0.7 },
      { pitch: D5, time: 11.0, duration: 1.0, velocity: 0.65 },
    ]
  },
  {
    title: 'Soft Romantic Ballad',
    bpm: 64,
    notes: [
      // C Major Warm Hold
      { pitch: C3, time: 0, duration: 3, velocity: 0.55 },
      { pitch: G3, time: 0.5, duration: 2.5, velocity: 0.45 },
      { pitch: E4, time: 1.0, duration: 2.0, velocity: 0.45 },
      { pitch: G4, time: 1.5, duration: 2.0, velocity: 0.5 },
      { pitch: C5, time: 0, duration: 1.5, velocity: 0.8 },
      { pitch: E5, time: 1.5, duration: 1.5, velocity: 0.8 },

      // G/B Major
      { pitch: B3, time: 3, duration: 3, velocity: 0.55 },
      { pitch: G3, time: 3.5, duration: 2.5, velocity: 0.45 },
      { pitch: D4, time: 4.0, duration: 2.0, velocity: 0.45 },
      { pitch: G4, time: 4.5, duration: 2.0, velocity: 0.5 },
      { pitch: D5, time: 3.0, duration: 1.5, velocity: 0.75 },
      { pitch: B4, time: 4.5, duration: 1.5, velocity: 0.7 },

      // A Minor Soft
      { pitch: A2, time: 6, duration: 3, velocity: 0.55 },
      { pitch: E3, time: 6.5, duration: 2.5, velocity: 0.45 },
      { pitch: C4, time: 7.0, duration: 2.0, velocity: 0.45 },
      { pitch: E4, time: 7.5, duration: 2.0, velocity: 0.5 },
      { pitch: C5, time: 6.0, duration: 1.5, velocity: 0.8 },
      { pitch: A4, time: 7.5, duration: 1.5, velocity: 0.7 },

      // F Major Sweet End
      { pitch: F2, time: 9, duration: 3, velocity: 0.55 },
      { pitch: C4, time: 9.5, duration: 2.5, velocity: 0.45 },
      { pitch: F4, time: 10.0, duration: 2.0, velocity: 0.45 },
      { pitch: A4, time: 10.5, duration: 2.0, velocity: 0.5 },
      { pitch: C5, time: 9.0, duration: 1.5, velocity: 0.8 },
      { pitch: G4, time: 10.5, duration: 1.5, velocity: 0.75 },
    ]
  }
];

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const songIndexRef = useRef<number>(0);

  // Play a realistic felt acoustic piano key strike
  const playAcousticPianoNote = (midi: number, velocity = 0.7, durationBeats = 1.5) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const freq = midiToFreq(midi);
    const now = ctx.currentTime;
    const durationSec = durationBeats * (60 / 70); // ~1.2s

    // Main acoustic tone: Sine fundamental + warm harmonics
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc3.type = 'sine';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic
    osc3.frequency.setValueAtTime(freq * 3, now); // 3rd harmonic

    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const gain3 = ctx.createGain();

    // Volume levels for acoustic piano string response
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.35 * velocity, now + 0.008); // Percussive key attack
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + 1.2);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.08 * velocity, now + 0.006);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + durationSec * 0.6 + 0.3);

    gain3.gain.setValueAtTime(0.001, now);
    gain3.gain.linearRampToValueAtTime(0.03 * velocity, now + 0.005);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + durationSec * 0.4 + 0.2);

    // Warm felt lowpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400 + velocity * 800, now);

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter);
    gain2.connect(filter);
    gain3.connect(filter);

    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + durationSec + 1.4);
    osc2.stop(now + durationSec + 0.8);
    osc3.stop(now + durationSec + 0.5);
  };

  const scheduleSongLoop = () => {
    const song = ROMANTIC_PIANO_SONGS[songIndexRef.current % ROMANTIC_PIANO_SONGS.length];
    const beatDurationMs = (60 / song.bpm) * 1000;

    song.notes.forEach((note) => {
      const noteDelay = note.time * beatDurationMs;
      setTimeout(() => {
        if (isPlaying) {
          playAcousticPianoNote(note.pitch, note.velocity ?? 0.7, note.duration);
        }
      }, noteDelay);
    });

    // Total song length in ms
    const totalDurationMs = 12 * beatDurationMs + 1000;

    timeoutRef.current = setTimeout(() => {
      songIndexRef.current += 1;
      if (isPlaying) {
        scheduleSongLoop();
      }
    }, totalDurationMs);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      scheduleSongLoop();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40">
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md border cursor-pointer ${
          isPlaying
            ? 'bg-[#D81B60] text-white border-pink-300 shadow-pink-300/50 scale-105 ring-2 ring-pink-300'
            : 'bg-white/90 text-slate-700 border-white hover:bg-white shadow-pink-100/50'
        }`}
        title={isPlaying ? 'Mute soft piano melody' : 'Play soft romantic piano melody'}
      >
        <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPlaying ? 'animate-bounce text-white' : 'text-[#D81B60]'}`} />
        <span className="text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-1">
          {isPlaying ? (
            <>
              <span>Soft Piano Melody</span>
              <Heart className="w-3 h-3 fill-white text-white animate-pulse inline" />
            </>
          ) : (
            'Soft Piano Melody 🎹'
          )}
        </span>
        {isPlaying ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />}
      </button>
    </div>
  );
};

