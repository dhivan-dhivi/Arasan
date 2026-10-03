import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, Compass } from 'lucide-react';
import { Destination } from '../types';
import { OptimizedImage } from './OptimizedImage';

export const DestinationsSection: React.FC = () => {
  const { destinations, navigateTo } = useApp();

  const handleDestinationClick = (dest: Destination) => {
    navigateTo('destinations', dest.slug);
  };

  return (
    <section id="destinations-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-3">
            <Compass className="w-4 h-4" />
            <span>Curated Escapes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
            WHERE WILL YOU GO NEXT?
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg font-light leading-relaxed">
            From misty Nilgiri mountains to tranquil tropical backwaters, your next unforgettable journey is waiting.
          </p>
        </div>

        <button
          onClick={() => navigateTo('destinations')}
          className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#07111F] hover:text-[#D4AF37] transition-colors border-b-2 border-[#D4AF37] pb-1 self-start whitespace-nowrap cursor-pointer"
        >
          <span>View All Destinations</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest, idx) => (
          <div
            key={dest.id}
            onClick={() => handleDestinationClick(dest)}
            className="group relative h-[420px] rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 bg-[#07111F]"
          >
            {/* Background image with smooth scale and skeleton */}
            <OptimizedImage
              src={dest.coverImage}
              alt={dest.name}
              priority={idx < 2}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Gradient Scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

            {/* Top Bar on Card: Starting Price */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded bg-[#07111F]/80 backdrop-blur-md text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30">
                From ₹{dest.startingPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                {dest.tagline}
              </span>
              <h3 className="text-2xl font-bold font-editorial text-white mb-2 tracking-tight">
                {dest.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {dest.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                <span>Explore Packages</span>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#07111F] transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
