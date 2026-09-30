import React, { useState } from 'react';
import type { Booking } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import {
  Calendar,
  Users,
  Printer,
  Share2,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

interface DistrictTicketProps {
  booking: Booking;
  onClose?: () => void;
}

export const DistrictTicket: React.FC<DistrictTicketProps> = ({ booking }) => {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Hi! Here is my official Uno Tours Boarding Pass ticket.\n\nBooking ID: ${booking.id}\nTrip: ${booking.tripTitle}\nDate: ${booking.tripDate}\nMembers: ${booking.members.length}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 animate-fadeIn">
      
      {/* Outer Ticket Container with District-App Card Perforations */}
      <div className="relative rounded-3xl bg-white border border-slate-300 shadow-2xl overflow-hidden font-sans">
        
        {/* Top Header Ticket Banner */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
          <img
            src={booking.tripImage}
            alt={booking.tripTitle}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

          {/* Top Status & District App Badge */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-slate-900 backdrop-blur-md text-[10px] font-black uppercase tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Uno Digital Boarding Pass
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                booking.status === 'Confirmed'
                  ? 'bg-green-600 text-white'
                  : booking.status === 'Pending'
                  ? 'bg-yellow-500 text-slate-950 animate-pulse'
                  : 'bg-red-600 text-white'
              }`}
            >
              {booking.status === 'Confirmed' ? '✓ VALID ENTRY' : booking.status}
            </span>
          </div>

          {/* Trip Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
            <h2 className="text-xl font-black leading-snug drop-shadow-md line-clamp-1">
              {booking.tripTitle}
            </h2>
            <div className="flex items-center gap-3 text-xs text-yellow-300 font-bold">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                {booking.tripDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                {booking.members.length} Member{booking.members.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Barcode & Scannable QR Section (District App Style) */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase text-red-500 tracking-widest block">
              GATE ENTRY BARCODE & QR
            </span>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-2xl font-black tracking-wider text-white font-mono">{booking.id}</span>
              <button
                type="button"
                onClick={handleCopyBookingId}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy Booking ID"
              >
                {copiedId ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Show this barcode to your Uno Trip Captain at bus departure or venue gate.
            </p>

            {/* Stylized Barcode Graphic */}
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-1 opacity-80">
              <div className="h-8 w-1 bg-white"></div>
              <div className="h-8 w-2 bg-white"></div>
              <div className="h-8 w-0.5 bg-white"></div>
              <div className="h-8 w-3 bg-white"></div>
              <div className="h-8 w-1 bg-white"></div>
              <div className="h-8 w-0.5 bg-white"></div>
              <div className="h-8 w-2 bg-white"></div>
              <div className="h-8 w-1.5 bg-white"></div>
              <div className="h-8 w-3 bg-white"></div>
              <div className="h-8 w-0.5 bg-white"></div>
              <div className="h-8 w-2 bg-white"></div>
              <div className="h-8 w-1 bg-white"></div>
              <div className="h-8 w-3 bg-white"></div>
            </div>
          </div>

          {/* QR Code Graphic */}
          <div className="bg-white p-3 rounded-2xl shadow-xl shrink-0 border-2 border-red-500">
            <QRCodeSVG
              value={`UNO_PASS:${booking.id}:${booking.utrNumber}`}
              size={110}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>

        {/* Perforated Stub Cutout Line (District Style Side Notches) */}
        <div className="relative my-0 bg-slate-100 py-3 px-6 flex items-center justify-between border-y border-slate-200">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 border border-slate-300 shadow-inner"></div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 border border-slate-300 shadow-inner"></div>
          <div className="w-full border-t-2 border-dashed border-slate-300"></div>
        </div>

        {/* Ticket Body Content */}
        <div className="p-6 space-y-6 bg-white">
          
          {/* Passenger Manifest Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-red-600" />
                Passenger Manifest ({booking.members.length})
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Contact: {booking.customerContact.phone}
              </span>
            </div>

            <div className="space-y-2">
              {booking.members.map((member, index) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{member.name}</h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Age: {member.age} yrs • City: {member.city}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & UTR Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">UPI UTR Ref Number</span>
              <span className="font-mono font-black text-red-600 text-sm">{booking.utrNumber}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total Amount Paid</span>
              <span className="font-black text-green-600 text-base">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Ticket Bottom Action Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Official Uno Ticket</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-green-600 hover:bg-green-700 text-white transition flex items-center gap-1.5 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Pass</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white transition flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
