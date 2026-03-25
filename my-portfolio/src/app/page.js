'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CodeBracketIcon, CommandLineIcon, CpuChipIcon, CloudIcon,
  DevicePhoneMobileIcon, ArrowRightIcon, CheckIcon, EnvelopeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

/* ── in-view observer ── */
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

/* ── animated number counter ── */
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

/* ─────────────────────────────────────────────
   3D TILT CARD HOOK
───────────────────────────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
  };
  const handleLeave = () => {
    if (ref.current)
      ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };
  return { ref, handleMove, handleLeave };
}

/* ─────────────────────────────────────────────
   TECH STACK SECTION  (3D redesign)
───────────────────────────────────────────── */
const techCategories = [
  {
    name: 'Frontend',
    icon: DevicePhoneMobileIcon,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.35)',
    gradient: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/30',
    items: [
      { name: 'React',       level: 95 },
      { name: 'Next.js',     level: 92 },
      { name: 'TypeScript',  level: 88 },
      { name: 'Tailwind CSS',level: 96 },
    ],
  },
  {
    name: 'Backend',
    icon: CommandLineIcon,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.35)',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/30',
    items: [
      { name: 'Node.js',  level: 90 },
      { name: 'Python',   level: 85 },
      { name: 'Express',  level: 88 },
      { name: 'FastAPI',  level: 80 },
    ],
  },
  {
    name: 'Database',
    icon: CpuChipIcon,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    items: [
      { name: 'MongoDB',    level: 92 },
      { name: 'PostgreSQL', level: 87 },
      { name: 'Redis',      level: 78 },
      { name: 'Prisma',     level: 84 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: CloudIcon,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    items: [
      { name: 'AWS',    level: 82 },
      { name: 'Vercel', level: 94 },
      { name: 'Docker', level: 80 },
      { name: 'CI/CD',  level: 78 },
    ],
  },
];

function TechCard({ tech, index, inView }) {
  const { ref, handleMove, handleLeave } = useTilt();
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <div
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => { handleLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
        className="relative rounded-2xl overflow-hidden cursor-default"
      >
        {/* card bg */}
        <div className={`relative bg-white dark:bg-[#0d1120] border ${tech.border} rounded-2xl p-7 h-full`}
          style={{ boxShadow: hovered ? `0 24px 60px -8px ${tech.glow}, 0 0 0 1px ${tech.glow}` : '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* gradient bg blob */}
          <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 transition-opacity duration-300 rounded-2xl pointer-events-none`}
            style={{ opacity: hovered ? 1 : 0 }} />

          {/* glowing top line */}
          <div className="absolute top-0 left-8 right-8 h-px rounded-full transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)`, opacity: hovered ? 1 : 0.3 }} />

          {/* icon */}
          <div className="relative z-10 mb-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{
                background: hovered ? tech.color : `${tech.color}18`,
                boxShadow: hovered ? `0 0 24px ${tech.glow}` : 'none',
              }}>
              <Icon className="w-7 h-7 transition-colors duration-300"
                style={{ color: hovered ? '#fff' : tech.color }} />
            </div>
          </div>

          {/* title */}
          <h3 className="relative z-10 font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900 dark:text-white mb-5">
            {tech.name}
          </h3>

          {/* skill bars */}
          <ul className="relative z-10 space-y-3.5">
            {tech.items.map((item, j) => (
              <li key={item.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{item.name}</span>
                  <span className="text-xs font-bold tabular-nums" style={{ color: tech.color }}>{item.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: inView ? `${item.level}%` : '0%',
                      background: `linear-gradient(90deg, ${tech.color}, ${tech.color}aa)`,
                      transitionDelay: `${index * 120 + j * 80 + 300}ms`,
                      boxShadow: `0 0 8px ${tech.glow}`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* bottom reflection line */}
          <div className="absolute bottom-0 left-8 right-8 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${tech.color}55, transparent)` }} />
        </div>
      </div>
    </div>
  );
}

function TechStackSection() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes floatIcon { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float-icon { animation: floatIcon 3s ease-in-out infinite; }
        @keyframes scanLine {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        .scan-line { animation: scanLine 3s ease-in-out infinite; }
      `}</style>

      <section ref={sectionRef} className="py-20 lg:py-32 bg-white dark:bg-[#080c18] relative overflow-hidden transition-colors duration-300">

        {/* background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-100"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(16,185,129,0.06) 0%, transparent 50%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">

          {/* ── heading ── */}
          <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[11px] font-black font-[family-name:var(--font-mono)] uppercase tracking-[0.25em] text-orange-500">
                Tech Stack
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-6xl text-gray-900 dark:text-white mb-4" style={{ letterSpacing: '0.02em' }}>
              TECHNOLOGIES<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#f97316,#fb923c,#fde68a,#fb923c,#f97316)', backgroundSize: '200% auto', animation: 'shimmer 3.5s linear infinite' }}>
                I MASTER
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mx-auto text-base lg:text-lg">
              Hover each card to see depth — every skill level is real.
            </p>
          </div>

          {/* ── 4 cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {techCategories.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} inView={inView} />
            ))}
          </div>

          {/* ── bottom summary strip ── */}
          <div className={`mt-14 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0d1120] px-6 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  <span className="text-gray-900 dark:text-white font-black">16+</span> technologies in active use
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React','Next.js','Node.js','Python','TypeScript','MongoDB','PostgreSQL','AWS','Docker','Redis'].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-500 dark:text-gray-400 hover:border-orange-500/40 hover:text-orange-500 transition-all duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
  const skills = ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS'];

  useEffect(() => { setMounted(true); }, []);

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
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${base}/api/projects?featured=true`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        let featured = data.data || [];
        if (featured.length < 3) {
          const allRes = await fetch(`${base}/api/projects`);
          const allData = await allRes.json();
          const ids = new Set(featured.map(p => p._id));
          featured = [...featured, ...(allData.data || []).filter(p => !ids.has(p._id))].slice(0, 3);
        } else featured = featured.slice(0, 3);
        setProjects(featured);
      } catch { /* silent */ } finally { setProjectsLoading(false); }
    };
    fetchProjects();
  }, []);

  const technologies = [
    { name: 'Frontend', icon: DevicePhoneMobileIcon, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { name: 'Backend', icon: CommandLineIcon, items: ['Node.js', 'Python', 'Express', 'FastAPI'] },
    { name: 'Database', icon: CpuChipIcon, items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'] },
    { name: 'Cloud', icon: CloudIcon, items: ['AWS', 'Vercel', 'Docker', 'CI/CD'] },
  ];

  const stats = [
    { number: '50', suffix: '+', label: 'Projects Done' },
    { number: '3', suffix: '+', label: 'Years Exp.' },
    { number: '20', suffix: '+', label: 'Happy Clients' },
    { number: '100', suffix: '%', label: 'Success Rate' },
  ];

  const [projRef, projInView] = useInView();

  return (
    <>
      {/* ── global keyframes ── */}
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes slideRight { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideLeft  { from { opacity:0; transform:translateX(36px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes floatY   { 0%,100% { transform:translateY(0);    } 50% { transform:translateY(-14px); } }
        @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes spin-cw  { to { transform:rotate(360deg);  } }
        @keyframes spin-ccw { to { transform:rotate(-360deg); } }
        @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes shimmer  { from { background-position:-200% center; } to { background-position:200% center; } }
        @keyframes ping     { 75%,100% { transform:scale(2.2); opacity:0; } }
        @keyframes pulse-ring { 0% { box-shadow:0 0 0 0 rgba(249,115,22,.5); } 100% { box-shadow:0 0 0 18px rgba(249,115,22,0); } }

        .anim-fadeup    { animation: fadeUp    0.8s cubic-bezier(.16,1,.3,1) both; }
        .anim-fadein    { animation: fadeIn    1s ease both; }
        .anim-slideR    { animation: slideRight 0.9s cubic-bezier(.16,1,.3,1) both; }
        .anim-slideL    { animation: slideLeft  0.9s cubic-bezier(.16,1,.3,1) both; }
        .anim-float     { animation: floatY 6s ease-in-out infinite; }
        .spin-cw        { animation: spin-cw  30s linear infinite; }
        .spin-ccw       { animation: spin-ccw 50s linear infinite; }
        .cursor-blink   { animation: blink 1.1s step-start infinite; }
        .marquee-track  { animation: marquee 24s linear infinite; }

        .d1 { animation-delay:.08s; } .d2 { animation-delay:.18s; } .d3 { animation-delay:.28s; }
        .d4 { animation-delay:.38s; } .d5 { animation-delay:.48s; } .d6 { animation-delay:.58s; }
        .d7 { animation-delay:.68s; } .d8 { animation-delay:.78s; }

        .shimmer-orange {
          background: linear-gradient(90deg, #f97316 0%, #fb923c 30%, #fde68a 55%, #fb923c 70%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }
        .hero-glow {
          box-shadow: 0 0 0 3px rgba(249,115,22,.35), 0 0 60px 10px rgba(249,115,22,.15), 0 0 120px 30px rgba(249,115,22,.08);
          animation: pulse-ring 2.5s ease-out infinite;
        }
        .card-lift {
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .3s;
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 56px -8px rgba(249,115,22,.18);
        }
        .btn-glow {
          transition: transform .25s, box-shadow .25s;
        }
        .btn-glow:hover {
          transform: scale(1.04) translateY(-1px);
          box-shadow: 0 16px 40px rgba(249,115,22,.4);
        }
        .dot-grid-light {
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .dot-grid-dark {
          background-image: radial-gradient(circle, rgba(249,115,22,.18) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── FIX: photo circle wrapper ── */
        .photo-circle {
          position: relative;
          border-radius: 9999px;
          overflow: hidden;
          border: 4px solid white;
          flex-shrink: 0;
        }
        .dark .photo-circle {
          border-color: #141c30;
        }
        /* Ensure Next.js Image fills the circle correctly */
        .photo-circle img {
          border-radius: 9999px !important;
        }
      `}</style>

      <div className="overflow-x-hidden bg-white dark:bg-[#080c18] text-gray-900 dark:text-white transition-colors duration-300">

        {/* ══════════════════════════════════════════
              HERO
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col bg-white dark:bg-[#080c18] transition-colors duration-300 pt-16 lg:pt-20" style={{ overflowX: 'hidden' }}>

          {/* background layers */}
          <div className="pointer-events-none absolute inset-0 dot-grid-light dark:dot-grid-dark" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 right-0 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-orange-100 dark:bg-orange-500/10 blur-[120px]" />
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-orange-50 dark:bg-orange-600/6 blur-[90px]" />
          </div>

          {/* hero content */}
          <div className="relative z-10 flex-1 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 py-6 sm:py-8 lg:py-0">
              <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px] 2xl:grid-cols-[minmax(0,1fr)_500px] gap-6 lg:gap-10 xl:gap-16 items-center w-full">

                {/* ── LEFT copy ── */}
                <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left min-w-0 w-full px-2 sm:px-4 lg:px-0">

                  {/* availability badge */}
                  <div className="anim-fadeup d1 inline-flex items-center gap-2.5 self-center lg:self-start mb-4 sm:mb-6 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/25">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inset-0 rounded-full bg-green-500 opacity-70" style={{ animation: 'ping 1.4s cubic-bezier(0,0,.2,1) infinite' }} />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-green-700 dark:text-green-400 tracking-wider">
                      2 project slots open · April 2025
                    </span>
                  </div>

                  {/* headline */}
                  <div className="anim-fadeup d2 mb-3 sm:mb-5">
                    <div
                      className="font-[family-name:var(--font-display)] text-gray-300 dark:text-white/12 tracking-wider select-none"
                      style={{ fontSize: 'clamp(1.5rem,3.5vw,4rem)', lineHeight: 1 }}
                    >
                      HI, I'M
                    </div>
                    <h1
                      className="font-[family-name:var(--font-display)] shimmer-orange tracking-tight select-none"
                      style={{ fontSize: 'clamp(3rem,7vw,8rem)', lineHeight: 0.88 }}
                    >
                      METHMAL
                    </h1>
                    <div
                      className="font-[family-name:var(--font-display)] text-gray-800 dark:text-white tracking-wider"
                      style={{ fontSize: 'clamp(1.4rem,3vw,3.8rem)', lineHeight: 1.05 }}
                    >
                      BUILDING THE
                    </div>
                    <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start">
                      <span
                        className="font-[family-name:var(--font-display)] text-orange-500"
                        style={{ fontSize: 'clamp(1.4rem,3vw,3.8rem)', lineHeight: 1.05 }}
                      >DIGITAL</span>
                      <span
                        className="font-[family-name:var(--font-display)] text-gray-800 dark:text-white"
                        style={{ fontSize: 'clamp(1.4rem,3vw,3.8rem)', lineHeight: 1.05 }}
                      >FUTURE.</span>
                    </div>
                  </div>

                  {/* typewriter */}
                  <div className="anim-fadeup d3 flex items-center gap-1 h-7 mb-4 sm:mb-5 justify-center lg:justify-start">
                    <span className="font-[family-name:var(--font-mono)] text-sm text-orange-500 tracking-wider">
                      {typedText}
                    </span>
                    <span className="cursor-blink inline-block w-0.5 h-5 bg-orange-500 rounded" />
                  </div>

                  {/* bio */}
                  <p className="anim-fadeup d4 text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed w-full lg:max-w-[500px] mx-auto lg:mx-0 mb-6 sm:mb-8">
                    A full-stack developer with a sharp eye for scalable systems and user-centered design.
                    I craft <strong className="text-gray-800 dark:text-white font-semibold">high-performance web apps</strong> from
                    idea to production.
                  </p>

                  {/* CTA row */}
                  <div className="anim-fadeup d5 flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8 w-full sm:justify-center lg:justify-start">
                    <Link href="/projects" className="btn-glow inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 w-full sm:w-auto">
                      View My Work
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 border-gray-200 dark:border-white/15 text-gray-700 dark:text-white hover:border-orange-500/50 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 w-full sm:w-auto">
                      <EnvelopeIcon className="w-4 h-4" />
                      Hire Me
                    </Link>
                  </div>

                  {/* skill chips marquee */}
                  <div className="anim-fadeup d6 overflow-hidden w-full max-w-full">
                    <div className="flex gap-2" style={{ width: 'max-content' }}>
                      <div className="marquee-track flex gap-2">
                        {[...skills, ...skills].map((s, i) => (
                          <span key={i} className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold font-[family-name:var(--font-mono)] tracking-wider bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/25">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT photo ── */}
                <div className="relative order-1 lg:order-2 flex items-center justify-center py-6 sm:py-8 lg:py-12 w-full lg:w-[420px] xl:w-[460px] 2xl:w-[500px] flex-shrink-0">
                  {/* spinning rings — hidden on small mobile to avoid overflow */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden sm:flex">
                    <div className="spin-cw absolute rounded-full border border-dashed border-orange-400/25 dark:border-orange-500/20" style={{ width: '300px', height: '300px' }} />
                    <div className="spin-ccw absolute rounded-full border border-dashed border-orange-300/20 dark:border-orange-500/15" style={{ width: '220px', height: '220px' }} />
                  </div>
                  {/* desktop rings */}
                  <div className="absolute inset-0 items-center justify-center pointer-events-none hidden lg:flex">
                    <div className="spin-cw absolute rounded-full border border-dashed border-orange-400/25 dark:border-orange-500/20" style={{ width: '420px', height: '420px' }} />
                    <div className="spin-ccw absolute rounded-full border border-dashed border-orange-300/20 dark:border-orange-500/15" style={{ width: '320px', height: '320px' }} />
                  </div>

                  {/* photo + badges */}
                  <div className="relative flex items-center justify-center" style={{ animation: 'floatY 6s ease-in-out infinite' }}>

                    <div
                      className="photo-circle"
                      style={{
                        width: 'clamp(140px, 38vw, 400px)',
                        height: 'clamp(140px, 38vw, 400px)',
                        boxShadow: '0 0 0 4px rgba(249,115,22,.35), 0 0 60px 12px rgba(249,115,22,.15)',
                      }}
                    >
                      <Image
                        src="/methmal.jpg"
                        alt="Dasun Methmal"
                        fill
                        priority
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 45vw, 400px"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          borderRadius: '9999px',
                        }}
                      />
                    </div>

                    {/* badge: Available */}
                    <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-6 bg-white dark:bg-[#141c30] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2 z-10">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">Available</span>
                    </div>

                    {/* badge: Full-Stack */}
                    <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-6 bg-white dark:bg-[#141c30] border border-gray-100 dark:border-white/10 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2 z-10">
                      <CodeBracketIcon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">Full-Stack Dev</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* bottom info bar */}
          <div className="relative z-10 border-t border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-white/[0.02] backdrop-blur-sm">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-10 flex-wrap">
                {[
                  { label: 'Stack', value: 'React · Next.js · Node.js · PostgreSQL' },
                  { label: 'Based in', value: 'Sri Lanka 🇱🇰' },
                  { label: 'Open to', value: 'Remote · Freelance · Full-time' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold mb-0.5">{label}</p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30">
                <EnvelopeIcon className="w-4 h-4" />
                Email Me
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
              STATS
        ══════════════════════════════════════════ */}
        <section className="py-16 bg-gray-50 dark:bg-[#0d1120] border-y border-gray-100 dark:border-white/5 transition-colors duration-300">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl text-orange-500 mb-1"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    <Counter target={s.number} suffix={s.suffix} />
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm font-semibold tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
              TECHNOLOGIES  – 3D redesign
        ══════════════════════════════════════════ */}
        <TechStackSection />

        {/* ══════════════════════════════════════════
              FEATURED PROJECTS
        ══════════════════════════════════════════ */}
        <section ref={projRef} id="projects" className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0d1120] transition-colors duration-300">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">
            <div className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${projInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block text-[11px] font-black font-[family-name:var(--font-mono)] uppercase tracking-[0.25em] text-orange-500 mb-3">
                Portfolio
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl text-gray-900 dark:text-white mb-3" style={{ letterSpacing: '0.02em' }}>
                FEATURED PROJECTS
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
                A selection of my recent full-stack development work
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projectsLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#080c18] overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-100 dark:bg-white/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 dark:bg-white/5 rounded" />
                      <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-5/6" />
                    </div>
                  </div>
                ))
              ) : projects.length === 0 ? (
                <div className="col-span-3 text-center py-20 text-gray-400 dark:text-gray-600">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-lg font-semibold">Projects coming soon!</p>
                </div>
              ) : (
                projects.map((project, i) => (
                  <div
                    key={project._id}
                    className={`card-lift group bg-white dark:bg-[#080c18] border border-gray-100 dark:border-white/5 hover:border-orange-500/30 rounded-2xl overflow-hidden transition-all duration-700 ${projInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/10 overflow-hidden">
                      {project.image && !project.image.includes('placeholder') ? (
                        <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-5xl">🚀</div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {(project.technologies || []).slice(0, 4).map(tag => (
                          <span key={tag} className="text-xs font-bold px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors duration-300">
                        View Project
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects" className="inline-flex items-center gap-2 border-2 border-gray-200 dark:border-white/10 hover:border-orange-500/40 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:bg-orange-500/5">
                View All Projects
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
              CTA BANNER
        ══════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 bg-white dark:bg-[#080c18] relative overflow-hidden transition-colors duration-300">
          {/* decorative rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="spin-cw  absolute w-[520px] h-[520px] rounded-full border border-dashed border-orange-300/20 dark:border-orange-500/10" />
            <div className="spin-ccw absolute w-[380px] h-[380px] rounded-full border border-dashed border-orange-400/15 dark:border-orange-500/8" />
            <div className="absolute w-[200px] h-[200px] rounded-full bg-orange-100 dark:bg-orange-500/8 blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.25em] text-orange-500 mb-5">
                Let's Work Together
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-gray-900 dark:text-white mb-6" style={{ fontSize: 'clamp(2.8rem,7vw,6rem)', lineHeight: 0.95, letterSpacing: '0.02em' }}>
                READY TO BUILD<br />
                <span className="shimmer-orange">SOMETHING AMAZING?</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
                Let's collaborate and create exceptional digital experiences that drive your business forward.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-black px-10 py-4 rounded-full text-base shadow-xl shadow-orange-500/30">
                  Start a Project
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link href="/about" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold px-10 py-4 rounded-full text-base border-2 border-gray-200 dark:border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300">
                  Learn More About Me
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}