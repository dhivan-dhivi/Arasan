import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MessageCircle, Send, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TripType } from '../types';

export const CustomTripSection: React.FC = () => {
  const { destinations, addEnquiry, openWhatsApp, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState(2);
  const [tripType, setTripType] = useState<TripType>('Family');
  const [budget, setBudget] = useState('₹25,000 – ₹50,000');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !destination) {
      showToast('Please fill in your name, phone number, and destination.');
      return;
    }

    addEnquiry({
      name,
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@lead.arasan`,
      destination,
      travelDate: travelDate || new Date().toISOString().split('T')[0],
      travellers,
      tripType,
      budget,
      message: specialRequirements ? `Custom trip request: ${specialRequirements}` : 'Custom trip requested from website.',
    });

    setIsSubmitted(true);
  };

  const handleWhatsAppChat = () => {
    const msg = `Hello Arasan Holidays! I submitted a custom trip request:\nName: ${name}\nDestination: ${destination}\nTravel Date: ${travelDate || 'Flexible'}\nTravellers: ${travellers} (${tripType})\nBudget: ${budget}\nRequirements: ${specialRequirements || 'Standard package'}`;
    openWhatsApp(msg);
  };

  return (
    <section id="custom-trip-section" className="py-24 bg-[#07111F] text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Travel Planning</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-editorial tracking-tight leading-[1.1]">
              YOUR TRIP. <br />
              <span className="gold-gradient-text italic font-editorial">YOUR WAY.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Tell us where you want to go. We'll help design the journey around your budget, dates, and travel style.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">No Cookie-Cutter Itineraries</h4>
                  <p className="text-xs text-slate-400 font-light">Custom vehicle routes, flexible start times, and stays matched to your comfort.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Tamil Nadu Hospitality</h4>
                  <p className="text-xs text-slate-400 font-light">Personal tour coordinator assigned to guide you before and during the trip.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Trip Builder Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0D1B2E] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-editorial text-white mb-2">
                      Custom Plan Received!
                    </h3>
                    <p className="text-sm text-slate-300 font-light max-w-md mx-auto">
                      Thank you, <span className="text-[#D4AF37] font-semibold">{name}</span>. Our senior travel consultant is preparing your personalized itinerary.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppChat}
                      className="w-full sm:w-auto px-6 py-3 text-xs uppercase font-bold tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors rounded flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp Now</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setPhone('');
                        setSpecialRequirements('');
                      }}
                      className="w-full sm:w-auto px-6 py-3 text-xs uppercase font-bold tracking-wider text-slate-300 bg-white/10 hover:bg-white/20 transition-colors rounded"
                    >
                      Submit Another Plan
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold font-editorial text-white">
                      Build My Custom Journey
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill in the details below and we will prepare a bespoke estimate within 2 hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Senthil Kumar"
                        className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98401 23456"
                        className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Destination *
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      >
                        <option value="">Select Destination</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                        <option value="South India Temple Circuit">South India Temple Circuit</option>
                        <option value="Multiple Destinations">Multiple Destinations</option>
                      </select>
                    </div>

                    {/* Travel Date */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Tentative Travel Date
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    {/* Travellers */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Number of Travellers
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={travellers}
                        onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
                        className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    {/* Trip Type */}
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                        Trip Type
                      </label>
                      <select
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value as TripType)}
                        className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="Family">Family Tour</option>
                        <option value="Couple">Couple Trip</option>
                        <option value="Honeymoon">Honeymoon Package</option>
                        <option value="Friends">Friends Group</option>
                        <option value="Corporate">Corporate / Offsite</option>
                        <option value="College">College Industrial Visit / Tour</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                      Estimated Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="Under ₹25,000">Under ₹25,000</option>
                      <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                      <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                      <option value="₹1,00,000 – ₹2,00,000">₹1,00,000 – ₹2,00,000</option>
                      <option value="₹2,00,000+ (Luxury)">₹2,00,000+ (Luxury)</option>
                    </select>
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                      Special Requirements / Vehicle Preference
                    </label>
                    <textarea
                      rows={3}
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder="e.g. Need Innova Crysta pickup from Chennai, ground floor room for senior citizens, vegetarian meal options..."
                      className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-all rounded shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <span>Build My Trip</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
