'use client';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Navigation from './Navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
            : 'bg-white shadow-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/" 
                className="group flex items-center space-x-2 text-2xl lg:text-3xl font-bold text-black hover:text-blue-600 transition-colors duration-300"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  DC
                </div>
                <span className="hidden sm:block">DCode</span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation />
            </div>
            
            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Get In Touch
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile menu */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden">
            <div className="flex h-full flex-col">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <a 
                  href="/" 
                  className="flex items-center space-x-2 text-xl font-bold text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    YN
                  </div>
                  <span>Your Name</span>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Mobile navigation */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                <Navigation 
                  mobile 
                  onItemClick={() => setMobileMenuOpen(false)} 
                />
              </div>
              
              {/* Mobile CTA */}
              <div className="border-t border-gray-100 px-6 py-6">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-full font-semibold transition-colors duration-300"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}