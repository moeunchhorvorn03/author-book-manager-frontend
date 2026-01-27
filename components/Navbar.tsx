
import React, { useState } from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
  onSearch: (searchValue: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setView('home')}
              className="text-2xl font-serif font-bold text-amber-900 tracking-tight"
            >
              Power<span className="text-amber-600">Books</span>
            </button>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => setView('home')} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}>Home</button>
              <button onClick={() => setView('shop')} className={`text-sm font-medium transition-colors ${currentView === 'shop' ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'}`}>The Catalog</button>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search titles, authors..." 
                onKeyUp={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (e.key === "Enter") {
                    onSearch(target.value);
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-4 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button 
              onClick={() => setView('cart')}
              className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg">
          <input 
            type="text" 
            placeholder="Search books..." 
            onKeyUp={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.key === "Enter") onSearch(target.value);
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 text-sm"
          />
          <div className="flex flex-col gap-3">
            <button onClick={() => {setView('home'); setIsMobileMenuOpen(false);}} className="text-left text-gray-600 py-2">Home</button>
            <button onClick={() => {setView('shop'); setIsMobileMenuOpen(false);}} className="text-left text-gray-600 py-2">The Catalog</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
