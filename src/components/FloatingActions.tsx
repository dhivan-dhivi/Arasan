import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { openWhatsApp, openEnquiryModal, settings, activeView } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (activeView === 'home') {
        const heroEl = document.getElementById('hero-section');
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          // The floating buttons MUST ONLY show when the Hero section is completely scrolled past
          // If any part of the hero is still on screen (bottom > 70px), keep them hidden!
          const heroScrolledPast = rect.bottom <= 70;
          setIsVisible(heroScrolledPast);
        } else {
          setIsVisible(window.scrollY > window.innerHeight * 0.95);
        }
      } else {
        // On interior pages, show after scrolled past header
        setIsVisible(window.scrollY > 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  return (
    <>
      {/* Desktop Floating WhatsApp Button - Visible ONLY AFTER Hero section is scrolled past */}
      <div
        className={`hidden sm:block fixed bottom-6 right-6 z-40 group transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : 'translate-y-20 opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={() => openWhatsApp('Hello Arasan Holidays! I am interested in planning a vacation with you.')}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 group focus:outline-none cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="text-xs font-bold tracking-wide uppercase pr-1">
            WhatsApp
          </span>
          {/* Pulsing online badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar - Visible ONLY AFTER Hero section is scrolled past */}
      <div
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111F]/95 backdrop-blur-md border-t border-white/10 px-3 py-2.5 shadow-2xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
          isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-3 gap-2">
          {/* Call Now */}
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-white/10 text-white text-[11px] font-bold tracking-tight active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#D4AF37] mb-0.5" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp */}
          <button
            onClick={() => openWhatsApp('Hello Arasan Holidays! I am looking for a travel package.')}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-[#25D366] text-white text-[11px] font-bold tracking-tight active:scale-95 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
            <span>WhatsApp</span>
          </button>

          {/* Plan Trip */}
          <button
            onClick={() => openEnquiryModal()}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-[#D4AF37] text-[#07111F] text-[11px] font-bold tracking-tight active:scale-95 transition-transform cursor-pointer"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Plan Trip</span>
          </button>
        </div>
      </div>
    </>
  );
};
