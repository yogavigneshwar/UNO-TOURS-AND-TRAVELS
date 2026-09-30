export type TripType = 'event' | 'getaway' | 'stranger_trip' | 'weekly_trip';

export interface ItineraryItem {
  day: string;
  title: string;
  details: string;
}

export interface TripItem {
  id: string;
  title: string;
  subtitle: string;
  type: TripType;
  category: string; // e.g. "Weekend Getaway", "Stranger Trip", "Music Festival", "Adventure Trek"
  price: number;
  originalPrice: number;
  duration: string; // e.g. "2 Days / 1 Night"
  location: string; // Destination location
  date: string;
  datesAvailable: string[];
  slotsTotal: number;
  slotsBooked: number;
  image: string;
  description: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface MembershipTier {
  id: string;
  title: string;
  price: number;
  period: string; // e.g. "per year", "per 6 months"
  badge: string;
  color: string;
  perks: string[];
  discountPercent: number;
  popular?: boolean;
}

export interface MemberOffer {
  id: string;
  title: string;
  code: string;
  discountPercent: number;
  validTill: string;
  description: string;
  appliesTo: string;
}

export interface Passenger {
  name: string;
  age: number;
  city: string;
}

export type PaymentStatus = 'Pending' | 'Confirmed' | 'Rejected';

export interface Booking {
  id: string;
  tripId: string;
  tripTitle: string;
  tripDate: string;
  tripImage: string;
  members: Passenger[];
  perPersonPrice: number;
  totalAmount: number;
  discountApplied: number;
  couponCode?: string;
  paymentMethod: 'UPI_QR';
  utrNumber: string;
  screenshotUrl?: string;
  status: PaymentStatus;
  bookingDate: string;
  customerContact: {
    phone: string;
    email: string;
  };
}

export interface UpiConfig {
  upiId: string;
  merchantName: string;
  qrImageUrl?: string;
  note: string;
}
