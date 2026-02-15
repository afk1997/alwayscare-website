import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LiveImpactPage from './pages/LiveImpactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import RefundCancellationPage from './pages/RefundCancellationPage';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-[#292524] selection:bg-[#FDEAEA] selection:text-[#B7312C]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#292524] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live-impact" element={<LiveImpactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/refund-cancellation" element={<RefundCancellationPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
