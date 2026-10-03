import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Destination',
      description: 'Pick from our signature circuits or request any destination across Tamil Nadu and Pan-India.',
    },
    {
      num: '02',
      title: 'Share Requirements',
      description: 'Tell us your dates, group size, vehicle preference, and comfort level via form or WhatsApp.',
    },
    {
      num: '03',
      title: 'Get Custom Plan',
      description: 'Receive a transparent day-by-day itinerary with verified hotel options and all-inclusive pricing.',
    },
    {
      num: '04',
      title: 'Confirm Journey',
      description: 'Secure your booking with flexible advance payments and receive immediate booking vouchers.',
    },
    {
      num: '05',
      title: 'Travel & Enjoy',
      description: 'Step into your sanitized vehicle and relax with 24/7 dedicated travel support throughout.',
    },
  ];

  return (
    <section className="py-24 bg-[#07111F] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Seamless Coordination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-white tracking-tight">
            HOW IT WORKS
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg font-light leading-relaxed">
            Planning your dream holiday is effortless when every milestone is handled with utmost precision.
          </p>
        </div>

        {/* Steps Grid with Route Line */}
        <div className="relative">
          {/* Desktop connecting route line */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px]">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 2">
              <line
                x1="0"
                y1="1"
                x2="1000"
                y2="1"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="opacity-40 animate-route"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group relative z-10">
                {/* Number Circle Badge */}
                <div className="w-14 h-14 rounded-full bg-[#0D1B2E] border-2 border-[#D4AF37] flex items-center justify-center text-sm font-extrabold font-brand text-[#D4AF37] mb-5 shadow-lg group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#07111F] transition-all">
                  {step.num}
                </div>

                <h3 className="text-base font-bold font-editorial text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
