import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Star, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Package } from '../types';
import { OptimizedImage } from './OptimizedImage';

export const FeaturedPackages: React.FC = () => {
  const { packages, navigateTo, openEnquiryModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Family', 'Honeymoon', 'Hill Station', 'Beach', 'Heritage', 'Adventure'];

  const filteredPackages = packages.filter((pkg) => {
    if (!pkg.published) return false;
    if (selectedCategory === 'All') return true;
    return pkg.category === selectedCategory;
  });

  return (
    <section id="featured-packages-section" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Itineraries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
            TRAVEL PACKAGES MADE FOR YOU
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg font-light leading-relaxed">
            Thoughtfully balanced itineraries with private transfers, handpicked boutique stays, and dedicated 24/7 travel care.
          </p>
        </div>

        {/* Filter Tabs - Interactive Segmented Controls */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#07111F] text-[#D4AF37] shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative h-60 overflow-hidden bg-[#07111F]">
                <OptimizedImage
                  src={pkg.coverImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#07111F]/80 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                    {pkg.destination}
                  </span>
                  {pkg.featured && (
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[10px] font-extrabold uppercase tracking-wide text-[#07111F]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Rating overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>{pkg.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[10px]">({pkg.reviewsCount})</span>
                </div>

                {/* Duration on bottom of image */}
                <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-editorial text-[#07111F] mb-2 group-hover:text-[#2563EB] transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {pkg.shortDescription}
                  </p>

                  {/* Included Preview (First 2 highlights) */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                    {pkg.included.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wide block">Starting from</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#07111F] font-brand">
                          ₹{pkg.startingPrice.toLocaleString('en-IN')}
                        </span>
                        {pkg.discountPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{pkg.discountPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">Per Person</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo('packages', pkg.slug)}
                      className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07111F] bg-slate-100 hover:bg-slate-200 transition-colors rounded text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openEnquiryModal({ packageTitle: pkg.title, destination: pkg.destination })}
                      className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c19d2c] transition-colors rounded text-center shadow-sm"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
