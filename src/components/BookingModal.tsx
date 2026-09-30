import React, { useState } from 'react';
import { useUnoStore } from '../context/UnoContext';
import type { Passenger, Booking } from '../types';
import { UnoPassTicket } from './UnoPassTicket';
import confetti from 'canvas-confetti';
import {
  X,
  Users,
  Calendar,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { bookingTrip, setBookingTrip, upiConfig, createBooking, offers } = useUnoStore();

  // Wizard Steps: 1: Members & Date -> 2: Passenger Details -> 3: QR Payment -> 4: Ticket Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [numMembers, setNumMembers] = useState<number>(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 22, city: 'Chennai' }
  ]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');

  // Payment State
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!bookingTrip) return null;

  // Initialize date on modal open if not set
  if (!selectedDate && bookingTrip.datesAvailable.length > 0) {
    setSelectedDate(bookingTrip.datesAvailable[0]);
  }

  // Handle member count change dynamically updating passenger list
  const handleMemberCountChange = (count: number) => {
    const newCount = Math.max(1, Math.min(count, bookingTrip.slotsTotal - bookingTrip.slotsBooked));
    setNumMembers(newCount);

    setPassengers((prev) => {
      const updated = [...prev];
      if (newCount > prev.length) {
        for (let i = prev.length; i < newCount; i++) {
          updated.push({
            name: '',
            age: 22,
            city: 'Chennai'
          });
        }
      } else {
        return updated.slice(0, newCount);
      }
      return updated;
    });
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Coupon application
  const applyCoupon = () => {
    const foundOffer = offers.find((o) => o.code.trim().toUpperCase() === couponCode.trim().toUpperCase());
    if (foundOffer) {
      setDiscountPercent(foundOffer.discountPercent);
      setCouponMessage(`✅ ${foundOffer.discountPercent}% Discount Applied! (${foundOffer.title})`);
    } else if (couponCode.trim().toUpperCase() === 'UNOINSTA500') {
      setDiscountPercent(10);
      setCouponMessage('✅ 10% Instagram Discount Applied!');
    } else {
      setDiscountPercent(0);
      setCouponMessage('❌ Invalid promo coupon code');
    }
  };

  // Financial calculations
  const perPersonPrice = bookingTrip.price;
  const rawSubtotal = perPersonPrice * numMembers;
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalPayable = Math.max(0, rawSubtotal - discountAmount);

  // UPI Deep Link construction for Meta / wallet fund style instant payment
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiConfig.upiId)}&pn=${encodeURIComponent(
    upiConfig.merchantName
  )}&am=${finalPayable}&cu=INR&tn=UnoBooking_${bookingTrip.id}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiConfig.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Step 2 validation -> Proceed to Payment QR
  const validateStep2 = () => {
    setErrorMsg('');
    if (!phone || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim()) {
        setErrorMsg(`Please enter the full name for Member ${i + 1}.`);
        return;
      }
      if (!p.city.trim()) {
        setErrorMsg(`Please enter the city for Member ${i + 1}.`);
        return;
      }
    }
    setStep(3);
  };

  // Submit Payment and Finalize Booking
  const handleFinalSubmitPayment = () => {
    setErrorMsg('');
    if (!utrNumber || utrNumber.trim().length < 6) {
      setErrorMsg('Please enter the 12-digit UPI UTR / Transaction Reference Number from your payment app.');
      return;
    }

    const newBooking = createBooking({
      tripId: bookingTrip.id,
      tripTitle: bookingTrip.title,
      tripDate: selectedDate,
      tripImage: bookingTrip.image,
      members: passengers,
      perPersonPrice,
      totalAmount: finalPayable,
      discountApplied: discountAmount,
      couponCode: discountPercent > 0 ? couponCode : undefined,
      paymentMethod: 'UPI_QR',
      utrNumber: utrNumber.trim(),
      screenshotUrl: screenshotUrl || undefined,
      customerContact: { phone, email }
    });

    setConfirmedBooking(newBooking);
    setStep(4);

    // Launch celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-red-600 tracking-wider">
                GET UNO PASS PORTAL
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1">
                {bookingTrip.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setBookingTrip(null)}
            className="p-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-red-600 font-extrabold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-[10px]">1</span>
            <span className="hidden sm:inline">Slots & Date</span>
          </div>
          <span className="text-slate-400">➔</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-red-600 font-extrabold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-[10px]">2</span>
            <span>Passenger Forms</span>
          </div>
          <span className="text-slate-400">➔</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-red-600 font-extrabold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-[10px]">3</span>
            <span>QR Payment</span>
          </div>
          <span className="text-slate-400">➔</span>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-green-600 font-extrabold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-[10px]">4</span>
            <span className="hidden sm:inline">GET UNO PASS</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Select Date & Member Count */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-600" />
                    Trip Departure Date
                  </label>
                  <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                    Family & Private Trips Date Customizable
                  </span>
                </div>

                {/* Available Date Options if admin set fixed dates (Events / Stranger Trips) */}
                {bookingTrip.datesAvailable && bookingTrip.datesAvailable.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    {bookingTrip.datesAvailable.map((d, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(d)}
                        className={`p-3.5 rounded-xl text-xs font-bold text-left transition border ${
                          selectedDate === d
                            ? 'bg-red-50 text-red-700 border-red-500 shadow-xs'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        📅 {d}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Date Input for Family / Private Trips */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="text-[11px] font-bold uppercase text-slate-700 block">
                    Or Customize Travel Date (For Private Family & Group Trips):
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="date"
                      value={selectedDate.length === 10 && selectedDate.includes('-') ? selectedDate : ''}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-white text-slate-900 font-bold px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="text"
                      placeholder="Type custom date e.g. Oct 20 - Oct 22 (Family Private)"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="flex-1 bg-white text-slate-900 font-semibold px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Number of Members Counter */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-600" />
                    Number of Members / Slots
                  </label>
                  <span className="text-xs font-bold text-red-600">
                    ₹{perPersonPrice.toLocaleString('en-IN')} / member
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => handleMemberCountChange(numMembers - 1)}
                    className="w-10 h-10 rounded-xl bg-slate-200 text-slate-900 font-extrabold text-lg hover:bg-slate-300 transition"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-slate-900 w-12 text-center">
                    {numMembers}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleMemberCountChange(numMembers + 1)}
                    className="w-10 h-10 rounded-xl bg-red-600 text-white font-extrabold text-lg hover:bg-red-700 transition shadow-xs"
                  >
                    +
                  </button>
                  <span className="text-xs text-slate-500 font-medium ml-2">
                    (Total: {numMembers} member{numMembers > 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              {/* Promo Coupon Section */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-600 tracking-wider">
                  Have a Promo Coupon Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter UNOINSTA500"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-50 text-red-600 uppercase font-mono font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-xs font-bold text-red-600">{couponMessage}</p>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Base Price ({numMembers} x ₹{perPersonPrice}):</span>
                  <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-green-600 font-bold">
                    <span>Discount Applied:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                  <span>Estimated Total:</span>
                  <span className="text-red-600">₹{finalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Dynamic Passenger Details Form */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                📝 Please provide Name, Age & City for <strong>ALL {numMembers} members</strong>.
              </div>

              {/* Contact info for booking confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                    Primary Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="traveler@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Dynamic Member Cards */}
              <div className="space-y-4">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 relative shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Member #{index + 1} Details
                      </span>
                      {index === 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                          Primary Member
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Karthik Raja"
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                          className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          min="10"
                          max="90"
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value) || 18)}
                          className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                          City of Residence *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Chennai"
                          value={passenger.city}
                          onChange={(e) => handlePassengerChange(index, 'city', e.target.value)}
                          className="w-full bg-slate-50 text-slate-900 px-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Meta-Style QR Payment Screen */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Meta Add Funds Card */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 shadow-md text-slate-900">
                
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-black uppercase text-red-600 tracking-widest">
                    META-STYLE DIRECT UPI QR CHECKOUT
                  </span>
                  <h3 className="text-3xl font-black text-slate-900">
                    Scan & Pay ₹{finalPayable.toLocaleString('en-IN')}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Payable amount calculated for {numMembers} slot(s) for {bookingTrip.title}
                  </p>
                </div>

                {/* QR Code Container - Single Barath Sandy QR Image Only */}
                <div className="flex flex-col items-center justify-center bg-white p-6 rounded-3xl max-w-sm mx-auto shadow-lg border-2 border-red-500 space-y-4">
                  <div className="w-56 h-64 rounded-2xl overflow-hidden bg-white p-1">
                    <img
                      src="/payment-qr.jpg"
                      alt="Barath Sandy UPI QR"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* EXACT PAYABLE AMOUNT directly underneath QR */}
                  <div className="text-center pt-2 border-t border-slate-100 w-full">
                    <span className="text-sm font-black text-red-600 tracking-wider uppercase block">
                      EXACT PAYABLE ₹{finalPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* UPI VPA Details & Copy */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between max-w-md mx-auto shadow-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">UPI ID / VPA</span>
                    <span className="text-sm font-mono font-black text-red-600 block">barathsandy29-2@oksbi</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-red-600" />}
                    <span>{copiedUpi ? 'Copied VPA!' : 'Copy VPA'}</span>
                  </button>
                </div>

                {/* Direct Mobile App Buttons */}
                <div className="space-y-2 max-w-md mx-auto">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 block text-center">
                    Pay Directly via Mobile App (GPay / PhonePe / Paytm)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <a
                      href={upiPayUrl}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black text-center border border-slate-200 transition shadow-2xs flex items-center justify-center gap-1"
                    >
                      📱 GPay
                    </a>
                    <a
                      href={upiPayUrl}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black text-center border border-slate-200 transition shadow-2xs flex items-center justify-center gap-1"
                    >
                      💜 PhonePe
                    </a>
                    <a
                      href={upiPayUrl}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black text-center border border-slate-200 transition shadow-2xs flex items-center justify-center gap-1"
                    >
                      💙 Paytm
                    </a>
                    <a
                      href={upiPayUrl}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black text-center border border-slate-200 transition shadow-2xs flex items-center justify-center gap-1"
                    >
                      ⚡ BHIM
                    </a>
                  </div>
                </div>

              </div>

              {/* Verification Inputs */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-black text-red-600 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  Step 2: Enter Payment UTR / Ref Number
                </h4>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-700 block mb-1">
                    UPI UTR / Transaction ID (12 Digits) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 428109382109"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-white text-slate-900 font-mono font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">
                    Check your UPI app payment receipt for the 12-digit UTR/Ref Number.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                    Payment Screenshot URL / Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Paste image link or upload ref"
                    value={screenshotUrl}
                    onChange={(e) => setScreenshotUrl(e.target.value)}
                    className="w-full bg-white text-slate-700 px-4 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: GET UNO PASS Ticket View */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 animate-fadeIn text-center">
              
              <div className="inline-flex p-3 rounded-full bg-green-100 text-green-700 border border-green-200">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">GET UNO PASS Issued!</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Your official trip pass has been issued under Pass ID:{' '}
                  <strong className="text-red-600 font-black">{confirmedBooking.id}</strong>
                </p>
              </div>

              {/* Render UnoPassTicket */}
              <UnoPassTicket booking={confirmedBooking} />

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setBookingTrip(null)}
                  className="px-8 py-3 rounded-2xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white transition shadow-lg"
                >
                  Close & Return to Home
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Navigation Control Footer */}
        {step < 4 && (
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-md"
              >
                <span>Enter Passenger Details ({numMembers})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={validateStep2}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1.5 shadow-md"
              >
                <span>Proceed to QR Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleFinalSubmitPayment}
                className="px-6 py-3 rounded-xl text-xs font-black bg-green-600 hover:bg-green-700 text-white transition flex items-center gap-2 shadow-lg"
              >
                <span>Confirm Payment & Get UNO Pass</span>
                <ShieldCheck className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
