import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Home, MapPin, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-[#07111F] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background ambient gold halo */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Animated Compass */}
        <div className="w-16 h-16 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-6">
          <Compass className="w-8 h-8 animate-[spin_12s_linear_infinite]" />
        </div>

        {/* 404 Large */}
        <span className="text-7xl sm:text-8xl font-black font-brand tracking-widest text-[#D4AF37] mb-2 block tabular-nums">
          404
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-white mb-3">
          LOST YOUR WAY?
        </h1>

        <p className="text-sm text-slate-300 font-light leading-relaxed mb-8 max-w-sm">
          Looks like you've taken a wrong turn. Every journey has a route — let's get you back on track to your next destination.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('home')}
            className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back Home</span>
          </button>

          <button
            onClick={() => navigateTo('destinations')}
            className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors rounded flex items-center justify-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Explore Destinations</span>
          </button>
        </div>
      </div>
    </div>
  );
};
