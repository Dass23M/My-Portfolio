'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
import {
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

function AdminLayoutInner({ children }) {
  const { admin, loading, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Only redirect from protected pages â€” never from the login page itself
    if (!loading && !admin && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [admin, loading, router, isLoginPage]);

  // On the login page: just render children without sidebar or auth spinner
  if (isLoginPage) {
    return <>{children}</>;
  }

  // On protected pages: show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Not logged in â†’ render nothing (redirect is happening via useEffect)
  if (!admin) return null;

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { href: '/admin/projects', label: 'Projects', icon: FolderIcon },
    { href: '/admin/blog', label: 'Blog Posts', icon: DocumentTextIcon },
    { href: '/admin/contacts', label: 'Messages', icon: EnvelopeIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">
              M
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Admin Panel</p>
              <p className="text-gray-400 text-xs">Portfolio Manager</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-blue-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <UserCircleIcon className="w-8 h-8 text-blue-400" />
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{admin.name}</p>
              <p className="text-gray-400 text-xs truncate capitalize">{admin.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 text-sm font-medium"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}

