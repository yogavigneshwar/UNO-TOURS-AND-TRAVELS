import React from 'react';
import type { TripItem } from '../types';
import { useUnoStore } from '../context/UnoContext';
import { MapPin, Calendar, Clock, Users, ArrowRight, Zap, Flame } from 'lucide-react';

interface TripCardProps {
  trip: TripItem;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const { setSelectedTrip, setBookingTrip } = useUnoStore();

  const slotsRemaining = Math.max(0, trip.slotsTotal - trip.slotsBooked);
  const isUrgent = slotsRemaining <= 5 && slotsRemaining > 0;
  const isSoldOut = slotsRemaining === 0;

  const discountPercent = Math.round(
    ((trip.originalPrice - trip.price) / trip.originalPrice) * 100
  );

  return (
    <div className="group relative rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10">
      
      {/* Top Image Section */}
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-white/90 text-slate-900 backdrop-blur-md flex items-center gap-1 shadow-md border border-slate-200">
            {trip.type === 'stranger_trip' && <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />}
            {trip.type === 'event' && <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />}
            {trip.category}
          </span>

          {discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Location & Duration Floating Pills */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
            <span className="truncate max-w-[140px]">{trip.location}</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/20">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{trip.duration}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1">
            <Calendar className="w-3.5 h-3.5 text-red-600" />
            <span>{trip.date}</span>
          </div>

          <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
            {trip.title}
          </h3>

          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-medium">
            {trip.subtitle}
          </p>
        </div>

        {/* Slot Meter */}
        <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              Slot Availability
            </span>
            <span className={isSoldOut ? 'text-rose-600' : isUrgent ? 'text-amber-600 font-extrabold animate-pulse' : 'text-green-600'}>
              {isSoldOut ? 'Sold Out' : `${slotsRemaining} slots remaining!`}
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isSoldOut
                  ? 'bg-rose-500'
                  : isUrgent
                  ? 'bg-amber-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, (trip.slotsBooked / trip.slotsTotal) * 100)}%` }}
            />
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">
                ₹{trip.price.toLocaleString('en-IN')}
              </span>
              {trip.originalPrice > trip.price && (
                <span className="text-xs font-semibold text-slate-400 line-through">
                  ₹{trip.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTrip(trip)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              Details
            </button>

            <button
              onClick={() => setBookingTrip(trip)}
              disabled={isSoldOut}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1 transition shadow-md ${
                isSoldOut
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
              }`}
            >
              <span>{isSoldOut ? 'Sold Out' : 'Book'}</span>
              {!isSoldOut && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
