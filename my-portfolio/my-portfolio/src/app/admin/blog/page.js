'use client';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  DocumentTextIcon, PlusIcon, PencilIcon, TrashIcon,
  MagnifyingGlassIcon, XMarkIcon, CheckIcon
} from '@heroicons/react/24/outline';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const CATS = ['React', 'Next.js', 'Node.js', 'Python', 'Database', 'DevOps', 'UI/UX', 'Career', 'Tutorial'];

const EMPTY_FORM = {
  title: '', excerpt: '', content: '', author: 'Methmal',
  publishDate: new Date().toISOString().split('T')[0],
  readTime: '5 min read', category: 'React', tags: '',
  featured: false, slug: '', image: '', published: true,
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminBlog() {
  const { getToken } = useAdminAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  });

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog`, { headers: { Authorization: `Bearer ${getToken()}` } });
      const data = await res.json();
      setPosts(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (post) => {
    setEditing(post._id);
    setForm({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        slug: form.slug || slugify(form.title),
      };
      const url = editing ? `${API_URL}/api/blog/${editing}` : `${API_URL}/api/blog`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
      if (res.ok) {
        await fetchPosts();
        setShowModal(false);
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save post');
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/blog/${id}`, { method: 'DELETE', headers: headers() });
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
    finally { setDeleteId(null); }
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <DocumentTextIcon className="w-8 h-8 text-purple-400" />
            Blog Posts
          </h1>
          <p className="text-gray-400 mt-1">{posts.length} articles total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-purple-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No blog posts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Title</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Category</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Featured</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Views</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Date</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map(post => (
                  <tr key={post._id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white text-sm font-medium line-clamp-1">{post.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 font-mono">{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-xs">{post.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      {post.featured
                        ? <span className="flex items-center gap-1 text-yellow-400 text-xs"><CheckIcon className="w-3.5 h-3.5" /> Yes</span>
                        : <span className="text-gray-600 text-xs">No</span>}
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-xs">{post.views?.toLocaleString() ?? 0}</td>
                    <td className="px-4 py-4 text-gray-400 text-xs">{post.publishDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(post)} className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-colors">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteId(post._id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-white font-semibold text-lg">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Title *</label>
                <input type="text" value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
                  placeholder="Blog post title"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm" />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Slug *</label>
                <input type="text" value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm font-mono" />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Excerpt *</label>
                <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  rows={2} placeholder="Short summary shown in the blog list"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm resize-none" />
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Content * (HTML supported)</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  rows={6} placeholder="<p>Full article content...</p>"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm resize-none font-mono" />
              </div>

              {/* Row: Category + Publish Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm">
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Publish Date *</label>
                  <input type="date" value={form.publishDate} onChange={e => setForm({ ...form, publishDate: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm" />
                </div>
              </div>

              {/* Row: Read Time + Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Read Time</label>
                  <input type="text" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Author</label>
                  <input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}
                    placeholder="Methmal"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm" />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Tutorial, Web Development"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-sm" />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-purple-500" />
                  <span className="text-gray-300 text-sm">Featured post</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded accent-purple-500" />
                  <span className="text-gray-300 text-sm">Published</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</> : (editing ? 'Update' : 'Publish')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-white font-semibold text-lg mb-2">Delete Post?</h2>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

