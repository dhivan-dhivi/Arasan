import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickTripSearch } from './components/QuickTripSearch';
import { TrustStrip } from './components/TrustStrip';
import { DestinationsSection } from './components/DestinationsSection';
import { DestinationDetailView } from './components/DestinationDetailView';
import { FeaturedPackages } from './components/FeaturedPackages';
import { PackageDetailView } from './components/PackageDetailView';
import { CustomTripSection } from './components/CustomTripSection';
import { WhyArasan } from './components/WhyArasan';
import { TravelExperience } from './components/TravelExperience';
import { FleetSection } from './components/FleetSection';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { BlogDetailView } from './components/BlogDetailView';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { EnquiryModal } from './components/EnquiryModal';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { LegalPages } from './components/LegalPages';
import { NotFoundPage } from './components/NotFoundPage';
import { AdminPanel } from './components/AdminPanel';
import { ScrollReveal } from './components/ScrollReveal';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    selectedPackage,
    selectedDestination,
    selectedBlog,
    toastMessage,
  } = useApp();

  // Route Views Renderer
  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <main>
            <Hero />
            <ScrollReveal animation="fade-up" delay={50}>
              <QuickTripSearch />
            </ScrollReveal>
            <ScrollReveal animation="scale" delay={100}>
              <TrustStrip />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <DestinationsSection />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <FeaturedPackages />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <WhyArasan />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <TravelExperience />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <FleetSection />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <HowItWorks />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <TestimonialsSection />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <GallerySection />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <CustomTripSection />
            </ScrollReveal>
            <ScrollReveal animation="fade-up">
              <BlogSection />
            </ScrollReveal>
          </main>
        );

      case 'destinations':
        return (
          <main className="pt-16">
            <DestinationsSection />
            <CustomTripSection />
          </main>
        );

      case 'destination-detail':
        return selectedDestination ? (
          <DestinationDetailView destination={selectedDestination} />
        ) : (
          <NotFoundPage />
        );

      case 'packages':
        return (
          <main className="pt-16">
            <FeaturedPackages />
            <CustomTripSection />
          </main>
        );

      case 'package-detail':
        return selectedPackage ? (
          <PackageDetailView packageData={selectedPackage} />
        ) : (
          <NotFoundPage />
        );

      case 'fleet':
        return (
          <main className="pt-16">
            <FleetSection />
            <CustomTripSection />
          </main>
        );

      case 'about':
        return <AboutSection />;

      case 'gallery':
        return (
          <main className="pt-16">
            <GallerySection />
          </main>
        );

      case 'blog':
        return (
          <main className="pt-16">
            <BlogSection />
          </main>
        );

      case 'blog-detail':
        return selectedBlog ? <BlogDetailView blog={selectedBlog} /> : <NotFoundPage />;

      case 'contact':
        return <ContactSection />;

      case 'plan-your-trip':
        return (
          <main className="pt-16">
            <CustomTripSection />
          </main>
        );

      case 'admin':
        return <AdminPanel />;

      case 'privacy':
        return <LegalPages pageType="privacy" />;

      case 'terms':
        return <LegalPages pageType="terms" />;

      case 'cancellation':
        return <LegalPages pageType="cancellation" />;

      case 'refund':
        return <LegalPages pageType="refund" />;

      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#111827]">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Page View */}
      <div className="flex-1">{renderView()}</div>

      {/* Interactive Modal */}
      <EnquiryModal />

      {/* WhatsApp & Mobile Action Controls */}
      {activeView !== 'admin' && <FloatingActions />}

      {/* Footer */}
      {activeView !== 'admin' && <Footer />}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#07111F] text-white px-5 py-3 rounded-lg shadow-2xl border border-[#D4AF37]/50 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <AppProvider>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <AppContent />
    </AppProvider>
  );
}
