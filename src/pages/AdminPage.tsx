import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import type { TripItem } from '../types';
import {
  UserCheck,
  Plus,
  Trash2,
  Edit,
  QrCode,
  Users,
  Search,
  CheckCircle,
  XCircle,
  Sparkles,
  Gift,
  Download,
  Lock,
  Save
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    offers,
    addOffer,
    deleteOffer,
    upiConfig,
    updateUpiConfig,
    bookings,
    updateBookingStatus,
    deleteBooking,
    resetToDefault
  } = useUnoStore();

  // Security Lock
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Sub-tab
  const [adminSubTab, setAdminSubTab] = useState<'trips' | 'bookings' | 'offers' | 'upi'>('bookings');

  // Search filter
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');

  // Form State for Adding / Editing Trip
  const [showTripModal, setShowTripModal] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [tripForm, setTripForm] = useState<Partial<TripItem>>({
    title: '',
    subtitle: '',
    type: 'getaway',
    category: 'Weekend Getaway',
    price: 2499,
    originalPrice: 3499,
    duration: '2 Days / 1 Night',
    location: 'Pondicherry (Departs Chennai)',
    date: 'Upcoming Weekend',
    datesAvailable: ['Oct 10 - Oct 11', 'Oct 17 - Oct 18'],
    slotsTotal: 25,
    slotsBooked: 0,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: '',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Beach Walk', details: 'Check-in and evening sunset walk.' },
      { day: 'Day 2', title: 'Trek & Return', details: 'Morning trek and departure.' }
    ],
    inclusions: ['Transport from Chennai', 'Homestay Stay', 'Breakfast'],
    exclusions: ['Personal Expenses'],
    highlights: ['Sunset Beach Walk', 'Stranger Jam']
  });

  // Form State for Offer
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerForm, setOfferForm] = useState({
    title: '',
    code: '',
    discountPercent: 10,
    validTill: 'Valid for this month',
    description: '',
    appliesTo: 'All Trips'
  });

  // Form State for UPI Config
  const [upiForm, setUpiForm] = useState({
    upiId: upiConfig.upiId,
    merchantName: upiConfig.merchantName,
    qrImageUrl: upiConfig.qrImageUrl || ''
  });

  // Login Authentication handle
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim().toLowerCase() === 'barathyoga' && passwordInput === 'shrikani2003') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password.');
    }
  };

  // Open Edit Modal for Trip
  const handleEditTrip = (trip: TripItem) => {
    setEditingTripId(trip.id);
    setTripForm(trip);
    setShowTripModal(true);
  };

  // Save Trip (Create or Update)
  const handleSaveTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripForm.title || !tripForm.price) return;

    if (editingTripId) {
      updateTrip(editingTripId, tripForm);
    } else {
      addTrip(tripForm as Omit<TripItem, 'id'>);
    }

    setShowTripModal(false);
    setEditingTripId(null);
  };

  // Save Offer
  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerForm.title || !offerForm.code) return;
    addOffer(offerForm);
    setShowOfferModal(false);
    setOfferForm({
      title: '',
      code: '',
      discountPercent: 10,
      validTill: 'Valid for this month',
      description: '',
      appliesTo: 'All Trips'
    });
  };

  // Save UPI Config
  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    updateUpiConfig(upiForm);
    alert('✅ UPI QR Payment details updated successfully!');
  };

  // Export Bookings to JSON download
  const handleExportBookings = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `uno_bookings_manifest_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.tripTitle.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.utrNumber.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.members.some((m) => m.name.toLowerCase().includes(bookingSearch.toLowerCase()));

    if (bookingStatusFilter === 'all') return matchesSearch;
    return matchesSearch && b.status === bookingStatusFilter;
  });

  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Uno Admin Portal</h2>
            <p className="text-xs text-slate-500 font-medium">
              Sign in with your admin credentials to manage trips, QR codes, offers and bookings.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 text-slate-900 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 text-slate-900 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            {loginError && <p className="text-xs font-bold text-red-600 text-center">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white shadow-md transition"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-mobile-nav pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-50 text-red-600 border border-red-200">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              Admin Control Center
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                Live Status
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Manage Chennai Departures, Stranger Trips, Getaways, Events, Offers & UPI Payments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Lock Admin
          </button>
          <button
            onClick={resetToDefault}
            className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition"
            title="Reset storage data to defaults"
          >
            Reset Data
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Confirmed Revenue</span>
          <span className="text-2xl font-black text-green-600">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Total Active Bookings</span>
          <span className="text-2xl font-black text-slate-900">{bookings.length}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Pending Approvals</span>
          <span className="text-2xl font-black text-red-600 animate-pulse">{pendingBookingsCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Published Trips</span>
          <span className="text-2xl font-black text-blue-600">{trips.length}</span>
        </div>
      </div>

      {/* Admin Sub-tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setAdminSubTab('bookings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
            adminSubTab === 'bookings'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Bookings & Manifests</span>
          {pendingBookingsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-white text-red-600 text-[10px] font-black">
              {pendingBookingsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminSubTab('trips')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
            adminSubTab === 'trips'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Manage Trips & Getaways</span>
        </button>

        <button
          onClick={() => setAdminSubTab('offers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
            adminSubTab === 'offers'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Offers & Coupons</span>
        </button>

        <button
          onClick={() => setAdminSubTab('upi')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
            adminSubTab === 'upi'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>UPI QR Settings</span>
        </button>
      </div>

      {/* TAB 1: Bookings & Passenger Manifests */}
      {adminSubTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search passenger, UTR, booking ID..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={bookingStatusFilter}
                onChange={(e) => setBookingStatusFilter(e.target.value)}
                className="bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending Payment Approval</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={handleExportBookings}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Export JSON
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm hover:border-slate-300 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-red-600">{b.id}</span>
                        <span className="text-xs text-slate-500">| Booked on {b.bookingDate}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">{b.tripTitle}</h3>
                      <span className="text-xs text-blue-600 font-bold">📅 Trip Slot: {b.tripDate}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                          b.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : b.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200 animate-pulse'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {b.status}
                      </span>

                      <div className="flex items-center gap-1">
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                            className="px-3 py-1.5 rounded-xl text-xs font-black bg-green-600 hover:bg-green-700 text-white transition flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Approve
                          </button>
                        )}
                        {b.status !== 'Rejected' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Rejected')}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 bg-slate-100 transition"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Passenger manifest grid */}
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                      Passenger Manifest ({b.members.length} Members)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {b.members.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <div className="font-bold text-slate-900 flex justify-between">
                            <span>{idx + 1}. {m.name}</span>
                            <span className="text-red-600">{m.age} yrs</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            <span>City: {m.city}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment UTR info */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
                    <div>
                      <span>UTR/Ref No: </span>
                      <strong className="font-mono text-red-600">{b.utrNumber}</strong>
                      {b.couponCode && (
                        <span className="ml-3 text-green-600 font-semibold">
                          Coupon: {b.couponCode} (-₹{b.discountApplied})
                        </span>
                      )}
                    </div>
                    <div>
                      <span>Total Amount: </span>
                      <strong className="text-green-600 text-sm font-black">
                        ₹{b.totalAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
                No bookings found matching search query.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Manage Trips & Getaways */}
      {adminSubTab === 'trips' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Trips & Getaways Catalog</h2>
              <p className="text-xs text-slate-500">Add, edit or update Weekly Trips, Stranger Trips and Events</p>
            </div>
            <button
              onClick={() => {
                setEditingTripId(null);
                setTripForm({
                  title: '',
                  subtitle: '',
                  type: 'getaway',
                  category: 'Weekend Getaway',
                  price: 2499,
                  originalPrice: 3499,
                  duration: '2 Days / 1 Night',
                  location: 'Pondicherry (Departs Chennai)',
                  date: 'Upcoming Weekend',
                  datesAvailable: ['Oct 10 - Oct 11', 'Oct 17 - Oct 18'],
                  slotsTotal: 25,
                  slotsBooked: 0,
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                  description: 'Awesome trip description...',
                  itinerary: [
                    { day: 'Day 1', title: 'Arrival', details: 'Check-in and evening walk.' }
                  ],
                  inclusions: ['Transport from Chennai', 'Stay'],
                  exclusions: ['Personal expenses'],
                  highlights: ['Sunset view']
                });
                setShowTripModal(true);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Trip
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-red-50 text-red-600 font-extrabold">
                      {trip.category}
                    </span>
                    <span className="text-slate-500 font-semibold">{trip.duration}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">{trip.title}</h3>
                  <div className="text-xs text-red-600 font-black">
                    ₹{trip.price.toLocaleString('en-IN')}{' '}
                    <span className="text-slate-400 line-through text-[10px] font-normal">
                      ₹{trip.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">
                    Slots: {trip.slotsBooked}/{trip.slotsTotal}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditTrip(trip)}
                      className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Manage Offers */}
      {adminSubTab === 'offers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Promotional Offers & Coupons</h2>
              <p className="text-xs text-slate-500">Add discount codes for Instagram & Membership users</p>
            </div>
            <button
              onClick={() => setShowOfferModal(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Promo Offer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-black text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200">
                      {offer.code}
                    </span>
                    <span className="text-xs font-bold text-green-600">{offer.discountPercent}% OFF</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{offer.title}</h3>
                  <p className="text-xs text-slate-600">{offer.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{offer.validTill}</span>
                  <button
                    onClick={() => deleteOffer(offer.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Manage UPI QR Code */}
      {adminSubTab === 'upi' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-red-600" />
              Configure Admin UPI Payment QR
            </h2>
            <p className="text-xs text-slate-500">
              Update your UPI ID (VPA) and QR code displayed on the Meta-style booking checkout.
            </p>
          </div>

          <form onSubmit={handleSaveUpi} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 block mb-1">
                Admin UPI ID / VPA *
              </label>
              <input
                type="text"
                placeholder="e.g. unotours@upi"
                value={upiForm.upiId}
                onChange={(e) => setUpiForm({ ...upiForm, upiId: e.target.value })}
                className="w-full bg-slate-50 text-red-600 font-mono font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 block mb-1">
                Merchant / Account Name *
              </label>
              <input
                type="text"
                placeholder="e.g. UNO TOURS AND TRAVELS"
                value={upiForm.merchantName}
                onChange={(e) => setUpiForm({ ...upiForm, merchantName: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase text-slate-700 block mb-1">
                Custom QR Code Image Link (Optional)
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={upiForm.qrImageUrl}
                onChange={(e) => setUpiForm({ ...upiForm, qrImageUrl: e.target.value })}
                className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Payment Settings
            </button>
          </form>
        </div>
      )}

      {/* Modal for Adding/Editing Trip */}
      {showTripModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {editingTripId ? 'Edit Trip Details' : 'Add New Trip / Event'}
              </h3>
              <button onClick={() => setShowTripModal(false)} className="text-slate-400 hover:text-slate-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrip} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Trip Title *</label>
                  <input
                    type="text"
                    required
                    value={tripForm.title}
                    onChange={(e) => setTripForm({ ...tripForm, title: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Trip Category / Type *</label>
                  <select
                    value={tripForm.type}
                    onChange={(e) => setTripForm({ ...tripForm, type: e.target.value as any })}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="getaway">Weekend Getaway</option>
                    <option value="stranger_trip">Stranger Trip</option>
                    <option value="weekly_trip">Weekly Trip</option>
                    <option value="event">Festival Event</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={tripForm.price}
                    onChange={(e) => setTripForm({ ...tripForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 text-red-600 font-black px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={tripForm.originalPrice}
                    onChange={(e) => setTripForm({ ...tripForm, originalPrice: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 text-slate-700 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration (e.g. 2 Days / 1 Night)</label>
                  <input
                    type="text"
                    value={tripForm.duration}
                    onChange={(e) => setTripForm({ ...tripForm, duration: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={tripForm.location}
                    onChange={(e) => setTripForm({ ...tripForm, location: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Available Dates (Comma-Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Oct 18 - Oct 19, Oct 24 - Oct 25"
                  value={tripForm.datesAvailable ? tripForm.datesAvailable.join(', ') : ''}
                  onChange={(e) => {
                    const rawStr = e.target.value;
                    const dateArr = rawStr.split(',').map((s) => s.trim()).filter(Boolean);
                    setTripForm({ ...tripForm, datesAvailable: dateArr, date: dateArr[0] || 'Customizable Private Trip Date' });
                  }}
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                />
                <p className="text-[10px] text-slate-500 mt-1 font-medium">
                  💡 <strong>Events & Stranger Trips:</strong> Enter fixed departure dates. <strong>Family & Private Trips:</strong> Leave blank or enter flexible dates so customers can pick their custom travel date!
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={tripForm.image}
                  onChange={(e) => setTripForm({ ...tripForm, image: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Short Tagline</label>
                <input
                  type="text"
                  value={tripForm.subtitle}
                  onChange={(e) => setTripForm({ ...tripForm, subtitle: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={tripForm.description}
                  onChange={(e) => setTripForm({ ...tripForm, description: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTripModal(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-black bg-red-600 text-white hover:bg-red-700"
                >
                  Save Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Adding Offer */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">Add Promo Coupon Offer</h3>
              <button onClick={() => setShowOfferModal(false)} className="text-slate-400 hover:text-slate-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Linktree Instagram Special"
                  value={offerForm.title}
                  onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Promo Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UNOINSTA500"
                  value={offerForm.code}
                  onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-50 text-red-600 font-mono font-bold px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discount Percentage (%) *</label>
                <input
                  type="number"
                  required
                  value={offerForm.discountPercent}
                  onChange={(e) => setOfferForm({ ...offerForm, discountPercent: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Discount details..."
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-black bg-red-600 text-white hover:bg-red-700"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
