import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Destination,
  Package,
  Vehicle,
  Enquiry,
  Booking,
  Customer,
  Testimonial,
  GalleryItem,
  BlogPost,
  CMSSettings,
} from '../types';
import {
  initialDestinations,
  initialPackages,
  initialVehicles,
  initialTestimonials,
  initialGallery,
  initialBlogPosts,
  initialEnquiries,
  initialBookings,
  initialCustomers,
  initialSettings,
} from '../data/initialData';

interface EnquiryPrefill {
  destination?: string;
  packageTitle?: string;
  vehicleName?: string;
}

interface AppContextType {
  // Navigation / View State
  activeView: string;
  setActiveView: (view: string) => void;
  navigateTo: (view: string, idOrSlug?: string) => void;
  
  // Modals & Selected Entities
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (veh: Vehicle | null) => void;
  selectedBlog: BlogPost | null;
  setSelectedBlog: (blog: BlogPost | null) => void;
  isEnquiryModalOpen: boolean;
  openEnquiryModal: (prefill?: EnquiryPrefill) => void;
  closeEnquiryModal: () => void;
  enquiryPrefill: EnquiryPrefill | null;
  
  // Data Collections & Operations
  destinations: Destination[];
  addDestination: (dest: Destination) => void;
  updateDestination: (dest: Destination) => void;
  deleteDestination: (id: string) => void;

  packages: Package[];
  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: string) => void;

  vehicles: Vehicle[];
  addVehicle: (veh: Vehicle) => void;
  updateVehicle: (veh: Vehicle) => void;
  deleteVehicle: (id: string) => void;

  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;

  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingId' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, bookingStatus: Booking['bookingStatus'], paymentStatus?: Booking['paymentStatus']) => void;
  deleteBooking: (id: string) => void;

  customers: Customer[];
  testimonials: Testimonial[];
  addTestimonial: (test: Testimonial) => void;
  deleteTestimonial: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  settings: CMSSettings;
  updateSettings: (newSettings: CMSSettings) => void;

  // Admin Auth
  isAdmin: boolean;
  adminEmail: string | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Preloader State
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (v: boolean) => void;

  // Helpers
  toastMessage: string | null;
  showToast: (msg: string) => void;
  openWhatsApp: (customMessage?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<string>('home');
  const [isPreloaderComplete, setIsPreloaderComplete] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefill | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Preload critical images during app startup/preloader for instant display
  useEffect(() => {
    const criticalImages = [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1280&q=75',
      'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=720&q=75',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=720&q=75',
    ];
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // High-performance image URL normalizer (delivers WebP/AVIF via Unsplash CDN at lightweight sizes)
  const optimizeImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=640&q=70';
    if (url.includes('images.unsplash.com')) {
      if (!url.includes('auto=format')) {
        return `${url}&auto=format&fit=crop&w=720&q=75`;
      }
      return url.replace(/w=\d+/, 'w=720').replace(/q=\d+/, 'q=75');
    }
    return url;
  };

  // Persistent Collections in localStorage
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('arasan_destinations');
    const list: Destination[] = saved ? JSON.parse(saved) : initialDestinations;
    return list.map((d) => ({ ...d, coverImage: optimizeImageUrl(d.coverImage) }));
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('arasan_packages');
    const list: Package[] = saved ? JSON.parse(saved) : initialPackages;
    return list.map((p) => ({
      ...p,
      coverImage: optimizeImageUrl(p.coverImage),
      galleryImages: (p.galleryImages || []).map(optimizeImageUrl),
    }));
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('arasan_vehicles');
    const list: Vehicle[] = saved ? JSON.parse(saved) : initialVehicles;
    return list.map((v) => ({ ...v, coverImage: optimizeImageUrl(v.coverImage) }));
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('arasan_enquiries');
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('arasan_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('arasan_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('arasan_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('arasan_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('arasan_blog');
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [settings, setSettings] = useState<CMSSettings>(() => {
    const saved = localStorage.getItem('arasan_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('arasan_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem('arasan_admin_email') || null;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('arasan_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('arasan_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('arasan_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('arasan_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('arasan_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('arasan_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('arasan_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('arasan_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('arasan_blog', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('arasan_settings', JSON.stringify(settings));
  }, [settings]);

  // Operations
  const openEnquiryModal = (prefill?: EnquiryPrefill) => {
    setEnquiryPrefill(prefill || null);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setEnquiryPrefill(null);
  };

  const navigateTo = (view: string, idOrSlug?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'packages' && idOrSlug) {
      const found = packages.find((p) => p.slug === idOrSlug || p.id === idOrSlug);
      if (found) {
        setSelectedPackage(found);
        setActiveView('package-detail');
        return;
      }
    }
    if (view === 'destinations' && idOrSlug) {
      const found = destinations.find((d) => d.slug === idOrSlug || d.id === idOrSlug);
      if (found) {
        setSelectedDestination(found);
        setActiveView('destination-detail');
        return;
      }
    }
    if (view === 'blog' && idOrSlug) {
      const found = blogPosts.find((b) => b.slug === idOrSlug || b.id === idOrSlug);
      if (found) {
        setSelectedBlog(found);
        setActiveView('blog-detail');
        return;
      }
    }
    setActiveView(view);
  };

  // CRUD Implementations
  const addDestination = (dest: Destination) => {
    setDestinations((prev) => [dest, ...prev]);
    showToast(`Destination "${dest.name}" added successfully.`);
  };

  const updateDestination = (dest: Destination) => {
    setDestinations((prev) => prev.map((d) => (d.id === dest.id ? dest : d)));
    showToast(`Destination "${dest.name}" updated.`);
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    showToast('Destination deleted.');
  };

  const addPackage = (pkg: Package) => {
    setPackages((prev) => [pkg, ...prev]);
    showToast(`Package "${pkg.title}" added successfully.`);
  };

  const updatePackage = (pkg: Package) => {
    setPackages((prev) => prev.map((p) => (p.id === pkg.id ? pkg : p)));
    showToast(`Package "${pkg.title}" updated.`);
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    showToast('Package deleted.');
  };

  const addVehicle = (veh: Vehicle) => {
    setVehicles((prev) => [veh, ...prev]);
    showToast(`Vehicle "${veh.name}" added.`);
  };

  const updateVehicle = (veh: Vehicle) => {
    setVehicles((prev) => prev.map((v) => (v.id === veh.id ? veh : v)));
    showToast(`Vehicle "${veh.name}" updated.`);
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast('Vehicle deleted.');
  };

  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);

    // Also update or add customer record if new
    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === enquiryData.phone || c.email === enquiryData.email);
      if (existing) {
        return prev;
      }
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: enquiryData.name,
        phone: enquiryData.phone,
        email: enquiryData.email,
        city: 'Tamil Nadu',
        tripsCount: 0,
        totalSpent: 0,
        lastBookingDate: 'Enquiry Pending',
        status: 'Active',
      };
      return [newCust, ...prev];
    });

    showToast('Enquiry submitted successfully! Our travel specialist will contact you shortly.');
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    showToast(`Enquiry status updated to ${status}.`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast('Enquiry removed.');
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingId' | 'createdAt'>) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingId: `ARASAN-${randomNum}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Update customer stats
    setCustomers((prev) => {
      return prev.map((c) => {
        if (c.phone === bookingData.phone || c.email === bookingData.email) {
          return {
            ...c,
            tripsCount: c.tripsCount + 1,
            totalSpent: c.totalSpent + bookingData.amount,
            lastBookingDate: new Date().toISOString().split('T')[0],
          };
        }
        return c;
      });
    });

    showToast(`Booking ${newBooking.bookingId} created successfully!`);
  };

  const updateBookingStatus = (
    id: string,
    bookingStatus: Booking['bookingStatus'],
    paymentStatus?: Booking['paymentStatus']
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus, ...(paymentStatus ? { paymentStatus } : {}) } : b))
    );
    showToast('Booking status updated.');
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast('Booking deleted.');
  };

  const addTestimonial = (test: Testimonial) => {
    setTestimonials((prev) => [test, ...prev]);
    showToast('Testimonial added.');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Testimonial removed.');
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [item, ...prev]);
    showToast('Gallery image added.');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('Gallery image removed.');
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
    showToast(`Blog post "${post.title}" published.`);
  };

  const updateBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => prev.map((b) => (b.id === post.id ? post : b)));
    showToast(`Blog post "${post.title}" updated.`);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
    showToast('Blog post deleted.');
  };

  const updateSettings = (newSettings: CMSSettings) => {
    setSettings(newSettings);
    showToast('Settings updated successfully.');
  };

  // Admin Auth: Accepts demo login, configured email, or user email
  const loginAdmin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    // Allow admin credentials: admin@arasanholidays.com / arasan2026, dhivandhivi57@gmail.com / arasan2026, or any valid matching pass
    if (
      (cleanEmail === 'admin@arasanholidays.com' && pass === 'arasan2026') ||
      (cleanEmail === 'dhivandhivi57@gmail.com' && (pass === 'arasan2026' || pass === 'admin123')) ||
      (cleanEmail.includes('@') && pass === 'arasan2026')
    ) {
      setIsAdmin(true);
      setAdminEmail(cleanEmail);
      localStorage.setItem('arasan_admin_auth', 'true');
      localStorage.setItem('arasan_admin_email', cleanEmail);
      showToast('Welcome to Arasan Holidays Admin Portal.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    localStorage.removeItem('arasan_admin_auth');
    localStorage.removeItem('arasan_admin_email');
    showToast('Logged out of Admin Portal.');
    setActiveView('home');
  };

  // WhatsApp Integration
  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg =
      customMessage ||
      `Hello Arasan Holidays, I would like to inquire about your travel packages and private vehicle rentals.`;
    const encoded = encodeURIComponent(defaultMsg);
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        selectedPackage,
        setSelectedPackage,
        selectedDestination,
        setSelectedDestination,
        selectedVehicle,
        setSelectedVehicle,
        selectedBlog,
        setSelectedBlog,
        isEnquiryModalOpen,
        openEnquiryModal,
        closeEnquiryModal,
        enquiryPrefill,
        destinations,
        addDestination,
        updateDestination,
        deleteDestination,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        vehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        customers,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        settings,
        updateSettings,
        isAdmin,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        toastMessage,
        showToast,
        openWhatsApp,
        isPreloaderComplete,
        setIsPreloaderComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
