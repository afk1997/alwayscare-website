import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import LightRays from '@/components/ui/light-rays';

const statsData = [
  { target: 55, suffix: '', label: 'Centers' },
  { target: 1500, suffix: '+', label: 'Volunteers' },
  { target: 1, suffix: 'M+', label: 'Lives Impacted' },
  { target: 500, suffix: 'K', label: 'Meals Everyday' },
];

const galleryImages = [
  '/images/photo/up-1.jpg',
  '/images/photo/down-1.jpg',
  '/images/photo/up-2.jpg',
  '/images/photo/down-2.jpg',
  '/images/photo/up-4.jpg',
  '/images/photo/down-4.jpg',
  '/images/photo/up-5.jpg',
  '/images/photo/down-5.jpg',
];

const StatItem: React.FC<{
  target: number;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
}> = ({ target, suffix, label, active, delay }) => {
  const count = useCountUp(active ? target : 0, 1500);

  return (
    <div
      className={`scroll-reveal ${active ? 'visible' : ''} text-center`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-[#A8A29E] font-medium">{label}</div>
    </div>
  );
};

const ArhamYuvaSeva: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      className="py-20 md:py-28 bg-[#1C1917] text-white relative overflow-hidden texture-grain warm-vignette"
      ref={ref}
    >
      {/* Light rays background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo — blooms in first */}
          <div className={`text-center mb-5 scroll-logo ${isVisible ? 'visible' : ''}`}>
            <img
              src="/images/aysg-logo.png"
              alt="Arham Yuva Seva Group"
              className="w-32 md:w-36 mx-auto"
            />
          </div>

          {/* "Powered by" label — fades in at 300ms */}
          <div
            className={`text-center mb-4 scroll-dramatic ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '300ms' }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D87E0F]">
              Powered by
            </p>
          </div>

          {/* Heading — slides up at 500ms */}
          <div
            className={`text-center mb-10 scroll-dramatic ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '500ms' }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Arham Yuva Seva Group
            </h2>
          </div>

          {/* Description */}
          <div
            className={`text-center mb-14 scroll-dramatic ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '700ms' }}
          >
            <p className="text-[#E8E0D8] max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
              Arham Yuva Seva Group is a youth-driven non-profit delivering on-ground seva across India.
              Inspired by Rashtrasant Param Gurudev Shree Namramuni Maharaj Saheb, we provide animal
              welfare (rescues, ambulances), disaster relief, medical aid and dialysis support, cataract
              camps, education aid and book distribution, large-scale daily meals, and community support
              like autorickshaw ownership, blanket distribution and water station construction, and much more.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {statsData.map((stat, i) => (
              <StatItem
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                active={isVisible}
                delay={900 + i * 150}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '1500ms' }}
          >
            <a
              href="./"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 active:scale-95 transition-all duration-200"
            >
              Know more <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Photo gallery marquee */}
      <div
        className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
        style={{ animationDelay: '1200ms' }}
      >
        <div className="overflow-hidden group">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused]">
            {/* Set 1 */}
            <div className="flex gap-4 shrink-0 pr-4">
              {galleryImages.map((src, i) => (
                <div
                  key={`a-${i}`}
                  className="shrink-0 w-[240px] md:w-[300px] rounded-xl overflow-hidden"
                >
                  <img
                    src={src}
                    alt="Arham Yuva Seva Group work"
                    loading="lazy"
                    className="w-full h-[160px] md:h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            {/* Set 2 (duplicate) */}
            <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
              {galleryImages.map((src, i) => (
                <div
                  key={`b-${i}`}
                  className="shrink-0 w-[240px] md:w-[300px] rounded-xl overflow-hidden"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-[160px] md:h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArhamYuvaSeva;
