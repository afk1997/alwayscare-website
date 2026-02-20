import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import FoundationOfCare from '../components/FoundationOfCare';
import VisionSection from '../components/VisionSection';
import ArhamYuvaSeva from '../components/ArhamYuvaSeva';
import DonateSection from '../components/DonateSection';
import Community from '../components/Community';
import Volunteer from '../components/Volunteer';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [router.asPath]);

  return (
    <>
      <Hero />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8] to-transparent" />
      <PhotoGallery />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8] to-transparent" />
      <FoundationOfCare />
      <VisionSection />
      <ArhamYuvaSeva />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8]/50 to-transparent" />
      <DonateSection />
      <Community />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8]/50 to-transparent" />
      <Volunteer />
    </>
  );
};

export default HomePage;
