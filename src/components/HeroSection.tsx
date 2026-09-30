import React from 'react';
import { useUnoStore } from '../context/UnoContext';
import { Sparkles, Calendar, Zap, ShieldCheck, ArrowRight, Users, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useUnoStore();

  return (
    <div className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Soft Background Glow Blobs for Light Theme */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-red-100/60 via-yellow-100/60 to-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Slogan Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-black text-slate-800 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="tracking-[0.2em] uppercase text-red-600 font-black">
            PICK A CARD. EXPLORE THE WORLD.
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
          Unforgettable <span className="text-red-600">Stranger Trips</span> & Unlimited <span className="text-blue-600">Getaways</span>
        </h1>

        {/* Hero Tagline */}
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Connect with vibrant new friends, explore untouched beaches, trek misty mountains & dance at weekend music events. Safe, verified & 100% solo traveller friendly!
        </p>

        {/* Uno Card Badges Showcase */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          <div className="px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <span>🔄 REVERSE ROUTINE</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-yellow-50 text-yellow-800 border border-yellow-300 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <span>🚫 SKIP ORDINARY</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <span>➕4 SQUAD OFFERS</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-green-50 text-green-700 border border-green-200 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <span>🌲 +10 TREK PASS</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <span>🌈 WILD GETAWAYS</span>
          </div>
        </div>

        {/* Quick CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              setActiveTab('getaways');
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-red-600 hover:bg-red-700 text-white transition shadow-lg shadow-red-600/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            Explore Stranger Trips & Getaways
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveTab('events');
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            🎟️ View Festival Events
          </button>
        </div>

        {/* Value Proposition Cards */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-1 shadow-sm">
            <Users className="w-5 h-5 text-red-600" />
            <span className="text-xs font-black text-slate-900 block">Stranger Friendly</span>
            <span className="text-[11px] text-slate-500">80% travellers join solo!</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-1 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-xs font-black text-slate-900 block">100% Verified Safe</span>
            <span className="text-[11px] text-slate-500">Certified trip captains</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-1 shadow-sm">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-black text-slate-900 block">Weekly Departures</span>
            <span className="text-[11px] text-slate-500">Guaranteed Friday departures</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-1 shadow-sm">
            <Award className="w-5 h-5 text-yellow-600" />
            <span className="text-xs font-black text-slate-900 block">Meta QR Booking</span>
            <span className="text-[11px] text-slate-500">Instant UPI slot confirmation</span>
          </div>
        </div>

      </div>
    </div>
  );
};
