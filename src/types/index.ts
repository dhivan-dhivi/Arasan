export type TripType = 'Family' | 'Couple' | 'Honeymoon' | 'Friends' | 'Group' | 'Corporate' | 'College' | 'Custom';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string; // e.g. "4 Days / 3 Nights"
  nights: number;
  days: number;
  startingPrice: number;
  discountPrice?: number;
  category: TripType | 'Hill Station' | 'Beach' | 'Heritage' | 'Adventure';
  rating: number;
  reviewsCount: number;
  featured: boolean;
  shortDescription: string;
  overview: string;
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  coverImage: string;
  galleryImages: string[];
  maxTravelers?: number;
  published: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  startingPrice: number;
  description: string;
  coverImage: string;
  featured: boolean;
  bestTimeToVisit: string;
  attractionsCount: number;
  popularFor: string[];
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'Sedan' | 'SUV' | 'Innova' | 'Innova Crysta' | 'Tempo Traveller' | 'Luxury Car';
  passengers: number;
  luggage: number;
  ac: boolean;
  pricePerDay: number;
  pricePerKm: number;
  features: string[];
  coverImage: string;
  available: boolean;
  description: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  travellers: number;
  tripType: TripType;
  budget: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Cancelled';
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  customerName: string;
  phone: string;
  email: string;
  packageTitle: string;
  destination: string;
  travelDate: string;
  travellers: number;
  vehicleAssigned?: string;
  amount: number;
  paymentStatus: 'Pending' | 'Advance Paid' | 'Completed' | 'Refunded';
  bookingStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  tripsCount: number;
  totalSpent: number;
  lastBookingDate: string;
  status: 'Active' | 'VIP' | 'Inactive';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  rating: number;
  review: string;
  avatarUrl?: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kerala' | 'Manali' | 'Kashmir' | 'Ooty' | 'Goa' | 'Customer Trips' | 'Vehicles';
  imageUrl: string;
  caption: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  shortDescription: string;
  content: string[];
  author: string;
}

export interface CMSSettings {
  companyName: string;
  tagline: string;
  secondaryTagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  officeAddress: string;
  googleMapsUrl: string;
  businessHours: string;
  stats: {
    happyTravelers: string;
    tripsOrganized: string;
    destinations: string;
    assistance: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
}
