import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openWhatsApp, settings } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050D18] text-white pt-16 pb-24 sm:pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-[0.2em] uppercase font-brand text-white">
                ARASAN HOLIDAYS
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {settings.tagline}
            </p>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Established Tamil Nadu based premier travel company offering customized domestic holiday packages, private executive fleet rentals, and curated journeys across India.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 hover:text-[#D4AF37] transition-colors flex items-center justify-center text-xs"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 hover:text-[#D4AF37] transition-colors flex items-center justify-center text-xs"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 hover:text-[#D4AF37] transition-colors flex items-center justify-center text-xs"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 hover:text-[#D4AF37] transition-colors flex items-center justify-center text-xs"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('destinations')} className="hover:text-white transition-colors">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('packages')} className="hover:text-white transition-colors">
                  Tour Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('fleet')} className="hover:text-white transition-colors">
                  Vehicle Fleet
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-white transition-colors">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-white transition-colors">
                  Travel Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
              Company & Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cancellation')} className="hover:text-white transition-colors">
                  Cancellation & Refund
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
              Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Tamil Nadu, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <button onClick={() => openWhatsApp()} className="hover:text-white text-left">
                  +{settings.whatsappNumber}
                </button>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Arasan Holidays. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Powered by <span className="text-slate-300 font-medium">BrandBolt</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-white/10 hover:bg-[#D4AF37] hover:text-[#07111F] transition-all text-white"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
