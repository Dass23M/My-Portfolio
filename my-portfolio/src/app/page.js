'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  CheckIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

/* ─── tiny hook: element in viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── number counter ─── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    let start = 0;
    const step = Math.ceil(num / 55);
    const id = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
  const skills = ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS'];

  /* font injection */
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Space+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
    setMounted(true);
  }, []);

  /* typewriter */
  useEffect(() => {
    let i = 0;
    setTypedText('');
    const role = roles[roleIdx];
    const t = setInterval(() => {
      if (i < role.length) setTypedText(role.substring(0, ++i));
      else clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, [roleIdx]);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(r => (r + 1) % roles.length), 3800);
    return () => clearInterval(id);
  }, []);

  /* projects */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects?featured=true`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        let featured = data.data || [];
        if (featured.length < 3) {
          const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects`);
          const allData = await allRes.json();
          const allProjects = allData.data || [];
          const ids = new Set(featured.map(p => p._id));
          featured = [...featured, ...allProjects.filter(p => !ids.has(p._id))].slice(0, 3);
        } else featured = featured.slice(0, 3);
        setProjects(featured);
      } catch { /* silent */ } finally { setProjectsLoading(false); }
    };
    fetchProjects();
  }, []);

  const technologies = [
    { name: 'Frontend', icon: DevicePhoneMobileIcon, items: ['React', 'Next.js', 'Vue.js', 'TypeScript'] },
    { name: 'Backend', icon: CommandLineIcon, items: ['Node.js', 'Python', 'Express', 'FastAPI'] },
    { name: 'Database', icon: CpuChipIcon, items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'] },
    { name: 'Cloud', icon: CloudIcon, items: ['AWS', 'Vercel', 'Docker', 'Kubernetes'] },
  ];

  const stats = [
    { number: '50', suffix: '+', label: 'Projects Done' },
    { number: '3', suffix: '+', label: 'Years Exp.' },
    { number: '20', suffix: '+', label: 'Happy Clients' },
    { number: '100', suffix: '%', label: 'Success Rate' },
  ];

  const [techRef, techInView] = useInView();
  const [projRef, projInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <>
      {/* ── Google Font variables injected inline so SSR doesn't flash ── */}
      <style>{`
        :root {
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --font-mono: 'Space Mono', monospace;
          --clr-bg: #080b14;
          --clr-surface: #0e1220;
          --clr-border: rgba(255,255,255,0.07);
          --clr-accent: #ff5c00;
          --clr-accent2: #ff8a3d;
          --clr-text: #f0ede8;
          --clr-muted: #6b7280;
        }

        /* scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--clr-bg); }
        ::-webkit-scrollbar-thumb { background: var(--clr-accent); border-radius: 99px; }

        /* keyframes */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes ping {
          75%,100% { transform:scale(2); opacity:0; }
        }

        .anim-fadeup   { animation: fadeUp 0.8s cubic-bezier(.16,1,.3,1) both; }
        .anim-fadein   { animation: fadeIn 1s ease both; }
        .anim-float    { animation: float 6s ease-in-out infinite; }
        .spin-slow     { animation: spin-slow 28s linear infinite; }
        .spin-rev      { animation: spin-rev 52s linear infinite; }
        .cursor-blink  { animation: blink 1.1s step-start infinite; }

        .marquee-track { animation: marquee 22s linear infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, var(--clr-accent) 0%, var(--clr-accent2) 40%, #fff 60%, var(--clr-accent2) 80%, var(--clr-accent) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .card-hover {
          transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 32px 64px -12px rgba(255,92,0,0.18);
          border-color: rgba(255,92,0,0.35);
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: transform .25s, box-shadow .25s;
        }
        .btn-primary::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(135deg,rgba(255,255,255,.12),transparent);
          opacity:0;
          transition: opacity .25s;
        }
        .btn-primary:hover { transform:scale(1.04); box-shadow:0 16px 40px rgba(255,92,0,.4); }
        .btn-primary:hover::after { opacity:1; }

        .noise-overlay::before {
          content:'';
          position:absolute;
          inset:0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;
          z-index:1;
        }

        /* stagger helpers */
        .stagger-1 { animation-delay: .1s; }
        .stagger-2 { animation-delay: .22s; }
        .stagger-3 { animation-delay: .34s; }
        .stagger-4 { animation-delay: .46s; }
        .stagger-5 { animation-delay: .58s; }
        .stagger-6 { animation-delay: .70s; }
        .stagger-7 { animation-delay: .82s; }
        .stagger-8 { animation-delay: .94s; }
      `}</style>

      <div style={{ fontFamily: 'var(--font-body)', background: 'var(--clr-bg)', color: 'var(--clr-text)', overflowX: 'hidden' }}>

        {/* ══════════════════════════════
              HERO
        ══════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="noise-overlay">

          {/* ── mesh gradient bg ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,92,0,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255,92,0,0.06) 0%, transparent 55%), var(--clr-bg)'
          }} />

          {/* ── grid lines ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, opacity: 0.035,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
            backgroundSize: '64px 64px'
          }} />

          {/* ── content ── */}
          <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
            <div style={{ width: '100%', padding: '48px 48px 32px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(0,420px)', gap: '48px', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>

                {/* ── LEFT ── */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                  {/* availability chip */}
                  <div className="anim-fadeup stagger-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,92,0,0.08)', border: '1px solid rgba(255,92,0,0.2)', borderRadius: '99px', padding: '6px 14px 6px 10px', marginBottom: '32px', width: 'fit-content' }}>
                    <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px' }}>
                      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', opacity: 0.7, animation: 'ping 1.4s cubic-bezier(0,0,.2,1) infinite' }} />
                      <span style={{ position: 'relative', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#86efac', letterSpacing: '0.05em' }}>2 project slots open in April</span>
                  </div>

                  {/* headline */}
                  <div className="anim-fadeup stagger-2" style={{ fontFamily: 'var(--font-display)', lineHeight: 0.88, marginBottom: '20px' }}>
                    <div style={{ fontSize: 'clamp(4rem, 8vw, 7.5rem)', color: 'rgba(240,237,232,0.18)', letterSpacing: '0.02em' }}>HI, I'M</div>
                    <div style={{ fontSize: 'clamp(4.5rem, 10vw, 9.5rem)', letterSpacing: '0.01em' }} className="shimmer-text">METHMAL</div>
                    <div style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', color: 'var(--clr-text)', letterSpacing: '0.02em' }}>BUILDING THE</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', color: 'var(--clr-accent)', letterSpacing: '0.02em' }}>DIGITAL</span>
                      <span style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', color: 'var(--clr-text)', letterSpacing: '0.02em' }}>FUTURE.</span>
                    </div>
                  </div>

                  {/* typewriter */}
                  <div className="anim-fadeup stagger-3" style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '32px', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--clr-accent)', letterSpacing: '0.04em' }}>{typedText}</span>
                    <span className="cursor-blink" style={{ display: 'inline-block', width: '2px', height: '18px', background: 'var(--clr-accent)', borderRadius: '2px' }} />
                  </div>

                  {/* body */}
                  <p className="anim-fadeup stagger-4" style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--clr-muted)', maxWidth: '480px', marginBottom: '36px', fontWeight: 300 }}>
                    A full-stack developer with a sharp eye for scalable systems and user-centered design.
                    I collaborate closely with teams to craft seamless digital products —
                    a reliable partner in bringing ideas to life.
                  </p>

                  {/* CTAs */}
                  <div className="anim-fadeup stagger-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
                    <Link href="#projects" className="btn-primary" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'var(--clr-accent)', color: '#fff',
                      fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 700,
                      padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', textTransform: 'uppercase'
                    }}>
                      View My Work <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
                    </Link>
                    <Link href="#contact" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'transparent', color: 'var(--clr-text)',
                      fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 700,
                      padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', textTransform: 'uppercase',
                      border: '1px solid var(--clr-border)', transition: 'border-color .25s, color .25s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,92,0,0.5)'; e.currentTarget.style.color = 'var(--clr-accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--clr-border)'; e.currentTarget.style.color = 'var(--clr-text)'; }}
                    >
                      Get in Touch <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
                    </Link>
                  </div>

                  {/* skill pills */}
                  <div className="anim-fadeup stagger-6" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.map((s, i) => (
                      <span key={s} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                        padding: '6px 12px', borderRadius: '2px',
                        border: '1px solid var(--clr-border)', color: 'var(--clr-muted)',
                        background: 'rgba(255,255,255,0.02)',
                        transition: 'border-color .2s, color .2s, background .2s', cursor: 'default'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,92,0,.4)'; e.currentTarget.style.color = 'var(--clr-accent)'; e.currentTarget.style.background = 'rgba(255,92,0,.06)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--clr-border)'; e.currentTarget.style.color = 'var(--clr-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                      >{s}</span>
                    ))}
                  </div>
                </div>

                {/* ── RIGHT: photo ── */}
                <div className="anim-fadein stagger-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div className="anim-float" style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto' }}>

                    {/* glow */}
                    <div style={{ position: 'absolute', inset: '20px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,92,0,0.35) 0%, transparent 70%)', filter: 'blur(32px)', zIndex: 0 }} />

                    {/* rings */}
                    <div className="spin-slow" style={{ position: 'absolute', inset: '-24px', borderRadius: '50%', border: '1px dashed rgba(255,92,0,0.25)' }} />
                    <div className="spin-rev" style={{ position: 'absolute', inset: '-48px', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.05)' }} />

                    {/* orange arc accent */}
                    <svg style={{ position: 'absolute', inset: '-36px', zIndex: 1 }} viewBox="0 0 432 432" fill="none">
                      <circle cx="216" cy="216" r="210" stroke="url(#arcGrad)" strokeWidth="2" strokeDasharray="60 340" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="arcGrad" x1="0" y1="0" x2="432" y2="432" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ff5c00" /><stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* photo */}
                    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,92,0,0.3)', boxShadow: '0 0 80px rgba(255,92,0,0.2)', zIndex: 2 }}>
                      <Image src="/methmal.jpg" alt="Methmal – Full-Stack Developer" fill className="object-cover" style={{ objectPosition: 'center 15%', transform: 'scale(1.1)' }} priority sizes="360px" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(8,11,20,0.4))' }} />
                    </div>

                    {/* badge: Experience */}
                    <div style={{
                      position: 'absolute', top: '-8px', left: '-56px', zIndex: 10,
                      background: 'var(--clr-surface)', border: '1px solid var(--clr-border)',
                      borderRadius: '8px', padding: '12px 16px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)'
                    }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(255,92,0,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CodeBracketIcon style={{ width: '16px', height: '16px', color: 'var(--clr-accent)' }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--clr-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>Experience</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--clr-text)', lineHeight: 1 }}>3+ Years</p>
                      </div>
                    </div>

                    {/* badge: Projects */}
                    <div style={{
                      position: 'absolute', bottom: '-8px', right: '-56px', zIndex: 10,
                      background: 'var(--clr-surface)', border: '1px solid var(--clr-border)',
                      borderRadius: '8px', padding: '12px 16px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)'
                    }}>
                      <div style={{ width: '36px', height: '36px', background: 'rgba(255,92,0,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <GlobeAltIcon style={{ width: '16px', height: '16px', color: 'var(--clr-accent)' }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--clr-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>Projects</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--clr-text)', lineHeight: 1 }}>50+ Done</p>
                      </div>
                    </div>

                    {/* available pill */}
                    <div style={{
                      position: 'absolute', bottom: '-32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
                      background: 'linear-gradient(135deg,#16a34a,#15803d)', color: '#fff',
                      borderRadius: '99px', padding: '7px 16px',
                      display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
                      boxShadow: '0 8px 24px rgba(22,163,74,0.35)',
                      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em'
                    }}>
                      <span style={{ width: '7px', height: '7px', background: '#86efac', borderRadius: '50%', animation: 'ping 1.4s cubic-bezier(0,0,.2,1) infinite', opacity: 0.8 }} />
                      AVAILABLE FOR WORK
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── bottom info bar ── */}
          <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid var(--clr-border)', background: 'rgba(14,18,32,0.7)', backdropFilter: 'blur(12px)' }}>
            <div style={{ padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Stack', value: 'React · Next.js · Node.js · PostgreSQL' },
                  { label: 'Based in', value: 'Sri Lanka 🇱🇰' },
                  { label: 'Open to', value: 'Remote · Freelance · Full-time' },
                ].map((item, i) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    {i > 0 && <div style={{ width: '1px', height: '28px', background: 'var(--clr-border)' }} />}
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--clr-muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '3px' }}>{item.label}</p>
                      <p style={{ fontSize: '13px', color: 'var(--clr-text)', fontWeight: 500 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="#contact" className="btn-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--clr-accent)', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', textTransform: 'uppercase', flexShrink: 0
              }}>
                <EnvelopeIcon style={{ width: '14px', height: '14px' }} /> Email Me
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
              MARQUEE
        ══════════════════════════════ */}
        <div style={{ borderTop: '1px solid var(--clr-border)', borderBottom: '1px solid var(--clr-border)', background: 'var(--clr-surface)', padding: '14px 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '0' }} className="marquee-track">
            {[...Array(2)].map((_, rep) => (
              <div key={rep} style={{ display: 'flex', gap: '0', flexShrink: 0 }}>
                {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Redis', 'FastAPI', 'Prisma', 'Vue.js'].map((s, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap', padding: '0 28px', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--clr-muted)', textTransform: 'uppercase' }}>
                    <span style={{ color: 'var(--clr-accent)', fontSize: '8px' }}>◆</span> {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
              STATS
        ══════════════════════════════ */}
        <section style={{ padding: '80px 48px', background: 'var(--clr-bg)', borderBottom: '1px solid var(--clr-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--clr-border)', maxWidth: '900px', margin: '0 auto' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ background: 'var(--clr-bg)', padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5vw,4.5rem)', color: 'var(--clr-accent)', lineHeight: 1, marginBottom: '8px' }}>
                  <Counter target={s.number} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--clr-muted)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
              TECHNOLOGIES
        ══════════════════════════════ */}
        <section ref={techRef} style={{ padding: '100px 48px', background: 'var(--clr-surface)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(255,92,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '60px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--clr-accent)', textTransform: 'uppercase', marginBottom: '12px' }}>Tech Stack</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', color: 'var(--clr-text)', lineHeight: 0.9, marginBottom: '16px' }}>
                TECHNOLOGIES<br />
                <span style={{ color: 'var(--clr-accent)' }}>I WORK WITH</span>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--clr-muted)', maxWidth: '420px', lineHeight: 1.7, fontWeight: 300 }}>Cutting-edge tools to build scalable, performant applications</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {technologies.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.name} className="card-hover" style={{
                    background: 'var(--clr-bg)', border: '1px solid var(--clr-border)',
                    borderRadius: '4px', padding: '28px',
                    opacity: techInView ? 1 : 0, transform: techInView ? 'none' : 'translateY(24px)',
                    transition: `opacity .7s ${i * 0.12}s, transform .7s ${i * 0.12}s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s`
                  }}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(255,92,0,0.1)', border: '1px solid rgba(255,92,0,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <Icon style={{ width: '20px', height: '20px', color: 'var(--clr-accent)' }} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--clr-text)', marginBottom: '16px', letterSpacing: '0.04em' }}>{tech.name.toUpperCase()}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tech.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '6px', height: '6px', background: 'var(--clr-accent)', borderRadius: '1px', flexShrink: 0, transform: 'rotate(45deg)' }} />
                          <span style={{ fontSize: '13px', color: 'var(--clr-muted)', fontWeight: 300 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
              FEATURED PROJECTS
        ══════════════════════════════ */}
        <section id="projects" ref={projRef} style={{ padding: '100px 48px', background: 'var(--clr-bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--clr-accent)', textTransform: 'uppercase', marginBottom: '12px' }}>Portfolio</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', color: 'var(--clr-text)', lineHeight: 0.9 }}>
                  FEATURED<br /><span style={{ color: 'var(--clr-accent)' }}>PROJECTS</span>
                </h2>
              </div>
              <Link href="/projects" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em',
                color: 'var(--clr-muted)', textDecoration: 'none', textTransform: 'uppercase',
                border: '1px solid var(--clr-border)', borderRadius: '4px', padding: '10px 18px',
                transition: 'color .2s, border-color .2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--clr-accent)'; e.currentTarget.style.borderColor = 'rgba(255,92,0,.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--clr-muted)'; e.currentTarget.style.borderColor = 'var(--clr-border)'; }}
              >
                View All <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {projectsLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} style={{ border: '1px solid var(--clr-border)', borderRadius: '4px', overflow: 'hidden', background: 'var(--clr-surface)' }}>
                    <div style={{ height: '200px', background: 'rgba(255,255,255,0.03)', animation: 'shimmer 1.5s linear infinite', backgroundImage: 'linear-gradient(90deg,transparent,rgba(255,255,255,.03),transparent)', backgroundSize: '200% auto' }} />
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ height: '14px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', width: '70%' }} />
                      <div style={{ height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }} />
                      <div style={{ height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', width: '80%' }} />
                    </div>
                  </div>
                ))
              ) : projects.length === 0 ? (
                <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '80px 0', color: 'var(--clr-muted)', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛠️</div>
                  <p style={{ fontSize: '13px', letterSpacing: '0.1em' }}>PROJECTS COMING SOON</p>
                </div>
              ) : (
                projects.map((project, i) => (
                  <div key={project._id} className="card-hover" style={{
                    background: 'var(--clr-surface)', border: '1px solid var(--clr-border)',
                    borderRadius: '4px', overflow: 'hidden',
                    opacity: projInView ? 1 : 0, transform: projInView ? 'none' : 'translateY(24px)',
                    transition: `opacity .7s ${i * 0.15}s, transform .7s ${i * 0.15}s cubic-bezier(.16,1,.3,1), box-shadow .35s, border-color .35s`
                  }}>
                    <div style={{ position: 'relative', height: '200px', background: 'linear-gradient(135deg,rgba(255,92,0,0.15),rgba(255,92,0,0.05))', overflow: 'hidden' }}>
                      {project.image && !project.image.includes('placeholder') ? (
                        <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="33vw" />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🚀</div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(14,18,32,0.8))' }} />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--clr-text)', marginBottom: '10px', letterSpacing: '0.04em', lineHeight: 1 }}>{project.title.toUpperCase()}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--clr-muted)', marginBottom: '18px', lineHeight: 1.65, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                        {(project.technologies || []).slice(0, 4).map(tag => (
                          <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', padding: '4px 10px', background: 'rgba(255,92,0,0.08)', color: 'var(--clr-accent)', border: '1px solid rgba(255,92,0,0.2)', borderRadius: '2px', textTransform: 'uppercase' }}>{tag}</span>
                        ))}
                      </div>
                      <Link href="/projects" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                        color: 'var(--clr-accent)', textDecoration: 'none', textTransform: 'uppercase',
                        transition: 'gap .2s'
                      }}
                        onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                        onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                      >
                        View Project <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
              CTA BANNER
        ══════════════════════════════ */}
        <section ref={ctaRef} style={{ padding: '120px 48px', background: 'var(--clr-surface)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--clr-border)' }}>

          {/* diagonal accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,92,0,0.1) 0%, transparent 70%)' }} />
            <svg style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.04 }} width="600" height="400" viewBox="0 0 600 400">
              <line x1="0" y1="400" x2="600" y2="0" stroke="white" strokeWidth="1" />
              <line x1="0" y1="350" x2="600" y2="-50" stroke="white" strokeWidth="1" />
              <line x1="0" y1="450" x2="600" y2="50" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--clr-accent)', textTransform: 'uppercase', marginBottom: '20px' }}>Let's Work Together</p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,7vw,7rem)',
              lineHeight: 0.88, marginBottom: '32px',
              opacity: ctaInView ? 1 : 0, transform: ctaInView ? 'none' : 'translateY(32px)',
              transition: 'opacity .8s, transform .8s cubic-bezier(.16,1,.3,1)'
            }}>
              READY TO BUILD<br />
              <span className="shimmer-text">SOMETHING<br />AMAZING?</span>
            </h2>
            <p style={{
              fontSize: '15px', color: 'var(--clr-muted)', maxWidth: '480px', margin: '0 auto 48px',
              lineHeight: 1.75, fontWeight: 300,
              opacity: ctaInView ? 1 : 0, transition: 'opacity .8s .2s',
            }}>
              Let's collaborate and create exceptional digital experiences that drive your business forward.
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px',
              opacity: ctaInView ? 1 : 0, transition: 'opacity .8s .35s'
            }}>
              <Link href="#contact" className="btn-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--clr-accent)', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em',
                padding: '16px 36px', borderRadius: '4px', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 700
              }}>
                Start a Project <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
              </Link>
              <Link href="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: 'var(--clr-muted)',
                fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em',
                padding: '16px 36px', borderRadius: '4px', textDecoration: 'none', textTransform: 'uppercase',
                border: '1px solid var(--clr-border)', transition: 'color .2s, border-color .2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--clr-text)'; e.currentTarget.style.borderColor = 'rgba(255,92,0,.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--clr-muted)'; e.currentTarget.style.borderColor = 'var(--clr-border)'; }}
              >
                Learn More About Me
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}