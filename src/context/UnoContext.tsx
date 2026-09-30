import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TripItem, MembershipTier, MemberOffer, Booking, UpiConfig, PaymentStatus } from '../types';
import { INITIAL_TRIPS, INITIAL_MEMBERSHIPS, INITIAL_OFFERS, INITIAL_UPI_CONFIG, INITIAL_BOOKINGS } from '../data/initialData';

interface UnoContextType {
  trips: TripItem[];
  memberships: MembershipTier[];
  offers: MemberOffer[];
  bookings: Booking[];
  upiConfig: UpiConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTrip: TripItem | null;
  setSelectedTrip: (trip: TripItem | null) => void;
  bookingTrip: TripItem | null;
  setBookingTrip: (trip: TripItem | null) => void;
  
  // Actions
  addTrip: (trip: Omit<TripItem, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<TripItem>) => void;
  deleteTrip: (id: string) => void;
  
  addOffer: (offer: Omit<MemberOffer, 'id'>) => void;
  deleteOffer: (id: string) => void;
  
  updateUpiConfig: (config: Partial<UpiConfig>) => void;
  
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => Booking;
  updateBookingStatus: (bookingId: string, status: PaymentStatus) => void;
  deleteBooking: (bookingId: string) => void;
  
  resetToDefault: () => void;
}

const UnoContext = createContext<UnoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TRIPS: 'uno_trips_v4',
  MEMBERSHIPS: 'uno_memberships_v4',
  OFFERS: 'uno_offers_v4',
  BOOKINGS: 'uno_bookings_v4',
  UPI: 'uno_upi_v4',
};

export const UnoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<TripItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRIPS);
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [memberships] = useState<MembershipTier[]>(INITIAL_MEMBERSHIPS);

  const [offers, setOffers] = useState<MemberOffer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [upiConfig, setUpiConfig] = useState<UpiConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.UPI);
    return saved ? JSON.parse(saved) : INITIAL_UPI_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTrip, setSelectedTrip] = useState<TripItem | null>(null);
  const [bookingTrip, setBookingTrip] = useState<TripItem | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UPI, JSON.stringify(upiConfig));
  }, [upiConfig]);

  // Actions
  const addTrip = (newTripData: Omit<TripItem, 'id'>) => {
    const newTrip: TripItem = {
      ...newTripData,
      id: `uno-trip-${Date.now().toString(36)}`
    };
    setTrips(prev => [newTrip, ...prev]);
  };

  const updateTrip = (id: string, updatedFields: Partial<TripItem>) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  const addOffer = (newOfferData: Omit<MemberOffer, 'id'>) => {
    const newOffer: MemberOffer = {
      ...newOfferData,
      id: `uno-offer-${Date.now().toString(36)}`
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const updateUpiConfig = (config: Partial<UpiConfig>) => {
    setUpiConfig(prev => ({ ...prev, ...config }));
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>): Booking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `UNO-BK-${randomNum}`,
      status: 'Pending',
      bookingDate: new Date().toISOString().split('T')[0]
    };
    
    // Update trip slots count
    setTrips(prev => prev.map(t => {
      if (t.id === bookingData.tripId) {
        return {
          ...t,
          slotsBooked: Math.min(t.slotsTotal, t.slotsBooked + bookingData.members.length)
        };
      }
      return t;
    }));

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: PaymentStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const resetToDefault = () => {
    setTrips(INITIAL_TRIPS);
    setOffers(INITIAL_OFFERS);
    setBookings(INITIAL_BOOKINGS);
    setUpiConfig(INITIAL_UPI_CONFIG);
    localStorage.clear();
  };

  return (
    <UnoContext.Provider
      value={{
        trips,
        memberships,
        offers,
        bookings,
        upiConfig,
        activeTab,
        setActiveTab,
        selectedTrip,
        setSelectedTrip,
        bookingTrip,
        setBookingTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        addOffer,
        deleteOffer,
        updateUpiConfig,
        createBooking,
        updateBookingStatus,
        deleteBooking,
        resetToDefault
      }}
    >
      {children}
    </UnoContext.Provider>
  );
};

export const useUnoStore = () => {
  const context = useContext(UnoContext);
  if (!context) {
    throw new Error('useUnoStore must be used within a UnoProvider');
  }
  return context;
};
