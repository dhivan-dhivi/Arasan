import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const WhyArasan: React.FC = () => {
  const reasons = [
    {
      title: 'Local Expertise',
      description: 'Travel planning built around authentic, first-hand destination knowledge, secret viewpoints, and culturally rooted guidance.',
      svg: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="20" strokeDasharray="3 3" className="opacity-40" />
          <path d="M24 10 L30 24 L24 22 L18 24 Z" fill="#D4AF37" />
          <path d="M24 38 L30 24 L24 26 L18 24 Z" fill="none" />
          <circle cx="24" cy="24" r="3" fill="#07111F" stroke="#D4AF37" />
        </svg>
      ),
    },
    {
      title: 'Transparent Pricing',
      description: 'Zero hidden driver allowances, no surprise toll surcharges, and no confusing fine-print. What you see is what you pay.',
      svg: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="12" width="32" height="24" rx="3" />
          <path d="M8 20 L40 20" />
          <circle cx="16" cy="28" r="3" fill="#D4AF37" />
          <path d="M26 28 L34 28" />
        </svg>
      ),
    },
    {
      title: 'Comfortable Travel',
      description: 'Meticulously maintained, sanitised vehicles with seasoned mountain chauffeurs who respect family privacy and safety.',
      svg: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 30 L10 18 L38 18 L42 30 Z" />
          <circle cx="14" cy="34" r="4" fill="#D4AF37" />
          <circle cx="34" cy="34" r="4" fill="#D4AF37" />
          <path d="M10 24 L38 24" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      title: 'Personalized Planning',
      description: 'Every traveler is unique. We tailor departure times, hotel categories, dietary choices, and pacing to your pace of travel.',
      svg: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="10" y="8" width="28" height="32" rx="2" />
          <path d="M16 16 L32 16" />
          <path d="M16 22 L28 22" />
          <path d="M16 28 L24 28" />
          <circle cx="34" cy="34" r="8" fill="#07111F" stroke="#D4AF37" />
          <path d="M31 34 L33 36 L37 32" stroke="#D4AF37" />
        </svg>
      ),
    },
    {
      title: 'Dedicated Support',
      description: '24/7 dedicated travel manager monitoring your journey from departure to safe arrival back at your doorstep.',
      svg: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20 A 12 12 0 0 1 36 20 V 30 A 6 6 0 0 1 30 36 H 24" />
          <rect x="8" y="20" width="6" height="12" rx="2" fill="#D4AF37" />
          <rect x="34" y="20" width="6" height="12" rx="2" fill="#D4AF37" />
          <circle cx="20" cy="36" r="3" fill="#D4AF37" />
        </svg>
      ),
    },
    {
      title: 'Complete Experience',
      description: 'Transport, boutique stays, curated sightseeing, permits, and priority bookings bundled seamlessly in one cohesive itinerary.',
      svg: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="24,6 40,16 40,34 24,44 8,34 8,16" />
          <line x1="24" y1="6" x2="24" y2="44" strokeDasharray="2 2" />
          <line x1="8" y1="16" x2="40" y2="34" strokeDasharray="2 2" />
          <circle cx="24" cy="24" r="4" fill="#D4AF37" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Arasan Standard</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
          WHY TRAVEL WITH ARASAN?
        </h2>
        <p className="text-slate-600 mt-3 text-base sm:text-lg font-light leading-relaxed">
          Over a decade of setting the benchmark for reliability, comfort, and authentic travel across Tamil Nadu and India.
        </p>
      </div>

      {/* Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-lg bg-[#07111F] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              {item.svg}
            </div>

            <h3 className="text-xl font-bold font-editorial text-[#07111F] mb-3 group-hover:text-[#2563EB] transition-colors">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
