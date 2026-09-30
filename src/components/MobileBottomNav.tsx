import React from 'react';
import { Compass, Calendar, Sparkles, ShieldCheck, Ticket } from 'lucide-react';
import { useUnoStore } from '../context/UnoContext';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useUnoStore();

  const navs = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'events', label: 'Events', icon: Calendar, highlight: true },
    { id: 'getaways', label: 'Getaways', icon: Sparkles, highlight: true },
    { id: 'membership', label: 'Club Pass', icon: ShieldCheck },
    { id: 'my-bookings', label: 'My Tickets', icon: Ticket },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {navs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-red-50 text-red-600 scale-105 border border-red-200 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-500'}`} />
                {item.highlight && !isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-extrabold mt-1 ${isActive ? 'text-red-600' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
