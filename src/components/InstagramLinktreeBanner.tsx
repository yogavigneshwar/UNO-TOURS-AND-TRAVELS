import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Copy, Check } from 'lucide-react';
import { useUnoStore } from '../context/UnoContext';

export const InstagramLinktreeBanner: React.FC = () => {
  const { setActiveTab } = useUnoStore();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('UNOINSTA500');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 text-white py-2 px-3 sm:px-4 text-xs font-semibold shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Welcome message */}
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white shrink-0">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </span>
          <span className="font-bold text-white flex items-center gap-1.5 flex-wrap">
            <span className="hidden sm:inline">Instagram Followers Special!</span>
            <span className="bg-black/25 text-yellow-300 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider flex items-center gap-1 border border-white/20">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              CODE: UNOINSTA500 (10% OFF)
            </span>
          </span>
          <button
            onClick={copyCode}
            className="p-1 hover:bg-white/20 rounded-md transition text-white"
            title="Copy promo code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick Action Shortcut Buttons for Mobile / Linktree Users */}
        <div className="flex items-center gap-2 text-[11px] font-bold overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveTab('getaways')}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full transition flex items-center gap-1 shrink-0 backdrop-blur-sm border border-white/20"
          >
            <Zap className="w-3 h-3 text-yellow-300" />
            Stranger Trips
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full transition flex items-center gap-1 shrink-0 backdrop-blur-sm border border-white/20"
          >
            🎟️ Party Events
          </button>

          <button
            onClick={() => setActiveTab('membership')}
            className="px-3 py-1 bg-yellow-400 text-slate-950 font-black hover:bg-yellow-300 rounded-full transition flex items-center gap-1 shrink-0 shadow-sm"
          >
            ⭐ Club Pass <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
