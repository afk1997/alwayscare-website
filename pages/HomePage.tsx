import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import FoundationOfCare from '../components/FoundationOfCare';
import VisionSection from '../components/VisionSection';
import ArhamYuvaSeva from '../components/ArhamYuvaSeva';
import DonateSection from '../components/DonateSection';
import Volunteer from '../components/Volunteer';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <PhotoGallery />
      <FoundationOfCare />
      <VisionSection />
      <ArhamYuvaSeva />
      <DonateSection />
      <Volunteer />
    </>
  );
};

export default HomePage;
