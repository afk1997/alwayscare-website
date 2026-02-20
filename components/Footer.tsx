import React from 'react';
import Link from 'next/link';
import { Heart, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, transition, motionProps, staggerProps } from '../utils/motion';

const cities = [
  'Ahmedabad', 'Bhavnagar', 'Gondal', 'Junagadh', 'Palitana',
  'Surat', 'Vadodara', 'Veraval', 'Jamnagar', 'Mumbai',
  'Nagpur', 'Pune', 'Delhi', 'Chennai', 'Hyderabad',
  'Indore', 'Bengaluru',
];

const navLinks = [
  { label: 'Find Ambulance', href: '#home' },
  { label: 'Our Impact', href: '/live-impact', isRoute: true },
  { label: 'Donate', href: '#donate' },
  { label: 'Volunteer', href: '#volunteer' },
];

const contactItems = [
  {
    icon: Heart,
    label: '100% Free Treatment',
    value: 'For injured stray animals',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'support@alwayscare.org',
    href: 'mailto:support@alwayscare.org',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Mumbai, Maharashtra, India',
  },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/arhamanimalambulance/',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const CityMarquee: React.FC<{ reducedMotion: boolean | null }> = ({ reducedMotion }) => {
  const cityString = cities.map((c) => c).join(' · ');

  if (reducedMotion) {
    return (
      <div className="py-5 border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-[11px] tracking-[3px] uppercase text-white/[0.12] font-semibold text-center">
            {cityString}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-5 border-b border-white/[0.04] group">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-[#1C1917] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-[#1C1917] to-transparent" />

      <div className="flex w-max animate-marquee-cities group-hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex shrink-0 items-center">
          {cities.map((city, i) => (
            <React.Fragment key={`a-${i}`}>
              <span className="text-[11px] tracking-[3px] uppercase text-white/[0.12] font-semibold whitespace-nowrap">
                {city}
              </span>
              <span className="text-white/[0.06] mx-5">&middot;</span>
            </React.Fragment>
          ))}
        </div>
        {/* Set 2 (duplicate for seamless loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {cities.map((city, i) => (
            <React.Fragment key={`b-${i}`}>
              <span className="text-[11px] tracking-[3px] uppercase text-white/[0.12] font-semibold whitespace-nowrap">
                {city}
              </span>
              <span className="text-white/[0.06] mx-5">&middot;</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1917] text-white relative overflow-hidden texture-grain">
      {/* Atmospheric background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-16 left-[8%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,101,10,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-32 right-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(95,138,101,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* 1. Emergency Helpline Banner */}
      <motion.div
        {...motionProps(fadeUp, prefersReducedMotion)}
        className="relative z-10 bg-[#B8650A]/[0.06] border-b border-white/[0.04]"
      >
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-[#D87E0F]/40 helpline-pulse" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#D87E0F]" />
            </span>
            <span className="text-[14px] text-[#A8A29E] font-medium">
              Animal <span className="text-white font-semibold">in distress</span>?
            </span>
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D87E0F]/10 border border-[#D87E0F]/20 text-[#D87E0F] text-[13px] font-semibold transition-all duration-300 hover:bg-[#D87E0F]/20 hover:border-[#D87E0F]/40 hover:scale-105 w-full md:w-auto justify-center"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <ArrowUpRight size={14} />
            Get Help Now
          </a>
        </div>
      </motion.div>

      {/* 2. City Marquee */}
      <CityMarquee reducedMotion={prefersReducedMotion} />

      {/* 3. Content Grid */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 py-10 md:py-14"
        {...staggerProps(prefersReducedMotion, 0.1)}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Left — Brand + Social */}
          <motion.div
            className="md:col-span-5"
            variants={prefersReducedMotion ? undefined : fadeUp}
            transition={transition}
          >
            <div className="flex items-center gap-4 mb-5">
              <img
                src="/images/arham-alwayscare-logo.webp"
                alt="Always Care"
                className="h-10 w-auto"
              />
              <div className="w-px h-8 bg-white/10" />
              <img
                src="/images/aysg-logo.webp"
                alt="Arham Yuva Seva Group"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#A8A29E] text-[14px] leading-[1.75] max-w-[360px] mb-6">
              A youth-driven seva movement providing free emergency rescue,
              treatment, and rehabilitation for injured street animals.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#A8A29E] transition-all duration-300 hover:bg-[#B8650A]/15 hover:border-[#B8650A]/30 hover:text-[#D87E0F] hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(184,101,10,0.15)]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Center — Navigation */}
          <motion.div
            className="md:col-span-3"
            variants={prefersReducedMotion ? undefined : fadeUp}
            transition={transition}
          >
            <h4 className="text-[11px] tracking-[3px] uppercase text-[#78716C] font-semibold mb-5">
              Navigate
            </h4>
            <div className="flex flex-col">
              {navLinks.map((link) => {
                const inner = (
                  <span className="group/link relative flex items-center gap-2 py-2.5 text-[15px] text-[#A8A29E] transition-all duration-300 hover:text-white hover:translate-x-1.5 cursor-pointer">
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-[#D87E0F]"
                    />
                  </span>
                );

                return link.isRoute ? (
                  <Link key={link.label} href={link.href} className="no-underline">
                    {inner}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className="no-underline">
                    {inner}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Contact */}
          <motion.div
            className="md:col-span-4"
            variants={prefersReducedMotion ? undefined : fadeUp}
            transition={transition}
          >
            <h4 className="text-[11px] tracking-[3px] uppercase text-[#78716C] font-semibold mb-5">
              Reach Us
            </h4>
            <div className="flex flex-col gap-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3.5 group/contact">
                    <div className="w-9 h-9 rounded-lg bg-[#B8650A]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/contact:bg-[#B8650A]/20 transition-colors duration-300">
                      <Icon size={16} className="text-[#D87E0F]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#78716C] font-medium uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[15px] text-white font-medium group-hover/contact:text-[#D87E0F] transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="no-underline">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Bottom Bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#57534E] text-[13px]">
              &copy; {currentYear} Arham Yuva Seva Group. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[13px]">
              <span className="text-[#5F8A65] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5F8A65]" />
                80G Tax Exemption
              </span>
              <span className="text-white/[0.08]">|</span>
              <Link
                href="/privacy-policy"
                className="text-[#78716C] hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-[#78716C] hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund-cancellation"
                className="text-[#78716C] hover:text-white transition-colors duration-300"
              >
                Refund & Cancellation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
