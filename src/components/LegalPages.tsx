import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

interface LegalPagesProps {
  pageType: 'privacy' | 'terms' | 'cancellation' | 'refund';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType }) => {
  const { navigateTo, settings } = useApp();

  const getPageContent = () => {
    switch (pageType) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          lastUpdated: 'Updated January 2026',
          sections: [
            {
              heading: '1. Information We Collect',
              text: 'When you request a quote, book a tour package, or reserve a vehicle with Arasan Holidays, we collect necessary personal details including your name, contact phone number, email address, travel dates, passenger counts, and travel preferences.',
            },
            {
              heading: '2. How We Use Your Information',
              text: 'Your information is used solely to facilitate your travel arrangements, arrange hotel vouchers, coordinate vehicle chauffeurs, secure required permit passes (e.g. Rohtang Pass, wildlife sanctuaries), and communicate critical itinerary updates.',
            },
            {
              heading: '3. Data Security & Third-Party Disclosure',
              text: 'We never sell, rent, or trade your personal information to third-party telemarketers. Information is only shared with verified service partners (such as your allocated hotel or licensed boat operator) strictly for the fulfillment of your itinerary.',
            },
            {
              heading: '4. Contact for Privacy Matters',
              text: `For any inquiries regarding your stored contact data, please contact our data officer at ${settings.email}.`,
            },
          ],
        };

      case 'terms':
        return {
          title: 'Terms & Conditions',
          lastUpdated: 'Updated January 2026',
          sections: [
            {
              heading: '1. Booking & Confirmation',
              text: 'A package booking is confirmed only upon receipt of the mutually agreed advance payment and the issuance of a formal Arasan Holidays booking voucher with booking ID.',
            },
            {
              heading: '2. Tariffs & Inclusions',
              text: 'All agreed quotes clearly specify vehicle type, meal plans, and included sightseeing. Any deviations, extra kilometers, or additional sightseeing outside the agreed route will be billed on actuals as per standard vehicle rate cards.',
            },
            {
              heading: '3. Driver & Vehicle Regulations',
              text: 'Our chauffeurs adhere to standard road safety and motor vehicle guidelines. In mountainous terrain (such as Ooty, Kodaikanal, Manali), night driving after 9:00 PM is restricted for passenger safety except in medical emergencies.',
            },
            {
              heading: '4. Force Majeure & Natural Occurrences',
              text: 'Arasan Holidays will actively assist in rerouting or rescheduling if unexpected landslides, heavy snowfall, strikes, or administrative closures occur. However, additional hotel or transport expenses arising from unforeseen nature events remain the passenger’s responsibility.',
            },
          ],
        };

      case 'cancellation':
      case 'refund':
        return {
          title: 'Cancellation & Refund Policy',
          lastUpdated: 'Updated January 2026',
          sections: [
            {
              heading: '1. Cancellation Windows',
              text: '• More than 15 days before travel: 90% refund of package advance.\n• Between 7 and 14 days before travel: 50% refund of advance.\n• Less than 7 days before departure: Advance amount is non-refundable as vehicle and hotel slots are permanently reserved.',
            },
            {
              heading: '2. Rescheduling Allowance',
              text: 'We understand family emergencies happen. You may reschedule your journey up to 7 days prior to departure without cancellation penalties, subject to hotel availability and seasonal tariff differences.',
            },
            {
              heading: '3. Refund Processing Timeline',
              text: 'Approved refunds will be processed via original payment method (NEFT / UPI / Card) within 5 to 7 working business days.',
            },
            {
              heading: '4. Vehicle Breakdown Guarantee',
              text: 'In the extremely rare event of a technical vehicle issue, Arasan Holidays guarantees immediate replacement within 2 hours or full pro-rata refund for that leg.',
            },
          ],
        };
    }
  };

  const content = getPageContent();

  return (
    <div className="pt-24 pb-24 bg-[#F8F7F3] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-slate-600 hover:text-[#07111F] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/90 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block mb-1">
              Arasan Holidays Legal
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#07111F]">
              {content.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">{content.lastUpdated}</p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed font-light text-sm sm:text-base">
            {content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-[#07111F] font-editorial">
                  {sec.heading}
                </h3>
                <p className="whitespace-pre-line text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sec.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
