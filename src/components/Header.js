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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes drawerIn  { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }
        @keyframes backdropIn{ from { opacity:0; } to { opacity:1; } }
        .header-anim   { animation: slideDown .5s cubic-bezier(.16,1,.3,1) both; }
        .drawer-anim   { animation: drawerIn  .4s cubic-bezier(.16,1,.3,1) both; }
        .backdrop-anim { animation: backdropIn .3s ease both; }

        /* hamburger morphs */
        .ham-line { transition: transform .35s cubic-bezier(.16,1,.3,1), opacity .2s; transform-origin: center; }
        .ham-open .ham-top { transform: translateY(7px) rotate(45deg); }
        .ham-open .ham-mid { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-bot { transform: translateY(-7px) rotate(-45deg); }

        /* pill navbar */
        .nav-pill {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
        }
        .nav-pill.scrolled {
          top: 12px;
        }
        .nav-pill-inner {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 9999px;
          border: 1px solid rgba(200,161,53,0.18);
          box-shadow: 0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
          padding: 8px 8px 8px 24px;
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
        }
        .nav-pill.scrolled .nav-pill-inner {
          box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.96);
        }

        .nav-pill-link {
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          text-decoration: none;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .nav-pill-link:hover {
          color: #1a1a1a;
          background: rgba(200,161,53,0.08);
        }
        .nav-pill-link.active {
          color: #1a1a1a;
          background: rgba(200,161,53,0.1);
        }
        .nav-pill-cta {
          background: #c8a135;
          color: white;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 9999px;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.25s;
          white-space: nowrap;
          margin-left: 8px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .nav-pill-cta:hover {
          background: #f5c518;
          transform: scale(1.03);
          box-shadow: 0 6px 20px rgba(200,161,53,0.35);
        }
        .nav-pill-logo {
          font-weight: 700;
          font-size: 15px;
          color: #1a1a1a;
          text-decoration: none;
          margin-right: 4px;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: var(--font-display);
          font-size: 18px;
          letter-spacing: 0.06em;
        }
        .logo-accent { color: #c8a135; }
        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(200,161,53,0.2);
          margin: 0 8px;
        }
        .nav-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #777;
          transition: all 0.2s;
          margin-left: 4px;
        }
        .nav-icon-btn:hover {
          background: rgba(200,161,53,0.1);
          color: #c8a135;
        }

        /* Social icon links */
        .nav-social {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          text-decoration: none;
          transition: all 0.25s;
          font-size: 12px;
          font-weight: 700;
        }
        .nav-social:hover {
          background: rgba(200,161,53,0.1);
          color: #c8a135;
        }
      `}</style>

      {/* ── PILL NAVBAR ── */}
      <nav className={`nav-pill header-anim ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-pill-inner">

          {/* Logo */}
          <Link href="/" className="nav-pill-logo">
            <span className="logo-accent">M</span>·<span className="logo-accent">D</span>
          </Link>

          {/* divider */}
          <div className="nav-divider" />

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/projects', label: 'Portfolio' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="nav-pill-link">
                {label}
              </Link>
            ))}
          </div>

          {/* Right: socials + theme + CTA */}
          <div className="hidden lg:flex items-center ml-2">
            {/* Social icons */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="nav-social" title="LinkedIn">
              in
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-social" title="GitHub">
              gh
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="nav-icon-btn"
              aria-label="Toggle theme"
            >
              {theme === 'light'
                ? <MoonIcon className="w-4 h-4" />
                : <SunIcon className="w-4 h-4" style={{ color: '#f5c518' }} />}
            </button>

            {/* CTA */}
            <Link href="/contact" className="nav-pill-cta">
              Hire Me
            </Link>
          </div>

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-1 ml-2">
            <button onClick={toggleTheme} className="nav-icon-btn" aria-label="Toggle theme">
              {theme === 'light'
                ? <MoonIcon className="w-4 h-4" />
                : <SunIcon className="w-4 h-4" style={{ color: '#f5c518' }} />}
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className={`nav-icon-btn ${mobileMenuOpen ? 'ham-open' : ''}`}
              aria-label="Toggle menu"
              style={{ width: 40, height: 40 }}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <span className="ham-line ham-top block w-5 h-[2px] rounded-full" style={{ background: '#555' }} />
                <span className="ham-line ham-mid block w-5 h-[2px] rounded-full" style={{ background: '#555' }} />
                <span className="ham-line ham-bot block w-3.5 h-[2px] rounded-full" style={{ background: '#c8a135' }} />
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="backdrop-anim fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="drawer-anim fixed top-0 right-0 bottom-0 z-50 w-full max-w-[300px] lg:hidden flex flex-col"
            style={{ background: '#FDFAF5', boxShadow: '-20px 0 60px rgba(0,0,0,0.12)' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(200,161,53,0.15)' }}>
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.08em]" style={{ color: '#1a1a1a' }}>
                <span style={{ color: '#c8a135' }}>M</span>·<span style={{ color: '#c8a135' }}>D</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="nav-icon-btn"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Portfolio' },
                { href: '/about', label: 'About' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl font-bold text-base transition-all duration-200 hover:bg-amber-50"
                  style={{ color: '#333', borderBottom: '1px solid rgba(200,161,53,0.08)' }}
                >
                  {label}
                  <span style={{ color: '#c8a135', fontSize: 18 }}>→</span>
                </Link>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="px-6 pb-8 pt-4 space-y-3" style={{ borderTop: '1px solid rgba(200,161,53,0.15)' }}>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300"
                style={{ background: '#c8a135' }}
              >
                Get In Touch
              </Link>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#aaa' }}>Sri Lanka 🇱🇰</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold" style={{ color: '#22c55e' }}>Available</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}