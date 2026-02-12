import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const donateImages = [
  '/images/photo/up-1.jpg',
  '/images/photo/up-2.jpg',
  '/images/photo/down-1.jpg',
  '/images/photo/down-2.jpg',
  '/images/photo/up-4.jpg',
  '/images/photo/down-4.jpg',
  '/images/photo/up-5.jpg',
  '/images/photo/down-5.jpg',
];

const presets = ['500', '1000', '2000', '5001'];

function getImpactMessage(val: number): string {
  if (val >= 5001) return '🚑 This keeps an ambulance running for a full day — rescuing 8-12 animals';
  if (val >= 2000) return '💉 This funds an emergency surgery to save one animal\'s life';
  if (val >= 500) return '🩹 This provides first aid, medicines & vaccinations for one injured animal';
  return '❤️ Every rupee matters — even small amounts save lives';
}

const DonateSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [amount, setAmount] = useState('2000');
  const [isMonthly, setIsMonthly] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % donateImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const numericAmount = Number(amount.replace(/,/g, '')) || 0;

  return (
    <section
      id="donate"
      className="relative overflow-hidden"
      ref={ref}
    >
      {/* ── Top: Photo hero with heading ── */}
      <div className="relative min-h-[60vh] flex items-center justify-center">
        {/* Background slideshow */}
        {donateImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Rescued animal"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />

        {/* Heading */}
        <div className={`scroll-reveal ${isVisible ? 'visible' : ''} relative z-10 text-center px-4 pb-16`}>
          <p className="text-xs tracking-[0.18em] uppercase text-white/50 font-semibold mb-3">
            Donate
          </p>
          <h2 className="premium-heading text-white leading-tight">
            Right Now,
            <br />
            an Animal Needs You
          </h2>
        </div>
      </div>

      {/* ── Bottom: Split card overlapping the photo ── */}
      <div className="relative z-20 -mt-44 pb-16 px-4">
        <div
          className={`scroll-reveal ${isVisible ? 'visible' : ''} max-w-[1080px] mx-auto grid md:grid-cols-2 rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)]`}
          style={{ animationDelay: '200ms' }}
        >
          {/* Left — Emotional side */}
          <div className="relative bg-gradient-to-br from-[#1a0f0a] to-[#2d1810] p-10 md:p-12 flex flex-col justify-center overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-amber-500/10 rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 bg-red-500/15 text-red-400 px-4 py-2 rounded-full text-[13px] font-semibold mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              LIVE — Animals need help right now
            </div>

            <h3
              className="text-white text-[28px] md:text-[34px] font-bold leading-[1.2] mb-5"
              style={{ fontFamily: "'Open Runde', sans-serif" }}
            >
              While you read this,{' '}
              <span className="text-amber-400 underline decoration-amber-400/30 underline-offset-4">
                an animal is suffering
              </span>{' '}
              on the streets.
            </h3>

            <p className="text-white/50 text-[15px] leading-[1.7] mb-9">
              Our 43+ ambulances respond to hundreds of emergencies daily — but only if we have the funds to keep them running. Your donation today means an ambulance reaches an injured animal tonight.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { num: '43+', label: 'Ambulances' },
                { num: '15+', label: 'Cities' },
                { num: '100%', label: 'Free Care' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-amber-400 text-[28px] font-extrabold">{s.num}</div>
                  <div className="text-white/30 text-xs font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Donation form */}
          <div className="bg-white p-10 md:p-12 flex flex-col justify-center">
            <h3 className="text-[22px] font-bold text-[#1a0f0a] mb-1">Choose your impact</h3>
            <p className="text-sm text-slate-400 mb-7">Every rupee goes directly to rescue operations</p>

            {/* One-time / Monthly toggle */}
            <div className="flex bg-[#f5f0eb] rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsMonthly(false)}
                className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
                  !isMonthly ? 'bg-white text-[#1a0f0a] shadow-sm' : 'text-slate-400'
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setIsMonthly(true)}
                className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  isMonthly ? 'bg-white text-[#1a0f0a] shadow-sm' : 'text-slate-400'
                }`}
              >
                Monthly
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  2X IMPACT
                </span>
              </button>
            </div>

            {/* Preset amounts */}
            <div className="grid grid-cols-4 gap-2.5 mb-5">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setAmount(p)}
                  className={`py-3.5 rounded-xl text-[15px] font-bold transition-all border-2 ${
                    amount === p
                      ? 'border-amber-400 bg-amber-50/50 text-amber-500'
                      : 'border-slate-100 text-slate-700 hover:border-slate-200'
                  }`}
                >
                  ₹{p}
                </button>
              ))}
            </div>

            {/* Custom amount input */}
            <div className="flex items-center border-2 border-slate-100 rounded-xl px-4 mb-3 focus-within:border-amber-400 transition-colors">
              <span className="text-slate-400 text-lg font-bold mr-1">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                className="flex-1 border-none outline-none text-lg font-bold py-3 px-2 text-[#1a0f0a] bg-transparent"
                style={{ fontFamily: "'Open Runde', sans-serif" }}
                placeholder="Other amount"
              />
            </div>

            {/* Impact message */}
            <div className="bg-amber-50 border-l-[3px] border-amber-400 rounded-r-[10px] px-4 py-3 mb-7">
              <p className="text-[13px] text-amber-800 leading-relaxed">
                {getImpactMessage(numericAmount)}
              </p>
            </div>

            {/* CTA button */}
            <button
              className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-[0_8px_24px_rgba(255,140,50,0.3)] hover:shadow-[0_12px_32px_rgba(255,140,50,0.4)] hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #ff9f43 0%, #ff6b35 100%)' }}
            >
              {isMonthly ? 'Donate Monthly' : 'Donate Now'} — ₹{amount || '0'}
            </button>

            <p className="text-center text-[11px] text-slate-300 mt-3.5">
              🔒 Razorpay Secured · 80G Tax Certificate Included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
