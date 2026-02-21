import React, { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  fadeUp,
  slideLeft,
  ease,
  transition,
  motionProps,
  staggerProps,
} from '../utils/motion';

const VisionSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ── Desktop: full-viewport split layout ── */}
      <div className="hidden xl:block relative min-h-screen">
        {/* Background image with scroll-driven scale */}
        <motion.img
          src="/images/gurudev-website.webp"
          alt="Param Gurudev Shree Namramuni Maharaj Saheb"
          className="absolute inset-0 w-full h-full object-cover"
          width={2560}
          height={1700}
          style={{ objectPosition: 'center right', scale: prefersReducedMotion ? 1 : photoScale }}
        />

        {/* Warm gradient overlay on left for card readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917]/40 via-[#1C1917]/20 to-transparent" />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* Content card — bottom-aligned, slides in from left */}
        <div className="absolute inset-0 flex items-end pb-12 xl:pb-16">
          <motion.div
            {...motionProps(slideLeft, prefersReducedMotion, {
              transition: { duration: 0.8, ease },
            })}
            className="ml-8 xl:ml-16 2xl:ml-24 max-w-[560px] xl:max-w-[600px]"
          >
            <motion.div
              className="relative bg-[#FFFBF5]/95 rounded-[32px] p-10 xl:p-[60px]"
              style={{ boxShadow: '0 20px 60px rgba(28,25,23,0.15)' }}
              {...staggerProps(prefersReducedMotion, 0.08)}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute -top-4 left-8 text-[180px] xl:text-[200px] leading-none select-none pointer-events-none"
                style={{
                  color: '#E8E0D8',
                  opacity: 0.1,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                &ldquo;
              </div>

              {/* Label */}
              <motion.p
                variants={prefersReducedMotion ? undefined : fadeUp}
                transition={transition}
                className="text-sm font-semibold tracking-[2px] uppercase text-[#292524] mb-6"
              >
                Our Founder
              </motion.p>

              {/* Name */}
              <motion.h2
                variants={prefersReducedMotion ? undefined : fadeUp}
                transition={transition}
                className="text-3xl xl:text-[36px] font-semibold text-[#292524] leading-tight mb-10"
                style={{ fontFamily: "'Open Runde', sans-serif" }}
              >
                Param Namramuni Gurudev
              </motion.h2>

              {/* Quote */}
              <motion.blockquote
                variants={prefersReducedMotion ? undefined : fadeUp}
                transition={transition}
                className="relative z-10 text-lg leading-[1.8] text-[#57534E] italic mb-8"
                style={{ fontFamily: "'Open Runde', sans-serif" }}
              >
                &ldquo;The birth of any human being is purposeful only with the birth of humanity in our hearts. Compassion beyond humanity is the highest form of service. Every creature deserves dignity, care, and a chance to heal.&rdquo;
              </motion.blockquote>

              {/* Attribution */}
              <motion.div
                variants={prefersReducedMotion ? undefined : fadeUp}
                transition={transition}
              >
                <p className="text-sm text-[#57534E] leading-relaxed mb-8">
                  Inspired by Param Gurudev Namramuni, Always Care was born from the belief that compassion for all living beings is the highest form of service.
                </p>

                <a
                  href="https://parasdham.org/param-gurudev/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#292524] text-white rounded-full font-medium hover:bg-[#44403C] transition-colors text-sm"
                >
                  Know More <ExternalLink size={14} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="xl:hidden pb-10">
        {/* Image with dark overlay */}
        <div className="relative h-[60vh]">
          <img
            src="/images/param-gurudev-mobile.webp"
            alt="Param Gurudev Shree Namramuni Maharaj Saheb"
            className="absolute inset-0 w-full h-full object-cover"
            width={1200}
            height={800}
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFFBF5]" />
        </div>

        {/* Content card — fades up when it enters viewport */}
        <motion.div
          {...motionProps(fadeUp, prefersReducedMotion, {
            transition: { duration: 0.8, ease },
          })}
          className="relative -mt-16 mx-4 bg-[#FFFBF5] rounded-3xl p-8"
          style={{ boxShadow: '0 12px 40px rgba(28,25,23,0.12)' }}
        >
          {/* Decorative quote mark */}
          <div
            className="absolute -top-2 left-6 text-[120px] leading-none select-none pointer-events-none"
            style={{
              color: '#d4c5b0',
              opacity: 0.1,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            &ldquo;
          </div>

          <p className="text-sm font-semibold tracking-[2px] uppercase text-[#292524] mb-4">
            Our Founder
          </p>

          <h2
            className="text-2xl font-semibold text-[#292524] leading-tight mb-6"
            style={{ fontFamily: "'Open Runde', sans-serif" }}
          >
            Param Namramuni Gurudev
          </h2>

          <blockquote
            className="relative z-10 text-base leading-[1.8] text-[#57534E] italic mb-6"
            style={{ fontFamily: "'Open Runde', sans-serif" }}
          >
            &ldquo;The birth of any human being is purposeful only with the birth of humanity in our hearts. Compassion beyond humanity is the highest form of service.&rdquo;
          </blockquote>

          <p className="text-sm text-[#57534E] leading-relaxed mb-6">
            Inspired by Param Gurudev Namramuni, Always Care was born from the belief that compassion for all living beings is the highest form of service.
          </p>

          <a
            href="https://parasdham.org/param-gurudev/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#292524] text-white rounded-full font-medium hover:bg-[#44403C] transition-colors text-sm"
          >
            Know More <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
