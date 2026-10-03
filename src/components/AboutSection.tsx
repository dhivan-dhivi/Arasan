import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, ShieldCheck, Heart, Users, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings, openEnquiryModal } = useApp();

  const coreValues = [
    {
      title: 'Uncompromised Safety',
      description: 'Zero tolerance for vehicle neglect. Regular mechanical fitness inspections and GPS-tracked outstation fleets.',
      icon: ShieldCheck,
    },
    {
      title: 'Authentic Tamil Hospitality',
      description: 'Warmth, respect, and courteous coordination rooted in centuries-old traditions of guest honour.',
      icon: Heart,
    },
    {
      title: 'Absolute Transparency',
      description: 'Zero hidden driver allowances, no surprise hill-station permits, and clear written vouchers before payment.',
      icon: CheckCircle2,
    },
    {
      title: 'Local First Expertise',
      description: 'Deep knowledge of ghat roads, temple timings, seasonal festivals, and authentic culinary stops.',
      icon: Compass,
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-[#F8F7F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#07111F] text-white p-8 sm:p-16 lg:p-20 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80"
              alt="Misty tea gardens of Nilgiris"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/90 to-transparent z-0" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Tamil Nadu Born · Pan-India Reach</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-editorial text-white tracking-tight leading-tight">
              WE DON'T JUST PLAN TRIPS. <br />
              <span className="gold-gradient-text italic font-editorial">WE CREATE MEMORIES.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Arasan Holidays is an established Tamil Nadu based travel company focused on creating comfortable, memorable, and personalized journeys across India.
            </p>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Our Heritage & Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#07111F] tracking-tight">
              A Decade of Travel Excellence Rooted in Trust
            </h2>

            <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
              Founded in Tamil Nadu with a clear conviction that every family, honeymoon couple, and group deserves seamless, worry-free journeys. Over the past 10+ years, Arasan Holidays has grown from a specialized South Indian cab and tour operator into a full-service holiday planner orchestrating trips from Kerala backwaters to high-altitude Himalayan summits.
            </p>

            <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
              Unlike online booking aggregators where you speak to impersonal call centers, every guest traveling with Arasan is paired with a dedicated travel coordinator who knows their route personally and monitors weather, road conditions, and hotel hospitality round the clock.
            </p>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-6">
              <div>
                <span className="text-3xl font-extrabold text-[#07111F] font-brand block">
                  {settings.stats.happyTravelers}
                </span>
                <span className="text-xs text-slate-500 font-medium">Families & Explorers Served</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-[#07111F] font-brand block">
                  {settings.stats.destinations}
                </span>
                <span className="text-xs text-slate-500 font-medium">Domestic Destinations Covered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#07111F]">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
                alt="Executive tour fleet"
                className="w-full h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/90 via-transparent to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] mb-1">
                  Private Fleet Standard
                </span>
                <h4 className="text-xl font-bold font-editorial">
                  Own-Fleet Innova Crysta, Urbania & Tempo Travellers
                </h4>
                <p className="text-xs text-slate-300 font-light mt-1">
                  Spotless interiors, disciplined mountain drivers, and 24/7 on-road support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl font-bold font-editorial text-[#07111F]">
              Our Guiding Principles
            </h3>
            <p className="text-slate-600 mt-2 text-sm font-light">
              The foundational pillars that guide every itinerary we assemble.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-[#07111F] text-[#D4AF37] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-editorial text-[#07111F] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Office & Operations Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block mb-1">
              Registered Office
            </span>
            <h4 className="text-xl font-bold text-[#07111F] font-editorial mb-2">
              Chennai Headquarters
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {settings.officeAddress}
            </p>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block mb-1">
              Business Hours
            </span>
            <h4 className="text-base font-bold text-[#07111F] mb-1">
              Customer Support Desk
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {settings.businessHours}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <button
              onClick={() => openEnquiryModal()}
              className="py-3 px-6 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded text-center shadow-md"
            >
              Plan Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
