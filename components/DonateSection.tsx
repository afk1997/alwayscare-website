import React, { useState } from 'react';
import { Heart, Copy, Check, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const impactTiers = [
  {
    amount: '₹500',
    impact: 'One animal treated',
    description: 'Covers basic first aid and medication for an injured stray.',
    accent: 'border-green-200 bg-green-50/50',
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    amount: '₹1,000',
    impact: 'Emergency rescue',
    description: 'Funds an ambulance dispatch to rescue and transport an animal.',
    accent: 'border-blue-200 bg-blue-50/50',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    amount: '₹2,500',
    impact: 'A week of care',
    description: 'Provides a full week of treatment, food, and rehabilitation.',
    accent: 'border-amber-200 bg-amber-50/50',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    amount: '₹5,000',
    impact: 'Sponsor an ambulance',
    description: 'Covers fuel, medicine, and paramedic costs for a full day.',
    accent: 'border-red-200 bg-red-50/50',
    iconBg: 'bg-red-100 text-red-600',
  },
];

const bankDetails = {
  accName: 'Arham Yuva Seva Group',
  accNo: '50200023412345',
  ifsc: 'HDFC0000001',
};

const DonateSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllDetails = () => {
    const allDetails = `Account Name: ${bankDetails.accName}\nAccount No: ${bankDetails.accNo}\nIFSC: ${bankDetails.ifsc}`;
    copyToClipboard(allDetails, 'all');
  };

  return (
    <section id="donate" className="py-20 md:py-28 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle warm decorative accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className={`text-center mb-14 md:mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-6 fill-red-500/20" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Every Life Deserves Care
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Your generosity fuels ambulances, funds treatments, and gives injured animals a second chance at life.
          </p>
        </div>

        {/* Impact tiers */}
        <div
          className={`scroll-reveal ${isVisible ? 'visible' : ''} max-w-4xl mx-auto mb-12`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {impactTiers.map((tier, i) => (
              <div
                key={tier.amount}
                className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <div
                  className={`border-2 ${tier.accent} rounded-2xl p-5 md:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    {tier.amount}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 mb-2">{tier.impact}</div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-auto">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donate CTA */}
        <div
          className={`text-center mb-14 scroll-reveal ${isVisible ? 'visible' : ''}`}
          style={{ animationDelay: '600ms' }}
        >
          <a
            href="#donate-details"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] btn-shine"
          >
            <Heart size={20} className="fill-current" />
            Donate Now
          </a>
        </div>

        {/* Bank details */}
        <div
          id="donate-details"
          className={`scroll-reveal ${isVisible ? 'visible' : ''} max-w-lg mx-auto`}
          style={{ animationDelay: '700ms' }}
        >
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">
              Donate via Bank Transfer
            </h3>

            <div className="space-y-3 text-sm">
              {[
                { label: 'Account Name', value: bankDetails.accName, key: 'accName', mono: false },
                { label: 'Account Number', value: bankDetails.accNo, key: 'accNo', mono: true },
                { label: 'IFSC Code', value: bankDetails.ifsc, key: 'ifsc', mono: true },
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-xs block">{item.label}</span>
                    <span className={`text-slate-800 font-medium ${item.mono ? 'font-mono' : ''}`}>
                      {item.value}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value, item.key)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                    aria-label={`Copy ${item.label}`}
                  >
                    {copied === item.key ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} className="text-slate-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={copyAllDetails}
              className="w-full mt-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold transition-colors flex items-center justify-center gap-2"
              aria-label="Copy all bank details"
            >
              {copied === 'all' ? (
                <>
                  <Check size={18} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy All Details
                </>
              )}
            </button>
          </div>
        </div>

        {/* 80G Trust signal */}
        <div
          className={`text-center mt-8 scroll-reveal ${isVisible ? 'visible' : ''}`}
          style={{ animationDelay: '800ms' }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <ShieldCheck size={16} className="text-green-500" />
            All donations are exempt under Section 80G of the Income Tax Act
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
