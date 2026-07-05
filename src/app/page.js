'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { CarvedDefs, CarvedSpiral, CarvedDivider } from '../components/CarvedMotifs';
import Magnetic from '../components/Magnetic';

/* ─────────────────────────────────────────
   GSAP registration (client-side only)
───────────────────────────────────────── */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const n = parseInt(target, 10);
        if (prefersReducedMotion()) { setCount(n); return; }
        const step = Math.max(1, Math.ceil(n / 60));
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, n);
          setCount(cur);
          if (cur >= n) clearInterval(t);
        }, 25);
      }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────
   GOLD 3-D SHAPE
───────────────────────────────────────── */
function GShape({ type = 'sphere', size = 100, style = {}, className = '' }) {
  const base = {
    position: 'absolute',
    width: size,
    height: type === 'capsule' ? size * 2.8 : size,
    willChange: 'transform',
    ...style,
  };
  if (type === 'sphere') return (
    <div className={className} style={{
      ...base, borderRadius: '50%',
      background: 'radial-gradient(circle at 33% 33%, #f5c842, #c8a135 55%, #7a5c10)',
      boxShadow: '0 20px 60px rgba(200,161,53,.4), inset 0 -10px 25px rgba(0,0,0,.25)'
    }} />
  );
  if (type === 'hex') return (
    <div className={className} style={{
      ...base, height: size,
      background: 'linear-gradient(135deg,#f5c842,#c8a135 50%,#8a6b0c)',
      clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)'
    }} />
  );
  if (type === 'capsule') return (
    <div className={className} style={{
      ...base, borderRadius: 9999,
      background: 'linear-gradient(135deg,#f5c842,#c8a135 60%,#7a5c10)',
      boxShadow: '0 10px 40px rgba(200,161,53,.3)'
    }} />
  );
  if (type === 'ring') return (
    <div className={className} style={{
      ...base, height: size, borderRadius: '50%',
      border: `${Math.max(8, size * 0.14)}px solid #c8a135`,
      boxShadow: '0 10px 35px rgba(200,161,53,.35)'
    }} />
  );
  if (type === 'dot') return (
    <div className={className} style={{ ...base, height: size, borderRadius: '50%', background: '#f5c842' }} />
  );
  return null;
}

/* ─────────────────────────────────────────
   REVIEWS  (infinite GSAP marquee)
───────────────────────────────────────── */
function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionEl = useRef(null);
  const trackEl = useRef(null);
  const wrapEl = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/reviews`);
        const d = await r.json();
        setReviews((d.data || []).filter(x => x.isPublished));
      } catch { }
      setLoading(false);
    })();
  }, []);

  /* infinite marquee */
  useEffect(() => {
    if (loading || !reviews.length || !trackEl.current) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const el = trackEl.current;
      const tween = gsap.to(el, { xPercent: -50, duration: reviews.length * 7, ease: 'none', repeat: -1 });
      el.addEventListener('mouseenter', () => tween.pause());
      el.addEventListener('mouseleave', () => tween.play());
    }, wrapEl);
    return () => ctx.revert();
  }, [loading, reviews]);

  /* scroll reveal */
  useEffect(() => {
    if (!sectionEl.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-rev="reviews"]', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionEl.current, start: 'top 82%' },
      });
    }, sectionEl);
    return () => ctx.revert();
  }, []);

  if (!loading && !reviews.length) return null;

  return (
    <section ref={sectionEl} style={{ background: '#F5F0E8', padding: 'clamp(80px,10vw,140px) 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 clamp(24px,5vw,80px)' }}>
        <div data-rev="reviews" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="s-label">Client Feedback</span>
          <h2 className="s-display" style={{ color: '#2c2c2c', fontSize: 'clamp(2.8rem,6vw,7rem)' }}>WHAT THEY SAY</h2>
        </div>
      </div>

      <div ref={wrapEl} style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
      }}>
        {loading ? (
          <div style={{ display: 'flex', gap: 24, padding: '0 40px' }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 340, height: 180, borderRadius: 16, background: 'rgba(0,0,0,.06)', flexShrink: 0 }} />)}
          </div>
        ) : (
          <div ref={trackEl} style={{ display: 'inline-flex', gap: 24, willChange: 'transform' }}>
            {[...reviews, ...reviews].map((r, i) => (
              <div key={`${r._id}-${i}`} style={{
                width: 360, flexShrink: 0, borderRadius: 20, padding: '28px 28px 24px',
                background: 'white', border: '1px solid rgba(200,161,53,.12)',
                boxShadow: '0 4px 24px rgba(0,0,0,.05)',
                transition: 'transform .3s', cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                  {[...Array(5)].map((_, k) => (
                    <svg key={k} width={16} height={16} viewBox="0 0 20 20" fill={k < r.rating ? '#c8a135' : '#e5e7eb'}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>&ldquo;{r.comment}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', position: 'relative',
                    background: 'rgba(200,161,53,.12)', color: '#c8a135', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                  }}>
                    {r.image && !r.image.includes('placeholder') ? <Image src={r.image} alt={r.name} fill sizes="40px" style={{ objectFit: 'cover' }} /> : r.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: '#999' }}>{r.role}{r.company ? ` · ${r.company}` : ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FEATURED PROJECTS
───────────────────────────────────────── */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionEl = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const r = await fetch(`${base}/api/projects?featured=true`);
        const d = await r.json();
        let list = d.data || [];
        if (list.length < 3) {
          const r2 = await fetch(`${base}/api/projects`);
          const d2 = await r2.json();
          const ids = new Set(list.map(p => p._id));
          list = [...list, ...(d2.data || []).filter(p => !ids.has(p._id))].slice(0, 3);
        } else { list = list.slice(0, 3); }
        setProjects(list);
      } catch { }
      setLoading(false);
    })();
  }, []);

  /* scroll reveals */
  useEffect(() => {
    if (loading || !sectionEl.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-rev="proj-head"]', {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-rev="proj-head"]', start: 'top 86%' },
      });
      gsap.utils.toArray('[data-rev="proj-card"]').forEach((el, i) => {
        gsap.from(el, {
          y: 80, opacity: 0, duration: 0.85, delay: i * 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, sectionEl);
    return () => ctx.revert();
  }, [loading]);

  return (
    <section ref={sectionEl} style={{ background: 'white', padding: 'clamp(80px,10vw,140px) 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 clamp(24px,5vw,80px)' }}>
        <div data-rev="proj-head" style={{ marginBottom: 56 }}>
          <span className="s-label">Portfolio</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <h2 className="s-display" style={{ fontSize: 'clamp(2.8rem,6vw,7rem)', lineHeight: 1 }}>
              SELECTED<br /><span style={{ color: '#c8a135' }}>WORKS</span>
            </h2>
            <p style={{ maxWidth: 280, fontSize: 15, lineHeight: 1.7, color: '#777' }}>A curated selection of my recent full-stack development work.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {loading ? [...Array(3)].map((_, i) => (
            <div key={i} style={{ height: 160, borderRadius: 20, background: '#F5F0E8', animation: 'pulse 1.5s ease infinite' }} />
          )) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
              <p style={{ fontSize: 18, fontWeight: 600 }}>Projects coming soon!</p>
            </div>
          ) : projects.map((p, i) => (
            <div key={p._id} data-rev="proj-card"
              style={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '24px 40px', alignItems: 'center',
                background: i % 2 === 0 ? '#F5F0E8' : 'white', border: '1px solid rgba(200,161,53,.1)',
                borderRadius: 20, padding: '28px 32px', cursor: 'pointer',
                transition: 'transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>

              {/* Image */}
              <div style={{ position: 'relative', width: 260, height: 156, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                {p.image && !p.image.includes('placeholder')
                  ? <Image src={p.image} alt={p.title} fill sizes="260px" style={{ objectFit: 'cover', transition: 'transform .6s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; }} />
                  : <div style={{ width: '100%', height: '100%', background: 'rgba(200,161,53,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🚀</div>}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  {(p.technologies || []).slice(0, 4).map(t => (
                    <span key={t} style={{
                      fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 9999,
                      background: 'rgba(200,161,53,.1)', color: '#c8a135', border: '1px solid rgba(200,161,53,.2)'
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,2vw,1.9rem)', color: '#1a1a1a',
                  marginBottom: 10, transition: 'color .3s'
                }}>{p.title}</h3>
                <p style={{
                  fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 16, display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>{p.description}</p>
                <Link href="/projects" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14,
                  fontWeight: 700, color: '#c8a135', textDecoration: 'none', transition: 'gap .3s'
                }}>
                  View Project <ArrowRightIcon style={{ width: 16, height: 16 }} />
                </Link>
              </div>

              {/* Big number */}
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,6vw,7rem)',
                color: 'rgba(200,161,53,.07)', userSelect: 'none', flexShrink: 0
              }}>0{i + 1}</div>
            </div>
          ))}
        </div>

        {/* All projects button */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <Magnetic strength={0.25}>
            <Link href="/projects" className="btn-dark">View All Projects <ArrowRightIcon style={{ width: 16, height: 16 }} /></Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════
   MAIN PAGE
═════════════════════════════════════════════ */
export default function Home() {
  const pageEl = useRef(null);
  const heroEl = useRef(null);
  const [ready, setReady] = useState(false);

  const stats = [
    { n: '12', s: '+', label: 'Projects Done' },
    { n: '3', s: '+', label: 'Years Exp.' },
    { n: '10', s: '+', label: 'Happy Clients' },
    { n: '100', s: '%', label: 'Success Rate' },
  ];

  const services = [
    { icon: '⚡', num: '01', title: 'Full-Stack\nWeb Apps', desc: 'End-to-end web applications built for performance, scale, and maintainability.' },
    { icon: '🎨', num: '02', title: 'UI / UX\nDesign', desc: 'Clean, intuitive interfaces that delight users and drive conversions.' },
    { icon: '🔧', num: '03', title: 'API &\nBackend', desc: 'Robust REST & GraphQL APIs, microservices, and cloud-native architectures.' },
    { icon: '📱', num: '04', title: 'Mobile\nReady', desc: 'Responsive progressive web experiences that work flawlessly on every device.' },
  ];

  useEffect(() => { setReady(true); }, []);

  /* ───────────────────────────────────────
     MASTER GSAP TIMELINE
  ─────────────────────────────────────── */
  useEffect(() => {
    if (!ready || typeof window === 'undefined') return;
    if (prefersReducedMotion()) return; // static, fully visible, no motion

    const ctx = gsap.context(() => {

      /* ── Hero intro — staggered entrance ── */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.h-badge', { y: 28, opacity: 0, duration: 0.7 }, 0.15)
        .from('.h-stat', { y: 36, opacity: 0, duration: 0.65, stagger: 0.09 }, 0.35)
        .from('.h-name-1', { y: 110, opacity: 0, duration: 1.0 }, 0.45)
        .from('.h-name-2', { y: 110, opacity: 0, duration: 1.0 }, 0.6)
        .from('.h-subtitle', { y: 30, opacity: 0, duration: 0.7 }, 0.8)
        .from('.h-btn', { y: 22, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.95)
        .from('.h-photo', { scale: 1.08, opacity: 0, duration: 1.3, ease: 'power2.out' }, 0.1)
        .from('.h-spiral', { scale: 0.85, opacity: 0, duration: 1.3, ease: 'power2.out' }, 0.3)
        .from('.h-scroll', { opacity: 0, duration: 0.8 }, 1.5);

      /* ── Hero parallax on scroll (scrub = moves with finger) ──
         Layered by depth: the carved spiral watermark is the
         "heaviest" (slowest, furthest back), then the photo drifts
         gently, then the stat/name text — that counter-drift is
         what sells the sense of real depth. */
      gsap.to('.h-spiral', {
        yPercent: 10, rotation: 6, ease: 'none',
        scrollTrigger: { trigger: heroEl.current, start: 'top top', end: 'bottom top', scrub: 2.4 },
      });
      gsap.to('.h-name-wrap', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: heroEl.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.h-stat-wrap', {
        yPercent: 12, opacity: 0.3, ease: 'none',
        scrollTrigger: { trigger: heroEl.current, start: 'top top', end: 'bottom top', scrub: 1.8 },
      });
      /* ── Photo parallax — drifts slower than the page for depth ── */
      gsap.to('.h-photo', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: heroEl.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });

      /* ── Floating shapes — each at a different parallax speed ── */
      document.querySelectorAll('.f-shape').forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const dist = 40 + i * 18;
        gsap.to(el, {
          y: dir * dist,
          rotation: dir * (8 + i * 4),
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8 + i * 0.25,
          },
        });
      });

      /* ── Marquee strip scale reveal ── */
      gsap.from('.mq-strip', {
        scaleX: 0, opacity: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.mq-strip', start: 'top 96%' },
      });

      /* ── Carved seam dividers — reveal like a chisel stroke ── */
      gsap.utils.toArray('.carved-seam').forEach((el) => {
        gsap.from(el, {
          scaleX: 0, opacity: 0, transformOrigin: 'center', duration: 1.0, ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });

      /* ── Big text section — lines rise up with a touch of scale ── */
      gsap.utils.toArray('.big-line').forEach((el) => {
        gsap.from(el, {
          y: 90, opacity: 0, scale: 0.97, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      /* ── Big-text section shapes parallax ── */
      document.querySelectorAll('.bt-shape').forEach((el, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(el, {
          y: dir * 80, rotation: dir * 18, ease: 'none',
          scrollTrigger: { trigger: '.big-text-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });
      gsap.to('.bt-spiral', {
        y: -70, rotation: -14, ease: 'none',
        scrollTrigger: { trigger: '.big-text-section', start: 'top bottom', end: 'bottom top', scrub: 2.6 },
      });

      /* ── Services section ── */
      gsap.from('.svc-head', {
        y: 55, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-head', start: 'top 85%' },
      });
      gsap.utils.toArray('.svc-card').forEach((el, i) => {
        gsap.from(el, {
          y: 65, opacity: 0, scale: 0.93, duration: 0.75, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });

      /* ── CTA section ── */
      gsap.from('.cta-inner', {
        y: 60, opacity: 0, scale: 0.94, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-section', start: 'top 78%' },
      });
      document.querySelectorAll('.cta-shape').forEach((el, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(el, {
          y: dir * 45, ease: 'none',
          scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 2 },
        });
      });

    }, pageEl);

    return () => ctx.revert();
  }, [ready]);

  return (
    <>
      {/* Shared defs for every carved-relief motif on this page — render once. */}
      <CarvedDefs />

      {/* ── Global styles ── */}
      <style>{`
        /* ── Gold shimmer text ── */
        @keyframes gShimmer {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:100% 50%; }
        }
        .gold-text {
          background: linear-gradient(90deg,#c8a135,#f5c842,#e5b94b,#c8a135);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gShimmer 4s ease infinite;
        }

        /* ── Pulse for loading skeleton ── */
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }

        /* ── Infinite marquee ── */
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-track { animation: mq 30s linear infinite; display: inline-flex; }

        /* ── Shared label ── */
        .s-label {
          display: block;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .2em; color: #c8a135; margin-bottom: 14px;
        }
        .s-display {
          font-family: var(--font-display);
          color: #1a1a1a; letter-spacing: .01em; line-height: .95;
        }

        /* ── Buttons ── */
        .btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          background: #c8a135; color: #fff; font-weight: 700;
          border-radius: 9999px; text-decoration: none;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, background .25s;
        }
        .btn-gold:hover { background:#f5c842; transform:translateY(-2px); box-shadow:0 12px 30px rgba(200,161,53,.38); }

        .btn-dark {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1a1a1a; color: #fff; font-weight: 700;
          border-radius: 9999px; text-decoration: none;
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, background .25s;
        }
        .btn-dark:hover { background:#2a2a2a; transform:translateY(-2px); box-shadow:0 12px 30px rgba(0,0,0,.22); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,.85); font-weight: 700;
          border: 1px solid rgba(255,255,255,.28); border-radius: 9999px;
          text-decoration: none;
          transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .25s, color .25s, background .25s;
        }
        .btn-outline:hover { color:#1a1a1a; background:#fff; border-color:#fff; transform:translateY(-2px); }

        /* ── Scroll-indicator bounce ── */
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        .bounce { animation: bounce 2s ease-in-out infinite; }

        /* ── Focus visibility (quality floor) ── */
        a:focus-visible, button:focus-visible { outline: 2px solid #c8a135; outline-offset: 3px; border-radius: 6px; }

        @media (prefers-reduced-motion: reduce) {
          .gold-text, .mq-track, .bounce { animation: none !important; }
        }
      `}</style>

      <div ref={pageEl} style={{ background: '#F5F0E8', overflowX: 'hidden' }}>

        {/* ═══════════════════════════════════════
            § 1  HERO  — full-bleed portrait, warm gold gradient
        ═══════════════════════════════════════ */}
        <section ref={heroEl} style={{
          position: 'relative', minHeight: '100vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          paddingTop: 'clamp(72px,10vw,100px)',
          background: 'linear-gradient(120deg, #15100a 0%, #3d2b0d 22%, #8a6b16 50%, #c8a135 74%, #ecc456 100%)',
        }}>
          {/* Full-bleed portrait, right side, fading left into the gradient */}
          <div className="h-photo" style={{
            position: 'absolute', inset: 0, zIndex: 0,
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 28%, black 60%)',
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 28%, black 60%)',
          }}>
            <Image
              src="/avatar.jpg"
              alt="Dasun Methmal"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              priority
            />
            {/* warm duotone wash so the photo sits inside the gold palette */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(21,16,10,.1) 0%, rgba(21,16,10,.6) 88%), linear-gradient(120deg, rgba(200,161,53,.28), rgba(236,196,86,.05))'
            }} />
          </div>

          {/* Carved signature spiral — subtle, tucked upper-left, away from the portrait */}
          <CarvedSpiral
            className="h-spiral"
            size={420}
            variant="large"
            style={{ position: 'absolute', top: '0%', left: '-10%', opacity: 0.12, pointerEvents: 'none', zIndex: 1 }}
          />

          {/* A couple of quiet floating accents over the gradient side only */}
          <GShape className="f-shape" type="dot" size={16} style={{ top: '16%', left: '40%', opacity: .5, zIndex: 1 }} />
          <GShape className="f-shape" type="ring" size={52} style={{ bottom: '22%', left: '32%', opacity: .3, zIndex: 1 }} />
          <GShape className="f-shape" type="capsule" size={26} style={{ top: '8%', left: '4%', transform: 'rotate(-20deg)', opacity: .3, zIndex: 1 }} />

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '40px clamp(24px,6vw,90px)', maxWidth: 920,
          }}>

            {/* Badge + role */}
            <div className="h-badge" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 30 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 9999,
                background: 'rgba(255,255,255,.08)', border: '1px solid rgba(245,200,66,.4)', color: '#f5c842',
                fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', backdropFilter: 'blur(4px)'
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s ease infinite' }} />
                Available for Work
              </span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,.75)' }}>Full-Stack Developer · Sri Lanka 🇱🇰</span>
            </div>

            {/* Stats */}
            <div className="h-stat-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 44px', marginBottom: 36 }}>
              {stats.map(s => (
                <div key={s.label} className="h-stat" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1, color: '#f5c842' }}>
                    <Counter target={s.n} suffix={s.s} />
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.16em', color: 'rgba(255,255,255,.62)', marginTop: 4 }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Big name */}
            <div className="h-name-wrap" style={{ marginBottom: 22 }}>
              <h1 style={{
                fontFamily: 'var(--font-display)', lineHeight: .92, letterSpacing: '-.02em', userSelect: 'none',
                fontSize: 'clamp(3.2rem,9vw,8.5rem)', margin: 0
              }}>
                <span className="h-name-1" style={{ display: 'block', color: '#fff' }}>DASUN</span>
                <span className="h-name-2" style={{ display: 'block', color: '#f5c842' }}>METHMAL</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="h-subtitle" style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,2.2vw,1.7rem)',
              color: 'rgba(255,255,255,.82)', letterSpacing: '.03em', margin: '0 0 34px'
            }}>
              Freelance Developer <span style={{ color: '#f5c842' }}>|</span> Designer
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Magnetic className="h-btn" strength={0.3}>
                <Link href="/projects" className="btn-gold" style={{ padding: '14px 30px', fontSize: 14 }}>
                  View My Work <ArrowRightIcon style={{ width: 16, height: 16 }} />
                </Link>
              </Magnetic>
              <Magnetic className="h-btn" strength={0.3}>
                <Link href="/contact" className="btn-outline" style={{ padding: '14px 30px', fontSize: 14 }}>
                  <EnvelopeIcon style={{ width: 16, height: 16 }} /> Hire Me
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="h-scroll bounce" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', paddingBottom: 32, opacity: .55 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.2em', color: 'rgba(255,255,255,.7)' }}>Scroll</span>
              <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, transparent, #f5c842)' }} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            § 2  TECH MARQUEE STRIP
        ═══════════════════════════════════════ */}
        <div className="mq-strip" style={{ background: '#1a1a1a', padding: '18px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div className="mq-track">
            {['React', '·', 'Next.js', '·', 'Node.js', '·', 'TypeScript', '·', 'MongoDB', '·', 'PostgreSQL', '·', 'AWS', '·', 'Docker', '·',
              'Python', '·', 'FastAPI', '·', 'Redis', '·', 'Prisma', '·', 'Figma', '·', 'Tailwind', '·',
              'React', '·', 'Next.js', '·', 'Node.js', '·', 'TypeScript', '·', 'MongoDB', '·', 'PostgreSQL', '·', 'AWS', '·', 'Docker', '·',
              'Python', '·', 'FastAPI', '·', 'Redis', '·', 'Prisma', '·', 'Figma', '·', 'Tailwind', '·',
            ].map((t, i) => (
              <span key={i} style={{
                display: 'inline-block', padding: '0 16px', fontSize: 13, fontFamily: 'var(--font-display)',
                fontWeight: 700, letterSpacing: '.08em',
                color: t === '·' ? '#c8a135' : 'rgba(255,255,255,.65)'
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Carved seam — marks the shift from the marquee band into the
            editorial statement section below */}
        <div className="carved-seam" style={{ background: '#F5F0E8', padding: '10px 0' }}>
          <CarvedDivider height={28} />
        </div>

        {/* ═══════════════════════════════════════
            § 3  BIG TEXT STATEMENT
        ═══════════════════════════════════════ */}
        <section className="big-text-section" style={{
          position: 'relative', overflow: 'hidden', background: '#F5F0E8',
          padding: 'clamp(72px,9vw,130px) clamp(24px,5vw,80px)'
        }}>
          {/* Parallax shapes */}
          <GShape className="bt-shape" type="sphere" size={160} style={{ bottom: -40, left: -30, opacity: .65 }} />
          <GShape className="bt-shape" type="capsule" size={55} style={{ top: '6%', right: '3%', transform: 'rotate(22deg)', opacity: .45 }} />
          <GShape className="bt-shape" type="ring" size={70} style={{ top: '38%', right: '13%', opacity: .5 }} />
          <GShape className="bt-shape" type="hex" size={56} style={{ bottom: '20%', right: '23%', opacity: .4 }} />
          <GShape className="bt-shape" type="dot" size={20} style={{ top: '20%', left: '30%', opacity: .55 }} />
          <CarvedSpiral className="bt-spiral" size={200} variant="small" flip
            style={{ position: 'absolute', top: '12%', left: '2%', opacity: 0.14, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {['Building sleek', 'digital products.', ''].map((text, i) => (
              <div key={i} className="big-line" style={{ overflow: 'hidden' }}>
                {i < 2
                  ? <h2 style={{
                    fontFamily: 'var(--font-display)', margin: 0, lineHeight: .94,
                    fontSize: 'clamp(3.2rem,10vw,12rem)', color: '#1a1a1a', letterSpacing: '-.02em'
                  }}>{text}</h2>
                  : <h2 style={{
                    fontFamily: 'var(--font-display)', margin: 0, lineHeight: .94,
                    fontSize: 'clamp(3.2rem,10vw,12rem)', letterSpacing: '-.02em',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 24px'
                  }}>
                    <span style={{ color: '#1a1a1a' }}>Click and</span>
                    <span className="gold-text">Scroll ↓</span>
                  </h2>
                }
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            § 4  SERVICES
        ═══════════════════════════════════════ */}
        <section style={{ background: 'white', overflow: 'hidden', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
          <div className="svc-head" style={{ marginBottom: 56 }}>
            <span className="s-label">Developer</span>
            <h2 className="s-display" style={{ fontSize: 'clamp(2.4rem,6.5vw,8rem)', maxWidth: '90%' }}>
              I help businesses grow<br />with projects like:
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
            {services.map((svc) => (
              <div key={svc.num} className="svc-card" style={{
                background: '#F5F0E8', border: '1px solid rgba(200,161,53,.1)', borderRadius: 20, padding: '28px 24px',
                transition: 'transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{svc.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'rgba(200,161,53,.12)', lineHeight: 1, marginBottom: 16 }}>{svc.num}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', color: '#1a1a1a',
                  whiteSpace: 'pre-line', lineHeight: 1.1, marginBottom: 14
                }}>{svc.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#777' }}>{svc.desc}</p>
              </div>
            ))}
          </div>

          {/* Scrolling text ticker */}
          <div style={{ marginTop: 64, overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div className="mq-track" style={{ animationDuration: '22s' }}>
              {['Websites & UIUX', '·', 'Full-Stack Apps', '·', 'REST APIs', '·', 'Cloud & DevOps', '·',
                'Websites & UIUX', '·', 'Full-Stack Apps', '·', 'REST APIs', '·', 'Cloud & DevOps', '·',
              ].map((t, i) => (
                <span key={i} style={{
                  display: 'inline-block', padding: '0 20px', fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem,4.5vw,5.5rem)', letterSpacing: '.02em',
                  color: t === '·' ? '#c8a135' : (i % 4 < 2 ? '#1a1a1a' : '#c8a135')
                }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            § 5  SELECTED WORKS
        ═══════════════════════════════════════ */}
        <ProjectsSection />

        {/* ═══════════════════════════════════════
            § 6  CLIENT REVIEWS
        ═══════════════════════════════════════ */}
        <ReviewsSection />

        {/* Carved seam — marks the shift into the closing CTA */}
        <div className="carved-seam" style={{ background: '#F5F0E8', padding: '10px 0' }}>
          <CarvedDivider height={28} />
        </div>

        {/* ═══════════════════════════════════════
            § 7  CTA BANNER
        ═══════════════════════════════════════ */}
        <section className="cta-section" style={{
          background: '#1a1a1a', overflow: 'hidden', position: 'relative',
          padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)'
        }}>

          <GShape className="cta-shape" type="sphere" size={260} style={{ top: -60, right: -50, opacity: .1 }} />
          <GShape className="cta-shape" type="ring" size={120} style={{ bottom: -20, left: '8%', opacity: .08 }} />
          <GShape className="cta-shape" type="hex" size={85} style={{ top: '35%', left: '4%', opacity: .06 }} />

          <div className="cta-inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <span className="s-label" style={{ color: '#f5c842' }}>Let&apos;s Work Together</span>
            <h2 style={{
              fontFamily: 'var(--font-display)', lineHeight: .92, letterSpacing: '-.02em', margin: '0 0 28px',
              fontSize: 'clamp(3rem,9vw,12rem)', color: 'white'
            }}>
              READY TO BUILD<br /><span className="gold-text">SOMETHING AMAZING?</span>
            </h2>
            <p style={{ maxWidth: 520, margin: '0 auto 48px', fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,.5)' }}>
              Let&apos;s collaborate and create exceptional digital experiences that drive your business forward.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
              <Magnetic strength={0.3}>
                <Link href="/contact" className="btn-gold" style={{ padding: '16px 36px', fontSize: 15 }}>
                  Start a Project <ArrowRightIcon style={{ width: 16, height: 16 }} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/about" className="btn-outline" style={{ padding: '16px 36px', fontSize: 15, color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.16)' }}>
                  Learn About Me
                </Link>
              </Magnetic>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}