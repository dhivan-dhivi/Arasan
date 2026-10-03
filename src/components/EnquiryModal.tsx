import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, MessageCircle, CheckCircle2, Sparkles, MapPin, Calendar, Users } from 'lucide-react';
import { TripType } from '../types';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, closeEnquiryModal, enquiryPrefill, destinations, addEnquiry, openWhatsApp, showToast } =
    useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState(2);
  const [tripType, setTripType] = useState<TripType>('Family');
  const [budget, setBudget] = useState('₹25,000 – ₹50,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (enquiryPrefill) {
      if (enquiryPrefill.destination) setDestination(enquiryPrefill.destination);
      if (enquiryPrefill.packageTitle) {
        setMessage(`Inquiring about: ${enquiryPrefill.packageTitle}`);
      }
      if (enquiryPrefill.vehicleName) {
        setMessage(`Inquiring about booking: ${enquiryPrefill.vehicleName}`);
      }
    }
  }, [enquiryPrefill]);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !destination) {
      showToast('Please provide your name, phone number, and destination.');
      return;
    }

    addEnquiry({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@quicklead.arasan`,
      destination,
      travelDate: travelDate || new Date().toISOString().split('T')[0],
      travellers,
      tripType,
      budget,
      message: message || (enquiryPrefill?.packageTitle ? `Interested in ${enquiryPrefill.packageTitle}` : 'Quick enquiry submitted'),
    });

    setIsSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    const msg = `Hello Arasan Holidays! I am inquiring about:\nName: ${name || 'Traveler'}\nDestination: ${destination || 'Custom Tour'}\nDate: ${travelDate || 'Flexible'}\nTravellers: ${travellers}\nNotes: ${message || 'Please share detailed quote'}`;
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0D1B2E] border border-white/10 rounded-2xl p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={closeEnquiryModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-editorial text-white">
              Enquiry Received!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mx-auto">
              Thank you, <span className="text-[#D4AF37] font-semibold">{name}</span>. An Arasan Holidays destination specialist will reach out shortly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDirectWhatsApp}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase font-bold tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-colors rounded flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Reply</span>
              </button>
              <button
                onClick={closeEnquiryModal}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase font-bold tracking-wider text-slate-300 bg-white/10 hover:bg-white/20 transition-colors rounded"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block mb-1">
                {enquiryPrefill?.packageTitle ? 'Package Booking Enquiry' : 'Plan Your Journey'}
              </span>
              <h3 className="text-2xl font-bold font-editorial text-white">
                {enquiryPrefill?.packageTitle || 'Tell Us What You Need'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98401 23456"
                  className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Kerala, Manali, Ooty"
                  className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Travellers Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={travellers}
                  onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Trip Type
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value as TripType)}
                  className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="Family">Family Tour</option>
                  <option value="Couple">Couple Trip</option>
                  <option value="Honeymoon">Honeymoon Package</option>
                  <option value="Friends">Friends Group</option>
                  <option value="Group">Large Group</option>
                  <option value="Corporate">Corporate Tour</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Special Requests or Notes
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Preferred vehicle, hotel type, dietary preferences..."
                className="w-full bg-[#07111F] border border-white/15 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full py-3 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded shadow-md flex items-center justify-center gap-2"
              >
                <span>Submit Enquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-3 text-xs uppercase tracking-wider font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 transition-colors rounded flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
