import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { ExternalLink } from 'lucide-react';
import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import {
  fadeUp,
  dramatic,
  scaleIn,
  ease,
  viewport,
  transition,
  motionProps,
  staggerProps,
} from '../utils/motion';

const LightRays = dynamic(() => import('@/components/ui/light-rays'), { ssr: false });

const statsData = [
  { target: 55, suffix: '', label: 'Centers' },
  { target: 1500, suffix: '+', label: 'Volunteers' },
  { target: 1, suffix: 'M+', label: 'Lives Impacted' },
  { target: 500, suffix: 'K', label: 'Meals Everyday' },
];

const galleryImages = [
  { src: '/images/aysg/aysg-1.webp', alt: 'AYSG volunteer distributing blankets to a child', width: 600, height: 450 },
  { src: '/images/aysg/aysg-2.webp', alt: 'Arham Paathshala school bag distribution in Jharia', width: 600, height: 450 },
  { src: '/images/aysg/aysg-3.webp', alt: 'Children with AYSG-branded school bags', width: 600, height: 450 },
  { src: '/images/aysg/aysg-4.webp', alt: 'Abhaydaan Abhiyaan animal rescue in Ahmedabad', width: 600, height: 400 },
  { src: '/images/aysg/aysg-5.webp', alt: 'Auto rickshaw distribution ceremony in Rajkot', width: 600, height: 399 },
  { src: '/images/aysg/aysg-6.webp', alt: 'Anant Arham Aahar food distribution in Surat', width: 600, height: 338 },
  { src: '/images/aysg/aysg-7.webp', alt: 'Free cataract eye checkup camp', width: 600, height: 400 },
  { src: '/images/aysg/aysg-8.webp', alt: 'Arham Jal Mandir water station in Mumbai', width: 600, height: 400 },
  { src: '/images/aysg/aysg-9.webp', alt: 'Annadaan food distribution in Bhavnagar', width: 600, height: 280 },
  { src: '/images/aysg/aysg-10.webp', alt: 'Jeevlaya cow feeding in Matunga', width: 600, height: 1068 },
];

const StatItem: React.FC<{
  target: number;
  suffix: string;
  label: string;
  active: boolean;
}> = ({ target, suffix, label, active }) => {
  const count = useCountUp(active ? target : 0, 1500);

  return (
    <motion.div
      variants={fadeUp}
      transition={transition}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-[#A8A29E] font-medium">{label}</div>
    </motion.div>
  );
};

const ArhamYuvaSeva: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-10%' });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [80, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#1C1917] text-white relative overflow-hidden texture-grain warm-vignette"
    >
      {/* Light rays background */}
      <motion.div className="absolute inset-0 z-0" style={prefersReducedMotion ? undefined : { y: bgY }}>
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
      </motion.div>

      <motion.div className="container mx-auto px-4 relative z-10" style={prefersReducedMotion ? undefined : { y: contentY }}>
        <div className="max-w-4xl mx-auto">
          {/* Logo — blooms in */}
          <motion.div
            {...motionProps(scaleIn, prefersReducedMotion, {
              transition: { duration: 0.9, ease },
            })}
            className="text-center mb-5"
          >
            <img
              src="/images/aysg-logo.webp"
              alt="Arham Yuva Seva Group"
              className="w-32 md:w-36 mx-auto"
              width={256}
              height={256}
            />
          </motion.div>

          {/* "Powered by" label */}
          <motion.div
            {...motionProps(fadeUp, prefersReducedMotion)}
            className="text-center mb-4"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D87E0F]">
              Powered by
            </p>
          </motion.div>

          {/* Heading */}
          <motion.div
            {...motionProps(dramatic, prefersReducedMotion)}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Arham Yuva Seva Group
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            {...motionProps(fadeUp, prefersReducedMotion)}
            className="text-center mb-14"
          >
            <p className="text-[#E8E0D8] max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
              Arham Yuva Seva Group is a youth-driven non-profit delivering on-ground seva across India.
              Inspired by Rashtrasant Param Gurudev Shree Namramuni Maharaj Saheb, we provide animal
              welfare (rescues, ambulances), disaster relief, medical aid and dialysis support, cataract
              camps, education aid and book distribution, large-scale daily meals, and community support
              like autorickshaw ownership, blanket distribution and water station construction, and much more.
            </p>
          </motion.div>

          {/* Stats — stagger in + counter triggers on viewport entry */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12"
            {...staggerProps(prefersReducedMotion, 0.1)}
          >
            {statsData.map((stat) => (
              <StatItem
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                active={statsInView}
              />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            {...motionProps(fadeUp, prefersReducedMotion)}
            className="text-center mb-16"
          >
            <a
              href="./"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 active:scale-95 transition-all duration-200"
            >
              Know more <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Photo gallery marquee */}
      <motion.div {...motionProps(fadeUp, prefersReducedMotion)}>
        <div className="overflow-hidden group">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused]">
            {/* Set 1 */}
            <div className="flex gap-4 shrink-0 pr-4">
              {galleryImages.map((img, i) => (
                <div
                  key={`a-${i}`}
                  className="shrink-0 w-[240px] md:w-[300px] rounded-xl overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={img.width}
                    height={img.height}
                    className="w-full h-[160px] md:h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            {/* Set 2 (duplicate) */}
            <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
              {galleryImages.map((img, i) => (
                <div
                  key={`b-${i}`}
                  className="shrink-0 w-[240px] md:w-[300px] rounded-xl overflow-hidden"
                >
                  <img
                    src={img.src}
                    alt=""
                    loading="lazy"
                    width={img.width}
                    height={img.height}
                    className="w-full h-[160px] md:h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ArhamYuvaSeva;
