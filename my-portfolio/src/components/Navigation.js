import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation({ mobile, onItemClick }) {
  const baseClasses = mobile 
    ? 'flex flex-col space-y-4 px-6 py-8'
    : 'flex space-x-8';

  return (
    <nav className={baseClasses}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onItemClick}
          className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}