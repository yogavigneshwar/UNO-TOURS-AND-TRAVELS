import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import { TripCard } from '../components/TripCard';
import { Calendar, Flame, Music, Sparkles, Search } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { trips } = useUnoStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const eventTrips = trips.filter(
    (t) => t.type === 'event' || t.category.toLowerCase().includes('event') || t.category.toLowerCase().includes('festival')
  );

  const filteredEvents = eventTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === 'all') return matchesSearch;
    return matchesSearch && trip.category.toLowerCase().includes(selectedTag.toLowerCase());
  });

  return (
    <div className="min-h-screen pb-mobile-nav pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 p-8 sm:p-12 text-center text-white shadow-xl">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-black uppercase tracking-wider border border-white/30">
            <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            Uno Special Events & Parties
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Upcoming Music Festivals & Party Bashes
          </h1>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
            Live DJ line-ups, camping under open skies, neon glow parties, and acoustic jam circles. Book your slots before tickets sell out!
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition shrink-0 ${
              selectedTag === 'all'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Events ({eventTrips.length})
          </button>
          <button
            onClick={() => setSelectedTag('festival')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 ${
              selectedTag === 'festival'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-blue-600" />
            Music Festivals
          </button>
          <button
            onClick={() => setSelectedTag('camping')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 ${
              selectedTag === 'camping'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            Beach Camping
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500 transition"
          />
        </div>
      </div>

      {/* Events List Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Events Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or check back soon for newly published weekend event line-ups!
          </p>
        </div>
      )}

    </div>
  );
};
