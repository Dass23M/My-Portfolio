'use client';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  StarIcon, PlusIcon, PencilIcon, TrashIcon,
  MagnifyingGlassIcon, XMarkIcon, CheckIcon,
  EyeIcon, EyeSlashIcon, UserCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const REVIEW_TYPES = [
  'Web Development', 'UI/UX Design', 'API/Backend',
  'E-Commerce', 'Consultation', 'Assignment Help',
];

const TYPE_COLORS = {
  'Web Development':  'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'UI/UX Design':     'bg-purple-500/10 text-purple-300 border-purple-500/20',
  'API/Backend':      'bg-green-500/10 text-green-300 border-green-500/20',
  'E-Commerce':       'bg-orange-500/10 text-orange-300 border-orange-500/20',
  'Consultation':     'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  'Assignment Help':  'bg-pink-500/10 text-pink-300 border-pink-500/20',
};

const EMPTY_FORM = {
  name: '', role: '', company: '', image: '',
  comment: '', rating: 5, reviewType: 'Web Development',
  featured: false, isPublished: true, order: 0,
};

function InitialsAvatar({ name, size = 'sm' }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  const colors = ['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-orange-500', 'bg-pink-600'];
  const color = colors[name?.charCodeAt(0) % colors.length] || 'bg-gray-600';
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  );
}

function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          {(hovered || value) >= star
            ? <StarSolid className="w-7 h-7 text-orange-400" />
            : <StarIcon className="w-7 h-7 text-gray-600" />}
        </button>
      ))}
      <span className="ml-2 text-gray-400 text-sm self-center">{value}/5</span>
    </div>
  );
}

export default function AdminReviews() {
  const { getToken } = useAdminAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews?all=true`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setReviews(data.data || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch reviews.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (review) => {
    setEditing(review._id);
    setForm({ ...review });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.role || !form.comment) {
      showToast('Name, Role, and Comment are required.', 'error');
      return;
    }
    setSaving(true);
    try {
      const url = editing
        ? `${API_URL}/api/reviews/${editing}`
        : `${API_URL}/api/reviews`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchReviews();
        setShowModal(false);
        showToast(editing ? 'Review updated!' : 'Review created!');
      } else {
        showToast(data.message || 'Failed to save.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`${API_URL}/api/reviews/${deleteId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      setReviews(prev => prev.filter(r => r._id !== deleteId));
      showToast('Review deleted.');
    } catch (err) {
      console.error(err);
      showToast('Failed to delete.', 'error');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const togglePublished = async (review) => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/${review._id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ isPublished: !review.isPublished }),
      });
      if (res.ok) {
        setReviews(prev => prev.map(r =>
          r._id === review._id ? { ...r, isPublished: !r.isPublished } : r
        ));
        showToast(!review.isPublished ? 'Review published.' : 'Review unpublished.');
      }
    } catch (err) { console.error(err); }
  };

  const filtered = reviews.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.reviewType?.toLowerCase().includes(search.toLowerCase()) ||
    r.role?.toLowerCase().includes(search.toLowerCase())
  );

  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="p-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl font-medium text-sm shadow-xl transition-all
          ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <StarIcon className="w-8 h-8 text-orange-400" />
            Client Reviews
          </h1>
          <p className="text-gray-400 mt-1">{reviews.length} reviews · {reviews.filter(r => r.isPublished).length} published</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20"
        >
          <PlusIcon className="w-5 h-5" />
          Add Review
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, role, or type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-orange-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Loading reviews...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <StarIcon className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No reviews found. Add your first client review!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Client</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Type</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Rating</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Status</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Featured</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map(review => (
                  <tr key={review._id} className="hover:bg-gray-800/40 transition-colors">
                    {/* Client info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {review.image ? (
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-700"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <InitialsAvatar name={review.name} />
                        )}
                        <div>
                          <p className="text-white text-sm font-medium">{review.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{review.role}{review.company ? ` · ${review.company}` : ''}</p>
                        </div>
                      </div>
                    </td>
                    {/* Type */}
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 border rounded-lg text-xs font-medium ${TYPE_COLORS[review.reviewType] || 'bg-gray-700 text-gray-300'}`}>
                        {review.reviewType}
                      </span>
                    </td>
                    {/* Rating */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarSolid key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-orange-400' : 'text-gray-700'}`} />
                        ))}
                        <span className="text-gray-400 text-xs ml-1">{review.rating}</span>
                      </div>
                    </td>
                    {/* Published */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => togglePublished(review)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                          review.isPublished
                            ? 'bg-green-500/10 text-green-400 hover:bg-red-500/10 hover:text-red-400'
                            : 'bg-gray-700/50 text-gray-500 hover:bg-green-500/10 hover:text-green-400'
                        }`}
                        title={review.isPublished ? 'Click to unpublish' : 'Click to publish'}
                      >
                        {review.isPublished ? <EyeIcon className="w-3.5 h-3.5" /> : <EyeSlashIcon className="w-3.5 h-3.5" />}
                        {review.isPublished ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    {/* Featured */}
                    <td className="px-4 py-4">
                      {review.featured
                        ? <span className="flex items-center gap-1 text-orange-400 text-xs"><CheckIcon className="w-3.5 h-3.5" />Yes</span>
                        : <span className="text-gray-600 text-xs">No</span>}
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(review)}
                          className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(review._id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-white font-semibold text-lg">
                {editing ? 'Edit Review' : 'Add Client Review'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Image preview + URL */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Client Photo URL</label>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-14 h-14 rounded-full object-cover border-2 border-orange-500/40"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <InitialsAvatar name={form.name} size="lg" />
                    )}
                  </div>
                  <input
                    type="url"
                    value={form.image}
                    onChange={e => f('image', e.target.value)}
                    placeholder="https://... (paste any public image URL)"
                    className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1.5">Leave empty to show auto-generated initials avatar.</p>
              </div>

              {/* Name + Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => f('name', e.target.value)}
                    placeholder="Sarah Johnson"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Role / Title *</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={e => f('role', e.target.value)}
                    placeholder="Startup Founder"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Company <span className="text-gray-500">(optional)</span></label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => f('company', e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

              {/* Review Type + Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Review Type *</label>
                  <select
                    value={form.reviewType}
                    onChange={e => f('reviewType', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm"
                  >
                    {REVIEW_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={e => f('order', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Star Rating *</label>
                <StarRatingInput value={form.rating} onChange={v => f('rating', v)} />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Review Comment *</label>
                <textarea
                  value={form.comment}
                  onChange={e => f('comment', e.target.value)}
                  rows={4}
                  placeholder="What the client said about their experience..."
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 text-sm resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => f('isPublished', !form.isPublished)}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form.isPublished ? 'bg-orange-500' : 'bg-gray-700'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isPublished ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-gray-300 text-sm">Published</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => f('featured', !form.featured)}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form.featured ? 'bg-orange-500' : 'bg-gray-700'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-gray-300 text-sm">Featured</span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
              >
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving...</>
                ) : (editing ? 'Update Review' : 'Add Review')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-white font-semibold text-lg mb-2 text-center">Delete Review?</h2>
            <p className="text-gray-400 text-sm mb-6 text-center">
              This review will be permanently removed and will no longer appear on the services page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                {deleting ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
