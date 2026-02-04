import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiveStats from './components/LiveStats';
import DonateSection from './components/DonateSection';
import Volunteer from './components/Volunteer';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-red-200 selection:text-red-900">
      <Header />
      <Hero />
      <LiveStats />
      <DonateSection />
      <Volunteer />
      <GeminiAssistant />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="container mx-auto px-4">
          <p className="mb-4">© {new Date().getFullYear()} Arham Animal Ambulance. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
