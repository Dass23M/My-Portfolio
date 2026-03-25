'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Navigation from './Navigation';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes drawerIn  { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }
        @keyframes backdropIn{ from { opacity:0; } to { opacity:1; } }
        .header-anim { animation: slideDown .4s cubic-bezier(.16,1,.3,1) both; }
        .drawer-anim { animation: drawerIn  .4s cubic-bezier(.16,1,.3,1) both; }
        .backdrop-anim { animation: backdropIn .3s ease both; }

        /* hamburger → X morphing lines */
        .ham-line { transition: transform .35s cubic-bezier(.16,1,.3,1), opacity .2s; transform-origin: center; }
        .ham-open .ham-top    { transform: translateY(7px) rotate(45deg); }
        .ham-open .ham-mid    { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-bot    { transform: translateY(-7px) rotate(-45deg); }
      `}</style>

      {/* ── HEADER BAR ── */}
      <header className={`
        header-anim fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-white/92 dark:bg-[#080c18]/92 backdrop-blur-xl shadow-sm shadow-black/5 border-b border-gray-100 dark:border-white/5'
          : 'bg-white dark:bg-[#080c18] border-b border-transparent'}
      `}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── LOGO ── */}
            <Link href="/" className="group flex items-center gap-3 shrink-0">
              {/* icon block */}
              <div className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-xl overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-white text-xl lg:text-2xl leading-none tracking-wider">
                    M
                  </span>
                </div>
                {/* shine on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
              </div>

              {/* wordmark */}
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl tracking-[0.08em] text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                  METHMAL
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase">
                  Full-Stack Dev
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden lg:block">
              <Navigation />
            </div>

            {/* ── DESKTOP RIGHT ── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/6 hover:bg-orange-100 dark:hover:bg-orange-500/15 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {theme === 'light'
                  ? <MoonIcon className="w-[18px] h-[18px] text-gray-600" />
                  : <SunIcon className="w-[18px] h-[18px] text-orange-400" />}
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 bg-orange-500 text-white font-[family-name:var(--font-display)] tracking-[0.1em] text-[15px] px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">GET IN TOUCH</span>
                {/* shimmer sweep on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </Link>
            </div>

            {/* ── MOBILE RIGHT ── */}
            <div className="lg:hidden flex items-center gap-2">
              {/* theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/6 hover:bg-orange-100 dark:hover:bg-orange-500/15 flex items-center justify-center transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light'
                  ? <MoonIcon className="w-4 h-4 text-gray-600" />
                  : <SunIcon className="w-4 h-4 text-orange-400" />}
              </button>

              {/* hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(o => !o)}
                className={`w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/6 flex flex-col items-center justify-center gap-[5px] transition-colors duration-300 hover:bg-orange-100 dark:hover:bg-orange-500/15 ${mobileMenuOpen ? 'ham-open' : ''}`}
                aria-label="Toggle menu"
              >
                <span className="ham-line ham-top  block w-5 h-[2px] bg-gray-700 dark:bg-gray-200 rounded-full" />
                <span className="ham-line ham-mid  block w-5 h-[2px] bg-gray-700 dark:bg-gray-200 rounded-full" />
                <span className="ham-line ham-bot  block w-3.5 h-[2px] bg-orange-500 rounded-full" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="backdrop-anim fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div className="drawer-anim fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] bg-white dark:bg-[#080c18] lg:hidden flex flex-col"
            style={{ boxShadow: '-24px 0 80px rgba(0,0,0,0.18)' }}>

            {/* drawer top bar */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-white/5 shrink-0">
              <div className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.1em] text-gray-900 dark:text-white">
                  MENU
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.3em] text-orange-500 uppercase">
                  Navigate
                </span>
              </div>

              {/* close button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/6 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-500/15 transition-colors duration-300"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* nav links — scrollable */}
            <div className="flex-1 overflow-y-auto">
              <Navigation mobile onItemClick={() => setMobileMenuOpen(false)} />
            </div>

            {/* drawer footer */}
            <div className="shrink-0 px-6 pb-8 pt-4 border-t border-gray-100 dark:border-white/5 space-y-3">
              {/* CTA */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden flex items-center justify-center gap-2 w-full bg-orange-500 text-white font-[family-name:var(--font-display)] tracking-[0.12em] text-lg py-3.5 rounded-2xl transition-all duration-300 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/30"
              >
                <span className="relative z-10">GET IN TOUCH</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </Link>

              {/* social / meta strip */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-400 dark:text-gray-600 tracking-widest uppercase">
                  Sri Lanka 🇱🇰
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-green-600 dark:text-green-400 tracking-wider">
                    Available
                  </span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </>
  );
}