'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation({ mobile, onItemClick }) {
  const pathname = usePathname();

  const baseClasses = mobile
    ? 'flex flex-col space-y-1 px-6 py-8'
    : 'flex space-x-1';

  return (
    <nav className={baseClasses}>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className={`
              ${mobile
                ? 'block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200'
                : 'px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200'}
              ${isActive
                ? 'text-orange-500 bg-orange-500/10'
                : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-500/10 dark:hover:bg-orange-500/10'}
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
