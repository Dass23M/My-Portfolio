'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home',     href: '/',         num: '01' },
  { name: 'About',    href: '/about',    num: '02' },
  { name: 'Services', href: '/services', num: '03' },
  { name: 'Projects', href: '/projects', num: '04' },
  { name: 'Blog',     href: '/blog',     num: '05' },
  { name: 'Contact',  href: '/contact',  num: '06' },
];

/* ── Desktop nav ── */
function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              group relative px-4 py-2 flex flex-col items-center gap-0
              transition-all duration-300
              ${isActive ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}
            `}
          >
            {/* number */}
            <span className={`
              font-[family-name:var(--font-mono)] text-[9px] tracking-widest leading-none mb-0.5
              transition-all duration-300
              ${isActive ? 'text-orange-500 opacity-100' : 'opacity-0 group-hover:opacity-60 text-orange-400'}
            `}>
              {item.num}
            </span>

            {/* label in Bebas Neue */}
            <span className="font-[family-name:var(--font-display)] text-[17px] tracking-[0.12em] leading-none">
              {item.name}
            </span>

            {/* active / hover underline */}
            <span className={`
              absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-orange-500
              transition-all duration-300
              ${isActive ? 'w-4/5' : 'w-0 group-hover:w-1/2'}
            `} />

            {/* hover bg pill */}
            <span className={`
              absolute inset-0 rounded-lg bg-orange-500/0 group-hover:bg-orange-500/6
              dark:group-hover:bg-orange-500/10 transition-all duration-300
              ${isActive ? 'bg-orange-500/8 dark:bg-orange-500/12' : ''}
            `} />
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Mobile nav (full-screen overlay) ── */
function MobileNav({ onItemClick }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col h-full justify-center px-8 py-12">
      {navigation.map((item, i) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className="group relative flex items-center gap-5 py-5 border-b border-gray-100 dark:border-white/5 last:border-0"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* index number */}
            <span className={`
              font-[family-name:var(--font-mono)] text-xs tracking-widest w-8 shrink-0
              transition-colors duration-300
              ${isActive ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600 group-hover:text-orange-400'}
            `}>
              {item.num}
            </span>

            {/* nav label */}
            <span className={`
              font-[family-name:var(--font-display)] tracking-[0.15em] transition-all duration-300
              group-hover:translate-x-2
              ${isActive
                ? 'text-orange-500 text-5xl'
                : 'text-gray-800 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white text-4xl'}
            `}
              style={{ fontSize: isActive ? '2.8rem' : '2.4rem', lineHeight: 1 }}
            >
              {item.name.toUpperCase()}
            </span>

            {/* active dot */}
            {isActive && (
              <span className="ml-auto w-2 h-2 rounded-full bg-orange-500 shrink-0 animate-pulse" />
            )}

            {/* hover arrow */}
            {!isActive && (
              <span className="ml-auto text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 text-xl shrink-0">
                →
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navigation({ mobile, onItemClick }) {
  if (mobile) return <MobileNav onItemClick={onItemClick} />;
  return <DesktopNav />;
}