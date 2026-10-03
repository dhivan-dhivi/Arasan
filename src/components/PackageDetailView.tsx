import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package } from '../types';
import {
  Clock,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Share2,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Phone,
} from 'lucide-react';

interface PackageDetailViewProps {
  packageData: Package;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({ packageData }) => {
  const { navigateTo, openEnquiryModal, openWhatsApp, showToast } = useApp();
  const [activeDay, setActiveDay] = useState<number>(1);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Package link copied to clipboard!');
    }
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello Arasan Holidays, I am interested in the "${packageData.title}" (${packageData.duration}, starting ₹${packageData.startingPrice.toLocaleString('en-IN')}) package. Please share itinerary details and available dates.`;
    openWhatsApp(msg);
  };

  return (
    <div className="pt-24 pb-24 bg-[#F8F7F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('packages')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-slate-600 hover:text-[#07111F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packages</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#07111F] px-3 py-1.5 rounded bg-white border border-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 rounded-xl overflow-hidden shadow-lg bg-[#07111F]">
          <div className="lg:col-span-2 h-[340px] sm:h-[460px] relative overflow-hidden group">
            <img
              src={packageData.coverImage}
              alt={packageData.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{packageData.destination}</span>
                <span>·</span>
                <span>{packageData.category} Tour</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-white mb-2 tracking-tight">
                {packageData.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-2xl font-light">
                {packageData.shortDescription}
              </p>
            </div>
          </div>

          {/* Sub-gallery images */}
          <div className="hidden lg:flex flex-col gap-4">
            {packageData.galleryImages.slice(0, 2).map((img, i) => (
              <div key={i} className="h-[222px] relative overflow-hidden group">
                <img
                  src={img}
                  alt={`${packageData.title} preview ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content & Booking Sticky Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details & Itinerary */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Spec Strip */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Duration: {packageData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span>Rating: {packageData.rating.toFixed(1)} / 5 ({packageData.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Private Chauffeur & Stays</span>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200">
              <h2 className="text-2xl font-bold font-editorial text-[#07111F] mb-4">
                Trip Overview
              </h2>
              <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                {packageData.overview}
              </p>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                    Day-by-Day Itinerary
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Carefully paced for comfort and memorable experiences
                  </p>
                </div>
              </div>

              {/* Day Timeline */}
              <div className="space-y-6">
                {packageData.itinerary.map((dayItem) => (
                  <div
                    key={dayItem.day}
                    className="border-l-2 border-[#D4AF37] pl-5 sm:pl-6 relative pb-2 group"
                  >
                    {/* Circle Bullet */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#07111F] border-2 border-[#D4AF37] flex items-center justify-center" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-[#D4AF37]">
                        Day {dayItem.day.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold text-[#07111F] flex-1 sm:ml-3">
                        {dayItem.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-light mb-3">
                      {dayItem.description}
                    </p>

                    {/* Activity bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      {dayItem.activities.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-bold font-editorial text-[#07111F] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>What’s Included</span>
                </h3>
                <ul className="space-y-2.5">
                  {packageData.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-bold font-editorial text-[#07111F] mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>Not Included</span>
                </h3>
                <ul className="space-y-2.5">
                  {packageData.excluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Enquiry Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-lg border border-slate-200/90 shadow-xl space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  Starting Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#07111F] font-brand">
                    ₹{packageData.startingPrice.toLocaleString('en-IN')}
                  </span>
                  {packageData.discountPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{packageData.discountPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">/ person</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  *Prices vary based on season and vehicle chosen. All taxes included.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => openEnquiryModal({ packageTitle: packageData.title, destination: packageData.destination })}
                  className="w-full py-3.5 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded shadow-md text-center"
                >
                  Book This Trip
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3.5 text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors rounded flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>WhatsApp Enquiry</span>
                </button>

                <button
                  onClick={() => navigateTo('plan-your-trip')}
                  className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-[#07111F] transition-colors text-center"
                >
                  Request Custom Package
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% verified hotels & resort partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Transparent billing with zero hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Free date rescheduling up to 7 days prior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
