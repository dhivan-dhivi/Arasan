import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, ArrowRight, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo, openEnquiryModal, openWhatsApp, settings, isPreloaderComplete } = useApp();
  const [animateText, setAnimateText] = useState(false);

  // Trigger animation as soon as preloader finishes or if already finished
  useEffect(() => {
    if (isPreloaderComplete) {
      // Small 150ms buffer after preloader fade-out to give dramatic cinematic effect
      const timer = setTimeout(() => {
        setAnimateText(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isPreloaderComplete]);

  // Fallback trigger after 3.8s in case preloader completes or is bypassed
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setAnimateText(true);
    }, 3800);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleScrollDown = () => {
    const searchSection = document.getElementById('trip-search-bar');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07111F] text-white pt-24 pb-20"
    >
      {/* Cinematic Background with multi-layer overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format,compress&fit=crop&w=1280&q=75"
          alt="Cinematic Munnar Kerala tea plantation road journey"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_14s_ease-in-out_infinite]"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Layer 1: Dark gradient overlay for supreme legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/75 to-[#07111F]/50" />
        {/* Layer 2: Subtle golden atmospheric vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,17,31,0.6)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Trust badge */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-medium tracking-wider text-[#D4AF37] uppercase mb-6 transition-all duration-700 ${
            animateText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{settings.heroBadge}</span>
        </div>

        {/* Main Headline with dynamic cinematic stagger reveal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-editorial tracking-tight text-white mb-6 leading-[1.1] max-w-4xl">
          {/* Line 1: YOUR NEXT JOURNEY */}
          <span className="block overflow-hidden pb-1">
            <span
              className={`inline-block mr-2 sm:mr-3.5 transition-all duration-700 ease-out ${
                animateText
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-12 blur-sm'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              YOUR
            </span>
            <span
              className={`inline-block mr-2 sm:mr-3.5 transition-all duration-700 ease-out ${
                animateText
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-12 blur-sm'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              NEXT
            </span>
            <span
              className={`inline-block transition-all duration-700 ease-out ${
                animateText
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-12 blur-sm'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              JOURNEY
            </span>
          </span>

          {/* Line 2: STARTS HERE. with luxury metallic gold shimmer */}
          <span className="block overflow-hidden pt-1 italic font-editorial glow-gold-pulse">
            <span
              className={`inline-block shimmer-gold mr-2 sm:mr-3.5 transition-all duration-800 ease-out ${
                animateText
                  ? 'opacity-100 translate-y-0 filter-none scale-100'
                  : 'opacity-0 translate-y-12 blur-sm scale-95'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              STARTS
            </span>
            <span
              className={`inline-block shimmer-gold transition-all duration-800 ease-out ${
                animateText
                  ? 'opacity-100 translate-y-0 filter-none scale-100'
                  : 'opacity-0 translate-y-12 blur-sm scale-95'
              }`}
              style={{ transitionDelay: '750ms' }}
            >
              HERE.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-10 leading-relaxed transition-all duration-700 ease-out ${
            animateText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {settings.heroSubtitle}
        </p>

        {/* Primary Call to Actions */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10 transition-all duration-700 ease-out ${
            animateText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1050ms' }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('featured-packages-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else navigateTo('packages');
            }}
            className="w-full sm:w-auto px-8 py-3.5 text-sm uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c39e2c] transition-all rounded-sm shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-8 py-3.5 text-sm uppercase tracking-wider font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all rounded-sm flex items-center justify-center cursor-pointer"
          >
            Plan My Trip
          </button>
        </div>

        {/* Secondary Quick WhatsApp Enquiry */}
        <div
          className={`flex items-center gap-3 text-xs sm:text-sm text-slate-300 transition-all duration-700 ease-out ${
            animateText ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <span className="text-slate-400">Prefer instant consultation?</span>
          <button
            onClick={() => openWhatsApp('Hello Arasan Holidays, I would like to speak to a travel expert about planning a trip.')}
            className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#f3de8a] font-semibold underline underline-offset-4 decoration-[#D4AF37]/50 hover:decoration-[#D4AF37] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Talk to a Travel Expert</span>
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[11px] tracking-[0.2em] font-medium text-slate-400 hover:text-[#D4AF37] transition-colors uppercase group focus:outline-none cursor-pointer"
        aria-label="Scroll down to explore"
      >
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent group-hover:h-10 transition-all duration-300" />
      </button>
    </section>
  );
};
