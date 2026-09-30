import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import { TripCard } from '../components/TripCard';
import { Compass, Zap, Search, Users, Sun, Mountain } from 'lucide-react';

export const GetawaysPage: React.FC = () => {
  const { trips } = useUnoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getawayTrips = trips.filter(
    (t) => t.type === 'getaway' || t.type === 'stranger_trip' || t.type === 'weekly_trip'
  );

  const filteredTrips = getawayTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'stranger_trip') return matchesSearch && trip.type === 'stranger_trip';
    if (selectedCategory === 'weekly_trip') return matchesSearch && trip.type === 'weekly_trip';
    if (selectedCategory === 'getaway') return matchesSearch && trip.type === 'getaway';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen pb-mobile-nav pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-red-600 p-8 sm:p-12 text-center text-white shadow-xl">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-black uppercase tracking-wider border border-white/30">
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            Uno Getaways & Stranger Trips
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Weekend Escapes & Stranger Trips
          </h1>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
            Meet amazing new people, explore pristine beaches, hike misty mountain ridges, and recharge your soul. Solo travellers, squad groups & couples welcome!
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Getaways ({getawayTrips.length})
          </button>
          
          <button
            onClick={() => setSelectedCategory('stranger_trip')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'stranger_trip'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-yellow-500" />
            Stranger Trips
          </button>

          <button
            onClick={() => setSelectedCategory('weekly_trip')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'weekly_trip'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-blue-500" />
            Weekly Trips
          </button>

          <button
            onClick={() => setSelectedCategory('getaway')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'getaway'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-green-600" />
            Weekend Getaways
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Gokarna, Wayanad, Kasol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500 transition"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Compass className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Getaways Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or switch categories to explore other weekend getaways!
          </p>
        </div>
      )}

    </div>
  );
};
