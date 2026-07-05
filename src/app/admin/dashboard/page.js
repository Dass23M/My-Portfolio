'use client';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  EnvelopeIcon, FolderIcon, DocumentTextIcon,
  UsersIcon, EyeIcon, HeartIcon, ChartBarIcon
} from '@heroicons/react/24/outline';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const { admin, getToken } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [statsRes, contactsRes] = await Promise.all([
          fetch(`${API_URL}/api/stats`, { headers }),
          fetch(`${API_URL}/api/contact`, { headers }),
        ]);
        const statsData = await statsRes.json();
        const contactsData = await contactsRes.json();
        setStats(statsData.data);
        setRecentContacts((contactsData.data || []).slice(0, 5));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  const statCards = stats ? [
    { label: 'Total Projects', value: stats.projects?.total ?? 0, icon: FolderIcon, color: 'blue' },
    { label: 'Blog Posts', value: stats.blog?.totalPosts ?? 0, icon: DocumentTextIcon, color: 'purple' },
    { label: 'Messages', value: stats.contacts?.total ?? 0, icon: EnvelopeIcon, color: 'green' },
    { label: 'Subscribers', value: stats.newsletter?.subscribers ?? 0, icon: UsersIcon, color: 'orange' },
    { label: 'Total Views', value: stats.engagement?.totalViews?.toLocaleString() ?? 0, icon: EyeIcon, color: 'cyan' },
    { label: 'Total Likes', value: stats.engagement?.totalLikes?.toLocaleString() ?? 0, icon: HeartIcon, color: 'pink' },
  ] : [];

  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  };

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-300',
    read: 'bg-gray-500/20 text-gray-300',
    replied: 'bg-green-500/20 text-green-300',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="text-blue-400">{admin?.name?.split(' ')[0]}</span> ðŸ‘‹
        </h1>
        <p className="text-gray-400 mt-1">Here's what's happening with your portfolio today.</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
              <div className="h-8 w-8 bg-gray-700 rounded-lg mb-4" />
              <div className="h-8 w-16 bg-gray-700 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${colorMap[card.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-gray-400 text-sm">{card.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Portfolio Stats Card */}
      {stats && (
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-semibold">Portfolio Summary</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(stats.portfolio || {}).map(([key, val]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-blue-300">{val}</div>
                <div className="text-gray-400 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Messages */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-blue-400" />
            Recent Messages
          </h2>
          <a href="/admin/contacts" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            View all â†’
          </a>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-800 rounded" />
                  <div className="h-3 w-full bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : recentContacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages yet.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {recentContacts.map((contact) => (
              <div key={contact._id} className="p-4 flex items-start gap-4 hover:bg-gray-800/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{contact.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[contact.status] || statusColors.new}`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs truncate">{contact.message}</p>
                  <p className="text-gray-600 text-xs mt-1">{contact.email}</p>
                </div>
                <div className="text-gray-600 text-xs flex-shrink-0">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

