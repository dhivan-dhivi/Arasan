import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Calendar, Users, MapPin, Sparkles, IndianRupee } from 'lucide-react';
import { TripType } from '../types';

export const QuickTripSearch: React.FC = () => {
  const { destinations, navigateTo, openEnquiryModal, showToast } = useApp();

  const [destination, setDestination] = useState<string>('');
  const [travelDate, setTravelDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [travellers, setTravellers] = useState<number>(2);
  const [tripType, setTripType] = useState<TripType>('Family');
  const [budget, setBudget] = useState<string>('Standard');

  const tripTypes: TripType[] = ['Family', 'Couple', 'Honeymoon', 'Friends', 'Group', 'Corporate', 'College'];
  const budgetOptions = ['Budget (₹5k - ₹15k)', 'Standard (₹15k - ₹35k)', 'Premium (₹35k - ₹75k)', 'Luxury (₹75k+)'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) {
      showToast('Please select your preferred destination.');
      return;
    }

    // Direct user to package or enquiry modal with filled data
    openEnquiryModal({
      destination,
      packageTitle: `${destination} (${tripType} Trip)`,
    });
  };

  return (
    <div id="trip-search-bar" className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 mb-16">
      <div className="bg-[#0B1728] border border-[#D4AF37]/30 rounded-lg shadow-2xl p-4 sm:p-6 backdrop-blur-xl">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          {/* Top Bar Indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs tracking-wider text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold text-[#D4AF37] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Quick Trip Planner
            </span>
            <span className="hidden sm:inline text-slate-400">Customized Tamil Nadu & Pan-India Tours</span>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Destination */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                required
              >
                <option value="">Where to?</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                Departure Date
              </label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {/* Return Date */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {/* Travellers Count */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#D4AF37]" />
                Travellers
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={travellers}
                onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
                className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {/* Trip Type */}
            <div className="flex flex-col">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                Trip Type
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value as TripType)}
                className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                {tripTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="w-full h-[40px] mt-auto px-4 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c49f2b] transition-all rounded flex items-center justify-center gap-1.5 shadow-md shadow-[#D4AF37]/20 whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Find My Trip</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
