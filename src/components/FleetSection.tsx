import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Briefcase, Wind, Check, Shield, Sparkles, MessageCircle } from 'lucide-react';
import { Vehicle } from '../types';
import { OptimizedImage } from './OptimizedImage';

export const FleetSection: React.FC = () => {
  const { vehicles, openEnquiryModal, openWhatsApp } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Innova Crysta', 'Tempo Traveller', 'SUV', 'Sedan', 'Luxury Car'];

  const filteredVehicles = vehicles.filter((v) => {
    if (!v.available) return false;
    if (selectedType === 'All') return true;
    return v.type === selectedType;
  });

  const handleBookVehicle = (veh: Vehicle) => {
    openEnquiryModal({
      vehicleName: veh.name,
      destination: 'Vehicle Rental / Outstation Transfer',
    });
  };

  const handleWhatsAppVehicle = (veh: Vehicle) => {
    const msg = `Hello Arasan Holidays, I would like to inquire about booking the ${veh.name} (${veh.passengers} passengers, ₹${veh.pricePerDay.toLocaleString('en-IN')}/day or ₹${veh.pricePerKm}/km). Please share rate card and availability.`;
    openWhatsApp(msg);
  };

  return (
    <section id="fleet-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Executive Mobility</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07111F] tracking-tight">
          TRAVEL IN COMFORT
        </h2>
        <p className="text-slate-600 mt-3 text-base sm:text-lg font-light leading-relaxed">
          Own-fleet sanitized vehicles with polite, verified chauffeurs experienced in mountain terrain and interstate travel.
        </p>
      </div>

      {/* Vehicle Type Filters */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              selectedType === t
                ? 'bg-[#07111F] text-[#D4AF37] shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((veh) => (
          <div
            key={veh.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-[#07111F]">
              <OptimizedImage
                src={veh.coverImage}
                alt={veh.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-[#07111F]/80 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                  {veh.type}
                </span>
              </div>

              {/* Spec badge overlays */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {veh.passengers} Seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {veh.luggage} Bags
                  </span>
                </div>
                {veh.ac && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Wind className="w-3.5 h-3.5" />
                    AC Chilled
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-editorial text-[#07111F] mb-2">
                  {veh.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {veh.description}
                </p>

                {/* Key features bullets */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                  {veh.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Tariff</span>
                    <span className="text-2xl font-bold text-[#07111F] font-brand">
                      ₹{veh.pricePerDay.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium"> / day</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Outstation</span>
                    <span className="text-sm font-bold text-slate-800">
                      ₹{veh.pricePerKm} / km
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleBookVehicle(veh)}
                    className="py-2.5 text-xs font-bold uppercase tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded text-center shadow-sm"
                  >
                    Book Vehicle
                  </button>
                  <button
                    onClick={() => handleWhatsAppVehicle(veh)}
                    className="py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors rounded text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
