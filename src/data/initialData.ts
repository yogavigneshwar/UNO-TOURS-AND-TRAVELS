import type { TripItem, MembershipTier, MemberOffer, Booking, UpiConfig } from '../types';

// Fresh page - 0 initial sample trips (Admin will add trips from Admin Portal)
export const INITIAL_TRIPS: TripItem[] = [];

export const INITIAL_MEMBERSHIPS: MembershipTier[] = [
  {
    id: 'tier-silver',
    title: 'Uno Nomad Explorer',
    price: 999,
    period: 'per year',
    badge: 'Silver Pass',
    color: 'from-slate-400 to-slate-600',
    perks: [
      '10% OFF on all Stranger Trips & Getaways',
      'Priority Booking Slot (24h earlier access)',
      'Free Uno Travel T-Shirt & Welcome Kit',
      'Exclusive Members WhatsApp Community'
    ],
    discountPercent: 10
  },
  {
    id: 'tier-gold',
    title: 'Uno Wanderlust VIP',
    price: 1999,
    period: 'per year',
    badge: 'Gold VIP Pass',
    color: 'from-yellow-400 to-orange-500',
    perks: [
      '15% OFF on ALL Trips & Events year-round',
      '1 FREE Weekend Event Entry Pass',
      'Zero Cancellation Fee up to 48 hours prior',
      'Free Jeep Safari upgrades on select trips',
      'VIP Stranger Trip Leader Lounge Access'
    ],
    discountPercent: 15,
    popular: true
  },
  {
    id: 'tier-platinum',
    title: 'Uno Tribe Platinum',
    price: 3499,
    period: 'Lifetime Access',
    badge: 'Platinum Lifetime',
    color: 'from-blue-500 to-indigo-700',
    perks: [
      'FLAT 20% OFF on ALL Domestic & International Trips',
      '2 FREE Weekend Getaway Passes included',
      'Personal Travel Concierge & custom trip planning',
      'Free tent & trekking gear rentals on all treks',
      'Lifetime VIP Badge & Priority Customer Care'
    ],
    discountPercent: 20
  }
];

export const INITIAL_OFFERS: MemberOffer[] = [
  {
    id: 'offer-01',
    title: 'Instagram Followers Special',
    code: 'UNOINSTA500',
    discountPercent: 10,
    validTill: 'Ongoing Offer',
    description: 'Exclusive 10% instant discount for Instagram followers (@uno_tour_travels).',
    appliesTo: 'All Trips & Events'
  }
];

export const INITIAL_UPI_CONFIG: UpiConfig = {
  upiId: 'barathsandy29-2@oksbi',
  merchantName: 'Barath Raj D.P',
  qrImageUrl: '/payment-qr.jpg',
  note: 'Scan using any UPI App (GPay, PhonePe, Paytm, BHIM) to confirm your UNO Pass booking.'
};

// Fresh page - 0 initial sample bookings
export const INITIAL_BOOKINGS: Booking[] = [];
