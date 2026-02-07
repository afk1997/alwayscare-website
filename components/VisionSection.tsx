import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const VisionSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      className="py-20 md:py-28 bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50/20 relative overflow-hidden"
      ref={ref}
    >
      {/* Mandala background decoration */}
      <img
        src="https://framerusercontent.com/images/g690a9Fxc6Y5G69sPCSKq4vjw.png"
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] md:w-[700px] opacity-[0.06] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Decorative quotation marks */}
      <div className="absolute top-16 left-8 text-amber-200/20 text-[160px] md:text-[220px] font-serif leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section label */}
        <div className={`text-center mb-12 md:mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-4">
            The Vision Behind Always Care
          </p>
        </div>

        {/* Split layout: portrait + content */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Portrait */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''} shrink-0`}
            style={{ animationDelay: '150ms' }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-amber-200/40" />
              <div className="absolute -inset-6 rounded-full border border-amber-100/30" />
              <img
                src="/images/param-gurudev.png"
                alt="Param Gurudev Shree Namramuni Maharaj Saheb"
                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-xl ring-4 ring-white"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            {/* Quote */}
            <div
              className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '250ms' }}
            >
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 leading-snug mb-6 italic">
                &ldquo;The birth of any human being is purposeful only with the birth of humanity in our hearts.&rdquo;
              </blockquote>
            </div>

            {/* Attribution */}
            <div
              className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="h-px w-8 bg-amber-300" />
                <p className="text-sm font-semibold text-amber-700">
                  Param Gurudev Shree Namramuni Maharaj Saheb
                </p>
              </div>
            </div>

            {/* Description */}
            <div
              className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '550ms' }}
            >
              <p className="text-slate-600 leading-relaxed mb-8">
                Inspired by Rashtrasant Param Gurudev Shree Namramuni Maharaj Saheb, Always Care was born
                from the belief that compassion for all living beings is the highest form of service.
                His vision continues to guide every rescue, every treatment, and every life we touch.
              </p>

              <a
                href="https://parasdham.org/param-gurudev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-sm hover:shadow-md"
              >
                Know More <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
