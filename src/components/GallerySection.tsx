import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import { X, ZoomIn, Camera, Sparkles } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

export const GallerySection: React.FC = () => {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Kerala', 'Manali', 'Kashmir', 'Ooty', 'Goa', 'Customer Trips', 'Vehicles'];

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery-section" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Expedition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
            MOMENTS IN MOTION
          </h2>
          <p className="text-slate-600 mt-2 text-base font-light">
            Real snapshots from our travelers, mountain highways, backwaters, and pristine executive fleet.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#07111F] text-[#D4AF37] shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="relative h-64 sm:h-72 rounded-lg overflow-hidden cursor-pointer group bg-[#07111F] shadow-sm hover:shadow-xl transition-all"
            >
              <OptimizedImage
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold font-editorial text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1 font-light">
                  {item.caption}
                </p>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxItem(null)}
        >
          <button
            onClick={() => setActiveLightboxItem(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full bg-[#07111F] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-xl font-bold font-editorial text-white">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-slate-300 font-light mt-1">
                  {activeLightboxItem.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
