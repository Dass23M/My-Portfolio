'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setEmail('');
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/methmal',
      hoverColor: '#ffffff',
      hoverBorder: 'rgba(255,255,255,0.3)',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/methmal',
      hoverColor: '#60a5fa',
      hoverBorder: 'rgba(59,130,246,0.4)',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/methmal',
      hoverColor: '#38bdf8',
      hoverBorder: 'rgba(14,165,233,0.4)',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/methmal',
      hoverColor: '#f472b6',
      hoverBorder: 'rgba(236,72,153,0.4)',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 4.814.107 4.086.277 3.45.525a7.017 7.017 0 00-2.188 1.238A7.017 7.017 0 00.525 3.45C.277 4.086.107 4.814.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.047 1.063.217 1.791.465 2.427a7.017 7.017 0 001.238 2.188 7.017 7.017 0 002.188 1.238c.636.248 1.364.418 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.063-.047 1.791-.217 2.427-.465a7.017 7.017 0 002.188-1.238 7.017 7.017 0 001.238-2.188c.248-.636.418-1.364.465-2.427C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123c-.047-1.063-.217-1.791-.465-2.427a7.017 7.017 0 00-1.238-2.188A7.017 7.017 0 0016.05.525C15.414.277 14.686.107 13.623.06 12.556.012 12.216 0 10 0zm0 1.802c2.67 0 2.987.01 4.041.059.975.045 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.883.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858a3.097 3.097 0 01-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.883.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344a3.097 3.097 0 01-1.15-.748 3.097 3.097 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344C7.014 1.812 7.33 1.802 10 1.802zM10 5.865a4.135 4.135 0 100 8.27 4.135 4.135 0 000-8.27zm0 6.468a2.333 2.333 0 110-4.666 2.333 2.333 0 010 4.666zm5.338-7.87a.966.966 0 11-1.932 0 .966.966 0 011.932 0z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { name: 'Home',     href: '/',         num: '01' },
    { name: 'About',    href: '/about',    num: '02' },
    { name: 'Services', href: '/services', num: '03' },
    { name: 'Projects', href: '/projects', num: '04' },
    { name: 'Blog',     href: '/blog',     num: '05' },
    { name: 'Contact',  href: '/contact',  num: '06' },
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'API Development',
    'Cloud Solutions',
  ];

  return (
    <>
      <style>{`
        @keyframes footerShimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        .footer-name {
          background: linear-gradient(90deg, #f97316 0%, #fb923c 30%, #fde68a 55%, #fb923c 70%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: footerShimmer 3.5s linear infinite;
        }
        .social-btn {
          transition: color .25s, border-color .25s, transform .25s, box-shadow .25s;
        }
        .social-btn:hover {
          transform: translateY(-3px) scale(1.08);
        }
        .footer-link-line {
          transition: width .3s cubic-bezier(.16,1,.3,1);
          width: 0;
        }
        .footer-link:hover .footer-link-line { width: 100%; }
        .footer-link:hover span { transform: translateX(4px); }
        .footer-link span { transition: transform .25s; }
      `}</style>

      <footer className="bg-[#06080f] text-white relative overflow-hidden border-t border-white/5">

        {/* ── ambient glows ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 left-1/4 w-[600px] h-[300px] rounded-full bg-orange-500/6 blur-3xl" />
          <div className="absolute -top-10 right-1/4 w-[400px] h-[200px] rounded-full bg-orange-600/4 blur-2xl" />
          <div className="absolute top-1/2 left-0 w-[200px] h-[200px] rounded-full bg-orange-500/3 blur-2xl" />
        </div>

        {/* ── top accent line ── */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.6) 30%, rgba(249,115,22,0.9) 50%, rgba(249,115,22,0.6) 70%, transparent 100%)' }} />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">

          {/* ══════════════════════════════════════
                BIG DISPLAY CTA
          ══════════════════════════════════════ */}
          <div className="py-14 lg:py-20 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-white/5">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.3em] text-orange-500 uppercase mb-2">
                Open to opportunities
              </p>
              <h2 className="font-[family-name:var(--font-display)] leading-none tracking-wide" style={{ fontSize: 'clamp(2.8rem,6vw,6rem)' }}>
                LET'S BUILD<br />
                <span className="footer-name">SOMETHING</span><br />
                GREAT TOGETHER.
              </h2>
            </div>
            <Link
              href="/contact"
              className="group relative shrink-0 overflow-hidden inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-[family-name:var(--font-display)] tracking-[0.12em] text-xl px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105"
            >
              <span className="relative z-10">START A PROJECT</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                →
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            </Link>
          </div>

          {/* ══════════════════════════════════════
                MAIN 4-COL GRID
          ══════════════════════════════════════ */}
          <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-white/5">

            {/* ── Brand col ── */}
            <div className="sm:col-span-2 lg:col-span-1">
              {/* logo */}
              <Link href="/" className="group inline-flex items-center gap-3 mb-6">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] text-white text-2xl leading-none tracking-wider">M</span>
                  </div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-all duration-300" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.08em] text-white group-hover:text-orange-400 transition-colors duration-300">
                    METHMAL
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.3em] text-orange-500 uppercase mt-0.5">
                    Full-Stack Dev
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-[260px]">
                Crafting exceptional digital experiences through clean code and innovative design.
              </p>

              {/* contact rows */}
              <div className="space-y-3">
                {[
                  { Icon: EnvelopeIcon, text: 'dasunmethmal23@gmail.com', href: 'mailto:dasunmethmal23@gmail.com' },
                  { Icon: PhoneIcon,    text: '+94 72 155 1878',          href: 'tel:+94721551878' },
                  { Icon: MapPinIcon,   text: 'Colombo, Sri Lanka 🇱🇰',   href: null },
                ].map(({ Icon, text, href }) => {
                  const inner = (
                    <div className="flex items-center gap-3 text-gray-500 hover:text-gray-300 transition-colors duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-200">
                        <Icon className="h-3.5 w-3.5 text-orange-400" />
                      </div>
                      <span className="text-sm">{text}</span>
                    </div>
                  );
                  return href
                    ? <a key={text} href={href}>{inner}</a>
                    : <div key={text}>{inner}</div>;
                })}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <div className="flex items-center gap-2 mb-7">
                <div className="w-4 h-px bg-orange-500" />
                <h3 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-orange-500">
                  Navigate
                </h3>
              </div>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link group flex items-center gap-3 py-1.5">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-600 group-hover:text-orange-500 transition-colors duration-200 w-5 shrink-0">
                        {link.num}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.08em] text-gray-400 group-hover:text-white transition-colors duration-200 leading-tight">
                          {link.name.toUpperCase()}
                        </span>
                        <div className="footer-link-line h-px bg-orange-500 mt-0.5" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ── */}
            <div>
              <div className="flex items-center gap-2 mb-7">
                <div className="w-4 h-px bg-orange-500" />
                <h3 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-orange-500">
                  Services
                </h3>
              </div>
              <ul className="space-y-3">
                {services.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 group cursor-default">
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-gray-700 group-hover:text-orange-500 transition-colors duration-200 w-5 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-200">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>

              {/* availability pill */}
              <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-green-400 tracking-wider uppercase">
                  Available for work
                </span>
              </div>
            </div>

            {/* ── Newsletter ── */}
            <div>
              <div className="flex items-center gap-2 mb-7">
                <div className="w-4 h-px bg-orange-500" />
                <h3 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-orange-500">
                  Stay Updated
                </h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Get the latest updates on my projects and tech insights.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/8 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 transition-all duration-300 font-[family-name:var(--font-mono)]"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white px-4 py-3 rounded-xl font-[family-name:var(--font-display)] tracking-[0.12em] text-base transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {subscribed ? '✓ SUBSCRIBED!' : 'SUBSCRIBE'}
                </button>
              </form>

              {/* social icons */}
              <div className="mt-7">
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-gray-600 mb-4">
                  Find me on
                </p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map(({ name, href, icon: Icon, hoverColor, hoverBorder }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="social-btn w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-500"
                      style={{ '--hover-color': hoverColor, '--hover-border': hoverBorder }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = hoverColor;
                        e.currentTarget.style.borderColor = hoverBorder;
                        e.currentTarget.style.boxShadow = `0 4px 20px ${hoverBorder}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
                BOTTOM BAR
          ══════════════════════════════════════ */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm">
                © {currentYear}{' '}
                <span className="font-[family-name:var(--font-display)] tracking-wider text-orange-500">
                  METHMAL
                </span>
                {'. '}All rights reserved.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-gray-700 text-[10px] mt-0.5 tracking-wider">
                Built with ♥ using Next.js & Tailwind CSS
              </p>
            </div>

            {/* back to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] hover:border-orange-500/40 hover:bg-orange-500/8 transition-all duration-300"
            >
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-orange-400 transition-colors duration-300">
                Back to top
              </span>
              <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center group-hover:bg-orange-400 transition-colors duration-300 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpIcon className="h-3 w-3 text-white" />
              </div>
            </button>

          </div>
        </div>
      </footer>
    </>
  );
}

