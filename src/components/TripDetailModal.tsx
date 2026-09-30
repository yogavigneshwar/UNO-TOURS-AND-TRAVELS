import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import { X, MapPin, Calendar, Clock, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

export const TripDetailModal: React.FC = () => {
  const { selectedTrip, setSelectedTrip, setBookingTrip } = useUnoStore();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions'>('itinerary');

  if (!selectedTrip) return null;

  const slotsRemaining = Math.max(0, selectedTrip.slotsTotal - selectedTrip.slotsBooked);
  const isSoldOut = slotsRemaining === 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header Bar / Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={selectedTrip.image}
            alt={selectedTrip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => setSelectedTrip(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-950 border border-white/20 backdrop-blur-md transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Metadata Overlay */}
          <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white/90 text-slate-900 backdrop-blur-md uppercase tracking-wider inline-block">
              {selectedTrip.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {selectedTrip.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-yellow-400" />
                {selectedTrip.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-400" />
                {selectedTrip.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-green-400" />
                {selectedTrip.date}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation inside Modal */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 pt-3 space-x-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 text-sm font-black border-b-2 transition ${
              activeTab === 'itinerary'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Itinerary Schedule
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 text-sm font-black border-b-2 transition ${
              activeTab === 'inclusions'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Inclusions & Highlights
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          
          {/* Trip Description */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {selectedTrip.description}
            </p>
          </div>

          {/* Tab 1: Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-red-600 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                Day-by-Day Schedule
              </h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                {selectedTrip.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-8 space-y-1">
                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-xs"></div>
                    <span className="text-xs font-black text-red-600 uppercase tracking-wider block">
                      {item.day}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Inclusions & Highlights */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-red-600 uppercase tracking-wider">
                  ✨ Trip Highlights
                </h4>
                <div className="space-y-2">
                  {selectedTrip.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
                      <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-black text-green-700 uppercase tracking-wider mb-2">
                    ✅ What’s Included
                  </h4>
                  <div className="space-y-2">
                    {selectedTrip.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-rose-700 uppercase tracking-wider mb-2">
                    ❌ What’s Excluded
                  </h4>
                  <div className="space-y-2">
                    {selectedTrip.exclusions.map((exc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block font-semibold">Total Price per slot</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                ₹{selectedTrip.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{selectedTrip.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold ${isSoldOut ? 'text-rose-600' : 'text-green-600'}`}>
              {isSoldOut ? 'Sold Out' : `${slotsRemaining} Slots Remaining`}
            </span>

            <button
              onClick={() => {
                const currentTrip = selectedTrip;
                setSelectedTrip(null);
                setBookingTrip(currentTrip);
              }}
              disabled={isSoldOut}
              className={`px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 transition shadow-lg ${
                isSoldOut
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
              }`}
            >
              <span>Get UNO Pass Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
