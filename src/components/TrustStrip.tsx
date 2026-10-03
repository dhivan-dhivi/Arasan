import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Route, Map, Clock } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const { settings } = useApp();
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: settings.stats.happyTravelers || '500+',
      label: 'Happy Travelers',
      sublabel: 'Across Tamil Nadu & Pan-India',
      icon: Users,
    },
    {
      value: settings.stats.tripsOrganized || '100+',
      label: 'Trips Organized',
      sublabel: 'Customized & Group Journeys',
      icon: Route,
    },
    {
      value: settings.stats.destinations || '25+',
      label: 'Destinations',
      sublabel: 'Handpicked Mountain & Beach Trails',
      icon: Map,
    },
    {
      value: settings.stats.assistance || '24/7',
      label: 'Travel Assistance',
      sublabel: 'Dedicated Tour Manager',
      icon: Clock,
    },
  ];

  return (
    <section ref={containerRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      {/* Impeccably Aligned 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-6 items-stretch">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`bg-white border border-slate-200/90 hover:border-[#D4AF37]/50 rounded-xl p-4 sm:p-6 shadow-xs hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-500 flex flex-col justify-between h-full min-h-[140px] sm:min-h-[160px] group ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Header: Icon & Big Number perfectly aligned horizontally */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#07111F] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#07111F] font-brand tracking-tight tabular-nums">
                  {item.value}
                </span>
              </div>

              {/* Body: Uniform container for title and subtext so both row items stay symmetrical */}
              <div className="flex flex-col justify-end">
                <h4 className="text-xs sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {item.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 font-light mt-1 leading-snug min-h-[2.25rem] sm:min-h-[2.5rem] flex items-start">
                  {item.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
