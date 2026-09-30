import React, { useState } from 'react';
import { UnoLogo } from './UnoLogo';
import { useUnoStore } from '../context/UnoContext';
import { Calendar, Compass, ShieldCheck, Ticket, Menu, X, Sparkles, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, bookings } = useUnoStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'events', label: 'Events & Parties', icon: Calendar, badge: 'Popular' },
    { id: 'getaways', label: 'Getaways & Stranger Trips', icon: Sparkles, badge: 'Hot' },
    { id: 'membership', label: 'Membership & Offers', icon: ShieldCheck },
    { id: 'my-bookings', label: 'My Tickets', icon: Ticket, count: bookings.length },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo */}
          <div onClick={() => handleNavClick('home')} className="flex items-center">
            <UnoLogo size="md" showTagline={false} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                      {item.badge}
                    </span>
                  )}

                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919344292203?text=Hi%20Uno%20Tours%20and%20Travels!%20I%20want%20to%20know%20more%20about%20upcoming%20trips."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 transition flex items-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-green-600" />
              WhatsApp: 9344292203
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Menu Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition ${
                  isActive
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-100 text-red-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200">
            <a
              href="https://wa.me/919344292203?text=Hi%20Uno%20Tours%20and%20Travels!%20I%20want%20to%20know%20more%20about%20upcoming%20trips."
              target="_blank"
              rel="noreferrer"
              className="w-full block py-3 text-center rounded-xl text-xs font-bold bg-green-50 text-green-700 border border-green-200"
            >
              WhatsApp Support (9344292203)
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
