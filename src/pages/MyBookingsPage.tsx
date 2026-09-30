import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import { UnoPassTicket } from '../components/UnoPassTicket';
import { Ticket, Search } from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings } = useUnoStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      b.id.toLowerCase().includes(q) ||
      b.customerContact.phone.includes(q) ||
      b.customerContact.email.toLowerCase().includes(q) ||
      b.members.some((m) => m.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen pb-mobile-nav pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-red-50 text-red-600 border border-red-200">
          <Ticket className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">GET UNO PASS & Ticket Lookup</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
          Enter your Pass ID (e.g. UNO-BK-9281) or registered phone number to view your official scannable UNO Pass.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by Pass ID or Phone Number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white text-slate-900 pl-10 pr-4 py-3 rounded-2xl text-xs border border-slate-200 focus:outline-none focus:border-red-500 shadow-md"
        />
      </div>

      {/* Tickets List */}
      <div className="space-y-8">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <UnoPassTicket key={b.id} booking={b} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs space-y-2 shadow-xs">
            <Ticket className="w-10 h-10 text-slate-400 mx-auto" />
            <p>No UNO Pass found. Try searching with your registered phone number or Pass ID.</p>
          </div>
        )}
      </div>

    </div>
  );
};
