'use client';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  FolderIcon, PlusIcon, PencilIcon, TrashIcon,
  MagnifyingGlassIcon, XMarkIcon, CheckIcon
} from '@heroicons/react/24/outline';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const EMPTY_FORM = {
  title: '', description: '', longDescription: '', image: '',
  technologies: '', category: 'Full-Stack', liveUrl: '', githubUrl: '',
  featured: false, date: '', status: 'Completed', likes: 0, views: 0,
};

export default function AdminProjects() {
  const { getToken } = useAdminAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const headers = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`, { headers: { Authorization: `Bearer ${getToken()}` } });
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (project) => {
    setEditing(project._id);
    setForm({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };
      const url = editing ? `${API_URL}/api/projects/${editing}` : `${API_URL}/api/projects`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
      if (res.ok) {
        await fetchProjects();
        setShowModal(false);
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE', headers: headers(),
      });
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
    finally { setDeleteId(null); }
  };

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain', 'Web'];
  const statusOpts = ['Completed', 'In Progress', 'Planning'];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FolderIcon className="w-8 h-8 text-blue-400" />
            Projects
          </h1>
          <p className="text-gray-400 mt-1">{projects.length} projects total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No projects found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-xs font-medium px-6 py-4">Project</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Category</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Status</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Featured</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-4">Date</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map(project => (
                  <tr key={project._id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white text-sm font-medium line-clamp-1">{project.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg text-xs">{project.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs ${project.status === 'Completed' ? 'bg-green-500/10 text-green-300' : project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-300' : 'bg-yellow-500/10 text-yellow-300'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {project.featured ? (
                        <span className="flex items-center gap-1 text-yellow-400 text-xs"><CheckIcon className="w-3.5 h-3.5" /> Yes</span>
                      ) : <span className="text-gray-600 text-xs">No</span>}
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-xs">{project.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(project)} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteId(project._id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
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
              <h2 className="text-white font-semibold text-lg">{editing ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Title *', key: 'title', type: 'text', placeholder: 'Project name' },
                { label: 'Description *', key: 'description', type: 'textarea', placeholder: 'Short description' },
                { label: 'Long Description', key: 'longDescription', type: 'textarea', placeholder: 'Detailed description' },
                { label: 'Image Path', key: 'image', type: 'text', placeholder: '/project-image.png' },
                { label: 'Technologies (comma separated)', key: 'technologies', type: 'text', placeholder: 'React, Node.js, MongoDB' },
                { label: 'Live URL', key: 'liveUrl', type: 'text', placeholder: 'https://...' },
                { label: 'GitHub URL', key: 'githubUrl', type: 'text', placeholder: 'https://github.com/...' },
                { label: 'Date', key: 'date', type: 'text', placeholder: '2025' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={form[field.key] || ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      rows={3}
                      placeholder={field.placeholder}
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-sm resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[field.key] || ''}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  )}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-sm">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-sm">
                    {statusOpts.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded accent-blue-500"
                />
                <label htmlFor="featured" className="text-gray-300 text-sm">Featured project</label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</> : (editing ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-white font-semibold text-lg mb-2">Delete Project?</h2>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

