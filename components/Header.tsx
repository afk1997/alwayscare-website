import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center">
          <img 
            src="https://alwayscare.org/wp-content/uploads/2021/09/logo-1.png" 
            alt="Always Care" 
            className="h-10 md:h-12 w-auto object-contain"
            onError={(e) => {
               // Fallback just in case URL breaks
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-black text-slate-900 tracking-tight">ALWAYS<span class="text-red-600">CARE</span></span>`;
            }}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#home" // Scrolls to map in hero
            className="px-5 py-2 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm"
          >
            <Phone size={16} className="fill-current" />
            Call Ambulance
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 font-medium py-2 border-b border-slate-50 last:border-none"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-4 py-3 bg-red-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Call Ambulance
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
