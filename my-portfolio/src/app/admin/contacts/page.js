'use client';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  EnvelopeIcon, TrashIcon, EyeIcon, CheckCircleIcon,
  ChatBubbleLeftIcon, MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminContacts() {
  const { getToken } = useAdminAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setContacts(data.data || []);
    } catch (err) {
      console.error('Fetch contacts error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status }),
      });
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
      if (selectedContact?._id === id) setSelectedContact(prev => ({ ...prev, status }));
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const filteredContacts = contacts.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColors = {
    new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    read: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    replied: 'bg-green-500/20 text-green-300 border-green-500/30',
  };

  const counts = {
    all: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length,
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <EnvelopeIcon className="w-8 h-8 text-blue-400" />
          Messages
        </h1>
        <p className="text-gray-400 mt-1">Manage all contact form submissions</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {Object.entries(counts).map(([key, count]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 border border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {key} ({count})
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact List */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 bg-gray-800 rounded" />
                    <div className="h-3 w-full bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No messages found.</div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredContacts.map(contact => (
                <div
                  key={contact._id}
                  onClick={() => { setSelectedContact(contact); updateStatus(contact._id, 'read'); }}
                  className={`p-4 cursor-pointer flex items-start gap-3 hover:bg-gray-800/60 transition-colors ${
                    selectedContact?._id === contact._id ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium">{contact.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[contact.status]}`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs truncate">{contact.message}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          {selectedContact ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{selectedContact.name}</h3>
                    <p className="text-gray-400 text-sm">{selectedContact.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs border ${statusColors[selectedContact.status]}`}>
                  {selectedContact.status}
                </span>
              </div>

              <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">{selectedContact.message}</p>
              </div>

              <div className="text-gray-500 text-xs mb-6">
                Received: {new Date(selectedContact.createdAt).toLocaleString()}
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(selectedContact._id, 'replied')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Mark Replied
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: Your Portfolio Message`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  Reply via Email
                </a>
                <button
                  onClick={() => updateStatus(selectedContact._id, 'new')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-sm font-medium transition-colors"
                >
                  Mark as New
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ChatBubbleLeftIcon className="w-12 h-12 text-gray-700 mb-3" />
              <p className="text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

