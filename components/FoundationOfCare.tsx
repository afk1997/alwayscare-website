import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const clinicImages = [
  '/images/clinic/1.jpg',
  '/images/clinic/2.jpg',
  '/images/clinic/3.jpg',
  '/images/clinic/4.jpg',
];

const FoundationOfCare: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [clinicSlide, setClinicSlide] = useState(0);

  // Auto-scroll clinic images every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setClinicSlide((prev) => (prev + 1) % clinicImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-slate-100" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className={`text-center mb-14 md:mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            The Foundation of Care
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Building a comprehensive network of care for animals across India
          </p>
        </div>

        {/* Bento grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Left — Animal Ambulance: text top, image bottom */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''} flex flex-col gap-5`}
            style={{ animationDelay: '150ms' }}
          >
            <div className="text-center px-2 pt-4">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Animal Ambulance</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                Free ambulances with vets and paravets treating and transporting stray and injured animals.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-200">
              <img
                src="/images/ambulance/1.jpg"
                alt="Animal Ambulance"
                loading="lazy"
                className="w-full aspect-[4/5] object-contain"
              />
            </div>
          </div>

          {/* Center — Animal Clinics: image slideshow top, text bottom */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''} flex flex-col gap-5`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="rounded-2xl overflow-hidden bg-slate-200 relative aspect-[3/4]">
              {clinicImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Animal Clinic ${i + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                    i === clinicSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div className="text-center px-2 pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Animal Clinics</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                Free clinics providing ongoing treatment and care for animals in need.
              </p>
            </div>
          </div>

          {/* Right — Animal Hospital: text top, image bottom */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''} flex flex-col gap-5`}
            style={{ animationDelay: '450ms' }}
          >
            <div className="text-center px-2 pt-4">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Animal Hospital</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                A dedicated hospital being built to offer advanced animal care on a larger scale.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-200">
              <img
                src="/images/hospital/1.jpeg"
                alt="Animal Hospital"
                loading="lazy"
                className="w-full aspect-[4/5] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundationOfCare;
