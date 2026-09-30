import React, { useState } from 'react';
import { UnoProvider, useUnoStore } from './context/UnoContext';
import { InstagramLinktreeBanner } from './components/InstagramLinktreeBanner';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { TripCard } from './components/TripCard';
import { TripDetailModal } from './components/TripDetailModal';
import { BookingModal } from './components/BookingModal';
import { EventsPage } from './pages/EventsPage';
import { GetawaysPage } from './pages/GetawaysPage';
import { MembershipPage } from './pages/MembershipPage';
import { AdminPage } from './pages/AdminPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { Footer } from './components/Footer';
import { Zap, Flame, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, trips } = useUnoStore();
  const [filterType, setFilterType] = useState<string>('all');

  const featuredTrips = trips.filter((t) => {
    if (filterType === 'all') return true;
    if (filterType === 'stranger_trip') return t.type === 'stranger_trip';
    if (filterType === 'getaway') return t.type === 'getaway' || t.type === 'weekly_trip';
    if (filterType === 'event') return t.type === 'event';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      
      {/* Dynamic Instagram Linktree Top Notice Banner */}
      <InstagramLinktreeBanner />

      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Dynamic Page Router View */}
      <main>
        {activeTab === 'home' && (
          <div className="space-y-12 pb-mobile-nav">
            <HeroSection />

            {/* Featured Trips Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                    Trending Trips & <span className="text-red-600">Escapes</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Handpicked weekly getaways, stranger trips & party bashes
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition shrink-0 ${
                      filterType === 'all'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    All ({trips.length})
                  </button>
                  <button
                    onClick={() => setFilterType('stranger_trip')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-1 ${
                      filterType === 'stranger_trip'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${filterType === 'stranger_trip' ? 'text-white' : 'text-yellow-500'}`} />
                    Stranger Trips
                  </button>
                  <button
                    onClick={() => setFilterType('getaway')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-1 ${
                      filterType === 'getaway'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Compass className={`w-3.5 h-3.5 ${filterType === 'getaway' ? 'text-white' : 'text-blue-600'}`} />
                    Getaways
                  </button>
                  <button
                    onClick={() => setFilterType('event')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-1 ${
                      filterType === 'event'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${filterType === 'event' ? 'text-white' : 'text-red-500'}`} />
                    Events
                  </button>
                </div>
              </div>

              {/* Grid or Fresh Empty State */}
              {featuredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
                  <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
                    <Compass className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">Fresh Slate — Ready for Weekly Trips</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                      No trips published yet! Admin can log in via the Admin Portal link at the bottom of the page to add upcoming Stranger Trips, Getaways, and Events.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Why Travel With Uno Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-sm">
                <div className="space-y-3 lg:col-span-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-red-50 text-red-600 border border-red-200">
                    Why Travel With Uno?
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
                    Built for Solo Travellers, Stranger Jams & Weekend Adventurers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    We take care of everything—from comfortable AC transport and sanitized beachfront cottages to certified trip captains, campfire icebreaker games, and instant UPI QR payments.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setActiveTab('getaways')}
                    className="w-full py-3.5 rounded-2xl text-xs font-black bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Browse Getaways Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('membership')}
                    className="w-full py-3.5 rounded-2xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-red-600" />
                    <span>Join Club Pass (15% OFF)</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'events' && <EventsPage />}
        {activeTab === 'getaways' && <GetawaysPage />}
        {activeTab === 'membership' && <MembershipPage />}
        {activeTab === 'my-bookings' && <MyBookingsPage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Modals & Floating Components */}
      <TripDetailModal />
      <BookingModal />
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <UnoProvider>
      <MainContent />
    </UnoProvider>
  );
}
