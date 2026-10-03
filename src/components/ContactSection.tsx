import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, addEnquiry, openWhatsApp, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please provide your name and contact phone number.');
      return;
    }

    addEnquiry({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@contact.lead`,
      destination: destination || 'General Inquiry',
      travelDate: travelDate || new Date().toISOString().split('T')[0],
      travellers: 2,
      tripType: 'Family',
      budget: 'Standard',
      message: message || 'Message sent via Contact Us form.',
    });

    setIsSubmitted(true);
  };

  return (
    <div className="pt-24 pb-24 bg-[#F8F7F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-3 py-1 rounded bg-[#07111F] text-xs font-bold uppercase tracking-widest text-[#D4AF37] inline-block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-editorial text-[#07111F] tracking-tight mb-4">
            LET'S PLAN YOUR NEXT EXPEDITION
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Reach our Tamil Nadu operations team directly by phone, WhatsApp, or through the contact form below.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold font-editorial text-[#07111F]">
                Arasan Holidays Office
              </h3>
              <p className="text-xs text-slate-500 font-light">
                {settings.tagline}
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#07111F] text-[#D4AF37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Headquarters</h4>
                    <p className="text-sm font-semibold text-[#07111F] mt-0.5 leading-relaxed">
                      {settings.officeAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#07111F] text-[#D4AF37] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Call Assistance</h4>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-semibold text-[#07111F] hover:text-[#2563EB] transition-colors mt-0.5 block"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#07111F] text-[#D4AF37] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">WhatsApp Direct</h4>
                    <button
                      onClick={() => openWhatsApp('Hello Arasan Holidays, I would like to get in touch regarding tour packages.')}
                      className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors mt-0.5 block text-left"
                    >
                      Chat on +{settings.whatsappNumber}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#07111F] text-[#D4AF37] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Official Email</h4>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm font-semibold text-[#07111F] hover:text-[#2563EB] transition-colors mt-0.5 block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#07111F] text-[#D4AF37] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400">Office Working Hours</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {settings.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map Placeholder/Link Card */}
            <div className="bg-[#07111F] text-white p-6 rounded-2xl border border-white/10 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold font-editorial text-white mb-1">
                  Locate Us in Chennai
                </h4>
                <p className="text-xs text-slate-400 font-light">
                  Central commercial hub near Anna Salai
                </p>
              </div>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] rounded hover:bg-[#c29e2c] transition-colors whitespace-nowrap"
              >
                Open in Maps
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-editorial text-[#07111F] mb-2">
                      Message Dispatched!
                    </h3>
                    <p className="text-sm text-slate-600 font-light max-w-md mx-auto">
                      Thank you for contacting Arasan Holidays. Our travel desk will call you or reply on WhatsApp within 30 minutes during business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 text-xs uppercase font-bold tracking-wider text-[#07111F] bg-[#D4AF37] rounded"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold font-editorial text-[#07111F]">
                      Send Us an Enquiry
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Whether you need a full tour package or vehicle hire, we’re happy to assist.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98401 23456"
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Target Destination
                      </label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Kerala, Manali, Ooty, Coorg"
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Expected Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Your Message or Questions
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please share details such as number of travelers, stay preferences, or custom routes..."
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-all rounded shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
