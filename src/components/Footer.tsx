import React from 'react';
import { UnoLogo } from './UnoLogo';
import { useUnoStore } from '../context/UnoContext';
import { Phone, Mail, MapPin, Heart, UserCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useUnoStore();

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-12 pb-20 md:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-1">
          <UnoLogo size="md" showTagline={true} />
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            UNO TOURS AND TRAVELS is India’s premier youth travel community. Pick a card and explore stranger trips, weekend getaways, and festival events designed to bring people together.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/uno_tour_travels/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 text-red-600 hover:bg-slate-200 border border-slate-200 transition"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/919344292203"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 text-green-600 hover:bg-slate-200 border border-slate-200 transition"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Quick Navigation</h4>
          <ul className="space-y-2 text-xs font-bold">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-red-600 transition">
                Explore All Trips
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('events')} className="hover:text-red-600 transition">
                Events & Music Festivals
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('getaways')} className="hover:text-red-600 transition">
                Stranger Trips & Weekly Getaways
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('membership')} className="hover:text-red-600 transition">
                Uno Explorer Club & Offers
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('my-bookings')} className="hover:text-red-600 transition">
                Check My Booking Ticket
              </button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Popular Destinations</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li className="hover:text-slate-900">Pondicherry French Quarter & Paradise Beach</li>
            <li className="hover:text-slate-900">Yelagiri Hills Cloud Forest Escapes</li>
            <li className="hover:text-slate-900">Kolli Hills 70 Hairpin Bends Trek</li>
            <li className="hover:text-slate-900">Kodaikanal Pine Forest & Lake Boating</li>
            <li className="hover:text-slate-900">ECR Beach Rave & Overnight Camping</li>
          </ul>
        </div>

        {/* Contact & Admin */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">Get in Touch</h4>
          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600 shrink-0" />
              <span>+91 93442 92203</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>uno.tours.travels@gmail.com</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition flex items-center gap-1.5 opacity-70 hover:opacity-100"
            >
              <UserCheck className="w-3.5 h-3.5 text-red-600" />
              Admin Portal
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium flex flex-wrap items-center justify-between gap-2">
        <span>© 2026 UNO TOURS AND TRAVELS. All Rights Reserved.</span>
        <span className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for adventurers.
        </span>
      </div>
    </footer>
  );
};
