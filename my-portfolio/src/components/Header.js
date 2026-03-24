'use client';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Navigation from './Navigation';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-white/5'
            : 'bg-white dark:bg-gray-950 border-b border-transparent'
          }`}
      >
        <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <div className="flex items-center">
              <a
                href="/"
                className="group flex items-center space-x-2 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-black text-sm lg:text-base shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300">
                  M
                </div>
                <span className="hidden sm:block font-black">Methmal</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <Navigation />
            </div>

            {/* Desktop right side: theme toggle + CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Dark/Light toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-orange-100 dark:hover:bg-orange-500/15 hover:text-orange-500 transition-all duration-300 hover:scale-110"
                aria-label="Toggle dark/light mode"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-5 h-5 text-gray-700" />
                ) : (
                  <SunIcon className="w-5 h-5 text-orange-400" />
                )}
              </button>

              <a
                href="#contact"
                className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
              >
                Get In Touch
              </a>
            </div>

            {/* Mobile: theme toggle + menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/[0.06] hover:bg-orange-100 dark:hover:bg-orange-500/15 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-5 h-5 text-gray-700" />
                ) : (
                  <SunIcon className="w-5 h-5 text-orange-400" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/10 rounded-lg transition-colors duration-300"
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile menu panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-gray-950 shadow-2xl lg:hidden border-l border-gray-100 dark:border-white/5">
            <div className="flex h-full flex-col">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
                <a
                  href="/"
                  className="flex items-center space-x-2 text-xl font-black text-gray-900 dark:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow shadow-orange-500/30">
                    M
                  </div>
                  <span>Methmal</span>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/10 rounded-lg transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile navigation */}
              <div className="flex-1 px-3 py-4 overflow-y-auto">
                <Navigation
                  mobile
                  onItemClick={() => setMobileMenuOpen(false)}
                />
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-gray-100 dark:border-white/5 px-6 py-6">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-center px-6 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
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
