import React from 'react';
import { Instagram, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, dramatic, transition, motionProps, staggerProps } from '../utils/motion';

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const channels = [
  {
    platform: 'Instagram',
    category: 'RESCUE STORIES',
    desc: 'Follow our daily rescue stories, behind-the-scenes moments, and the animals whose lives you help save.',
    cta: 'Follow us',
    href: 'https://www.instagram.com/arhamanimalambulance/',
    iconBg: '#FEF3E7',
    iconColor: '#B8650A',
    icon: <Instagram size={24} />,
  },
  {
    platform: 'WhatsApp',
    category: 'REAL-TIME ALERTS',
    desc: 'Get real-time rescue updates, emergency alerts, and daily news delivered straight to your WhatsApp.',
    cta: 'Subscribe',
    href: 'https://chat.whatsapp.com/INVITE_LINK',
    iconBg: '#E8F0E9',
    iconColor: '#5F8A65',
    icon: <WhatsAppIcon />,
  },
];

const Community: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#FFFBF5] py-16 md:py-24 px-4">
      {/* Heading */}
      <motion.div
        {...motionProps(fadeUp, prefersReducedMotion)}
        className="text-center mb-12 md:mb-16"
      >
        <p className="text-[11px] tracking-[3px] uppercase text-[#78716C] font-semibold mb-3">
          Community
        </p>
        <h2
          className="text-[clamp(32px,5vw,52px)] font-bold text-[#292524] leading-[1.1]"
          style={{ fontFamily: "'Open Runde', sans-serif" }}
        >
          Stay in the Loop
        </h2>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto"
        {...staggerProps(prefersReducedMotion, 0.12)}
      >
        {channels.map((ch) => (
          <motion.a
            key={ch.platform}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={prefersReducedMotion ? undefined : dramatic}
            transition={transition}
            className="group block bg-white rounded-2xl p-8 no-underline transition-all duration-500 hover:-translate-y-1.5"
            style={{
              boxShadow: '0 4px 24px rgba(28,25,23,0.06), 0 0 0 1px rgba(28,25,23,0.03)',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(28,25,23,0.1), 0 0 0 1px rgba(184,101,10,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(28,25,23,0.06), 0 0 0 1px rgba(28,25,23,0.03)';
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: ch.iconBg, color: ch.iconColor }}
            >
              {ch.icon}
            </div>

            {/* Category label */}
            <p className="text-[11px] tracking-[2px] uppercase text-[#78716C] font-semibold mb-2">
              {ch.category}
            </p>

            {/* Platform name */}
            <h3
              className="text-[28px] font-bold text-[#292524] mb-3"
              style={{ fontFamily: "'Open Runde', sans-serif" }}
            >
              {ch.platform}
            </h3>

            {/* Description */}
            <p className="text-[15px] text-[#57534E] leading-relaxed mb-6">
              {ch.desc}
            </p>

            {/* CTA button */}
            <div
              className="w-full py-3 rounded-xl border-[1.5px] border-[#E8E0D8] text-center text-[14px] font-semibold text-[#292524] transition-all duration-300 group-hover:border-[#B8650A] group-hover:text-[#B8650A] flex items-center justify-center gap-2"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              {ch.cta}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default Community;
