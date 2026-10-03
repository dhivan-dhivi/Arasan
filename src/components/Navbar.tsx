import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Phone, Compass, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, navigateTo, openEnquiryModal, settings, isAdmin } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Destinations', view: 'destinations' },
    { label: 'Packages', view: 'packages' },
    { label: 'Fleet', view: 'fleet' },
    { label: 'About', view: 'about' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'Stories', view: 'blog' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    setMobileMenuOpen(false);
    navigateTo(view);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || activeView !== 'home'
            ? 'bg-[#07111F]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-gradient-to-b from-[#07111F]/80 via-[#07111F]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single element brand wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#07111F] text-[#D4AF37] group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-[0.18em] uppercase text-white font-brand transition-colors group-hover:text-[#D4AF37]">
                ARASAN HOLIDAYS
              </span>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative py-1 transition-colors hover:text-[#D4AF37] ${
                    activeView === link.view ? 'text-[#D4AF37] font-semibold' : 'text-slate-200'
                  }`}
                >
                  {link.label}
                  {activeView === link.view && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => navigateTo('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                  isAdmin
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                    : 'border-white/20 text-slate-300 hover:border-[#D4AF37]/50 hover:text-white'
                }`}
                title="Management Console"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Admin Live' : 'Admin'}</span>
              </button>

              <button
                onClick={() => openEnquiryModal()}
                className="px-5 py-2 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2e] transition-colors rounded-sm shadow-md shadow-[#D4AF37]/20 whitespace-nowrap"
              >
                Plan Your Trip
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => navigateTo('admin')}
                className="p-1.5 text-slate-300 hover:text-[#D4AF37]"
                title="Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-[#D4AF37] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#07111F] text-white flex flex-col pt-20 pb-8 px-6 overflow-y-auto lg:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <span className="text-lg font-bold tracking-[0.2em] font-brand text-[#D4AF37]">
              ARASAN HOLIDAYS
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-5 text-lg font-medium">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-left py-1 transition-colors ${
                  activeView === link.view ? 'text-[#D4AF37] font-bold' : 'text-slate-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-[#07111F] bg-[#D4AF37] rounded-sm shadow-md"
            >
              Plan Your Trip
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('admin');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-300 border border-white/20 rounded-sm"
            >
              Admin Portal
            </button>
          </div>

          <div className="mt-auto pt-6 text-xs text-slate-400">
            <p className="flex items-center gap-2 mb-1">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{settings.phone}</span>
            </p>
            <p className="text-slate-500">{settings.tagline}</p>
          </div>
        </div>
      )}
    </>
  );
};
