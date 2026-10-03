import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
            STORIES FROM OUR TRAVELERS
          </h2>
          <p className="text-slate-600 mt-2 text-base font-light">
            Genuine experiences shared by families, honeymooners, and corporate teams from Tamil Nadu.
          </p>
        </div>

        {/* Carousel arrows */}
        <div className="flex items-center gap-2 mt-6 md:mt-0">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-[#07111F] hover:text-white transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-[#07111F] hover:text-white transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Testimonial Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((test, idx) => (
          <div
            key={test.id}
            className={`p-8 rounded-xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between transition-all ${
              idx === currentIndex ? 'ring-2 ring-[#D4AF37]/50 shadow-md' : ''
            }`}
          >
            <div>
              {/* Rating stars & Quote Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-200" />
              </div>

              {/* Review Text */}
              <p className="text-sm text-slate-700 font-light leading-relaxed mb-6 italic">
                “{test.review}”
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#07111F] flex items-center gap-1.5">
                  <span>{test.name}</span>
                  {test.verified && (
                    <span title="Verified Traveler" className="inline-flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-500">{test.location}</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wide block">
                  {test.trip}
                </span>
                <span className="text-[10px] text-slate-400">{test.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
