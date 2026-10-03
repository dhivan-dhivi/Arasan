import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { setIsPreloaderComplete } = useApp();
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Progressive travel milestone text for cinematic immersion
  const getMilestoneText = (pct: number) => {
    if (pct < 25) return 'MAPPING SIGNATURE TRAILS';
    if (pct < 55) return 'PREPARING LUXURY FLEET & STAYS';
    if (pct < 85) return 'CURATING TAILORED ITINERARIES';
    return 'YOUR JOURNEY IS READY';
  };

  useEffect(() => {
    // Deliberate, smooth luxury loading pace (~3.8s total) for maximum visual appreciation
    const intervalTime = 42; // ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsFading(true), 500);
          setTimeout(() => {
            setIsPreloaderComplete(true);
            onComplete();
          }, 1200);
          return 100;
        }

        // Smooth non-linear progression
        let step = 1;
        if (prev < 30) step = 1;
        else if (prev < 70) step = 2;
        else if (prev < 90) step = 1;
        else step = 2;

        return Math.min(100, prev + step);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, setIsPreloaderComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07111F] text-white transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Loading Arasan Holidays"
    >
      {/* Background ambient gold luxury halo */}
      <div className="absolute w-[32rem] h-[32rem] rounded-full bg-[#D4AF37]/8 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,17,31,0.8)_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Golden Compass Dial */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10">
            <svg
              className="w-14 h-14 text-[#D4AF37] animate-[spin_12s_linear_infinite]"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Outer graduated dial */}
              <circle cx="32" cy="32" r="30" className="opacity-30" strokeDasharray="3 3" />
              <circle cx="32" cy="32" r="26" className="opacity-60" strokeWidth="1" />
              {/* North / South / East / West markers */}
              <line x1="32" y1="2" x2="32" y2="7" stroke="#D4AF37" strokeWidth="2" />
              <line x1="32" y1="57" x2="32" y2="62" stroke="#D4AF37" strokeWidth="2" />
              <line x1="2" y1="32" x2="7" y2="32" stroke="#D4AF37" strokeWidth="2" />
              <line x1="57" y1="32" x2="62" y2="32" stroke="#D4AF37" strokeWidth="2" />
              {/* Needle Top (Gold) */}
              <path
                d="M32 9 L38 32 L32 30 L26 32 Z"
                fill="#D4AF37"
                stroke="#D4AF37"
                className="origin-center"
              />
              {/* Needle Bottom (Navy) */}
              <path
                d="M32 55 L38 32 L32 34 L26 32 Z"
                fill="#0B1B32"
                stroke="#D4AF37"
                className="origin-center"
              />
              <circle cx="32" cy="32" r="3" fill="#D4AF37" />
            </svg>
          </div>
        </div>

        {/* Brand Wordmark */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[0.3em] uppercase text-white font-brand mb-2">
          ARASAN HOLIDAYS
        </h1>

        {/* Brand Tagline */}
        <p className="text-xs sm:text-sm tracking-[0.2em] text-[#D4AF37] uppercase font-medium mb-8">
          Your Journey. Our Responsibility.
        </p>

        {/* Animated Travel Route Line */}
        <div className="w-72 h-10 relative flex items-center justify-center mb-4">
          <svg className="w-full h-full" viewBox="0 0 280 40" fill="none">
            {/* Guide dashed path */}
            <path
              d="M 15 20 Q 80 5, 140 20 T 265 20"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated gold travel progression path */}
            <path
              d="M 15 20 Q 80 5, 140 20 T 265 20"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeDasharray="280"
              strokeDashoffset={280 - (progress / 100) * 280}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
            {/* Origin Pin */}
            <circle cx="15" cy="20" r="4.5" fill="#D4AF37" />
            <circle cx="15" cy="20" r="8" stroke="#D4AF37" strokeWidth="1" className="opacity-40 animate-ping" />
            {/* Destination Pin */}
            <circle
              cx="265"
              cy="20"
              r="4.5"
              fill={progress === 100 ? '#D4AF37' : '#334155'}
              className="transition-colors duration-300"
            />
          </svg>
        </div>

        {/* Percentage Counter and Current Travel Status */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-sm font-semibold tracking-widest text-[#D4AF37] font-mono">
            {progress < 10 ? `0${progress}` : progress}%
          </div>
          <p className="text-[11px] tracking-[0.25em] text-slate-400 uppercase font-medium transition-all duration-300">
            {getMilestoneText(progress)}
          </p>
        </div>
      </div>
    </div>
  );
};
