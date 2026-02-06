import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LiveImpactPage from './pages/LiveImpactPage';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-red-200 selection:text-red-900">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live-impact" element={<LiveImpactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
