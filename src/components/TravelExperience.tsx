import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

export const TravelExperience: React.FC = () => {
  const { navigateTo } = useApp();

  const experiences = [
    {
      destination: 'Kerala',
      title: 'Misty Mountains & Quiet Backwaters',
      description:
        'Wake up to the cool scent of tea leaves tumbling across Munnar’s endless green ridgelines. As afternoon settles, drift peacefully along the palm-fringed backwaters of Alleppey on a handcrafted luxury Kettuvallam, with freshly caught Karimeen fish and sunset reflections on tranquil waters.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=70&fm=webp',
      slug: 'kerala',
      badge: 'Signature Journey',
      reverse: false,
    },
    {
      destination: 'Manali',
      title: 'High Himalayan Peaks & Pine River Valleys',
      description:
        'Chase winding mountain passes flanked by colossal snow peaks. Feel the crisp mountain air whistling through ancient deodar sanctuaries in Old Manali, cross through the engineering wonder of Atal Tunnel into Lahaul, and gather around a warm cedar campfire as twilight deepens.',
      image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=70&fm=webp',
      slug: 'manali',
      badge: 'Alpine Adventure',
      reverse: true,
    },
    {
      destination: 'Kashmir',
      title: 'The Valley of Eternal Serenity',
      description:
        'Gliding gently on a cedar Shikara across mirror-smooth Dal Lake as floating lotus blossoms catch the dawn glow. From the world’s highest gondola flights in snowbound Gulmarg to the tranquil whispering pine forests along the rushing Lidder in Pahalgam, Kashmir leaves an indelible mark on every soul.',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=70&fm=webp',
      slug: 'kashmir',
      badge: 'Royal Heritage',
      reverse: false,
    },
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              exp.reverse ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Side */}
            <div
              className={`lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl bg-[#07111F] group ${
                exp.reverse ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <OptimizedImage
                  src={exp.image}
                  alt={exp.destination}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-[#07111F]/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                  {exp.badge}
                </span>
              </div>
            </div>

            {/* Narrative Editorial Side */}
            <div
              className={`lg:col-span-5 space-y-6 ${
                exp.reverse ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                <MapPin className="w-4 h-4" />
                <span>{exp.destination} Experience</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold font-editorial text-[#07111F] tracking-tight leading-snug">
                {exp.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
                {exp.description}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('destinations', exp.slug)}
                  className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-all rounded shadow-md flex items-center gap-2 group"
                >
                  <span>Explore {exp.destination}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
