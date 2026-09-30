import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import { Check, Sparkles, Copy, Zap, Star, Gift, ArrowRight } from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const { memberships, offers, setActiveTab } = useUnoStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen pb-mobile-nav pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-500 via-red-600 to-blue-600 p-8 sm:p-12 text-center text-white shadow-xl">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-black uppercase tracking-wider border border-white/30">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            Uno Explorer Club & Member Offers
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Unlock Exclusive Perks & Member Offers
          </h1>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
            Join the Uno Travel Club to save up to 20% on every single trip, get free festival event passes, zero cancellation charges, and VIP lounge perks.
          </p>
        </div>
      </div>

      {/* Section 1: Active Promo Offers & Coupons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-red-600" />
              Active Promo Coupons & Offers
            </h2>
            <p className="text-xs text-slate-500">
              Copy promo codes below and apply them directly at payment checkout!
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            {offers.length} Offers Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative p-5 rounded-2xl bg-white border border-dashed border-red-300 flex flex-col justify-between space-y-4 hover:border-red-500 shadow-xs transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-200">
                    {offer.appliesTo}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{offer.validTill}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900">{offer.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{offer.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-sm font-black text-red-600 tracking-wider">
                  {offer.code}
                </div>

                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-sm"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Membership Tier Cards */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Choose Your <span className="text-red-600">Membership Pass</span>
          </h2>
          <p className="text-xs text-slate-500">
            Select a tier to enjoy instant discounts, priority slots, and free gear rentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberships.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-6 bg-white border flex flex-col justify-between space-y-6 transition-all duration-300 ${
                tier.popular
                  ? 'border-red-500 shadow-xl scale-105 ring-2 ring-red-500/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase bg-red-600 text-white shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-gradient-to-r ${tier.color} text-white inline-block shadow-xs`}>
                    {tier.badge}
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{tier.title}</h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{tier.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">/ {tier.period}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs font-bold text-green-700 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600 shrink-0" />
                  Save {tier.discountPercent}% on every trip automatically!
                </div>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Membership Benefits:
                  </span>
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('getaways')}
                className={`w-full py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition ${
                  tier.popular
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <span>Get {tier.badge}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
