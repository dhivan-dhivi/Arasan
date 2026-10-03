import React from 'react';
import { useApp } from '../context/AppContext';
import { Destination } from '../types';
import { ArrowLeft, Clock, Calendar, MapPin, Star, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DestinationDetailViewProps {
  destination: Destination;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({ destination }) => {
  const { packages, navigateTo, openEnquiryModal } = useApp();

  const matchingPackages = packages.filter(
    (p) => p.published && (p.destination.toLowerCase().includes(destination.name.toLowerCase()) || destination.name.toLowerCase().includes(p.destination.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-24 bg-[#F8F7F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('destinations')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-slate-600 hover:text-[#07111F] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </button>

        {/* Hero Destination Banner */}
        <div className="relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl bg-[#07111F] mb-12">
          <img
            src={destination.coverImage}
            alt={destination.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/50 to-transparent" />

          <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-white max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#D4AF37] block mb-2">
              {destination.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-editorial text-white mb-3 tracking-tight">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed max-w-2xl mb-6">
              {destination.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 backdrop-blur-md">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Best Time: {destination.bestTimeToVisit}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{destination.attractionsCount}+ Key Attractions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Highlights */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 mb-12">
          <h2 className="text-xl font-bold font-editorial text-[#07111F] mb-4">
            Highlights & Experiences in {destination.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {destination.popularFor.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Tour Packages for Destination */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#07111F]">
                Curated Packages for {destination.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Private door-to-door packages with dedicated vehicles and luxury stays
              </p>
            </div>

            <button
              onClick={() => openEnquiryModal({ destination: destination.name })}
              className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded shadow-sm"
            >
              Custom Plan for {destination.name}
            </button>
          </div>

          {matchingPackages.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
              <p className="text-base text-slate-600 font-medium mb-4">
                We craft custom private itineraries for {destination.name}.
              </p>
              <button
                onClick={() => openEnquiryModal({ destination: destination.name })}
                className="px-6 py-2.5 text-xs uppercase font-bold tracking-wider text-[#07111F] bg-[#D4AF37] rounded"
              >
                Plan a Custom {destination.name} Trip
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.coverImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#07111F]/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span>{pkg.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{pkg.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold font-editorial text-[#07111F] mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {pkg.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block">Starting</span>
                        <span className="text-lg font-bold text-[#07111F] font-brand">
                          ₹{pkg.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => navigateTo('packages', pkg.slug)}
                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
