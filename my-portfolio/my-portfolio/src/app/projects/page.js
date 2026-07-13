'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MagnifyingGlassIcon, EyeIcon, CodeBracketSquareIcon,
  CalendarIcon, SparklesIcon, FunnelIcon, HeartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProjects(data.data || []);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain'];

  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q));
    return matchSearch && (selectedCategory === 'All' || p.category === selectedCategory);
  });

  const featuredProjects = projects.filter(p => p.featured);

  const toggleLike = async (id) => {
    setLikedProjects(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    try { await fetch(`${API_URL}/api/projects/${id}/like`, { method: 'POST' }); } catch {}
  };

  const formatDate = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  const statusCls = (s) => ({
    'Completed': 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400',
    'In Progress': 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400',
    'Planning': 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-400',
  }[s] || 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-400');

  if (loading) return (
    <div className="bg-white dark:bg-[#0b0f19] min-h-screen pt-16 lg:pt-20">
      <div className="py-16 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#0f1422] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-white/10" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-gray-100 dark:bg-white/5 rounded" />
                <div className="h-4 bg-gray-100 dark:bg-white/5 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-white dark:bg-[#0b0f19] min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-6">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Oops!</h2>
        <p className="text-gray-500 mb-6 leading-relaxed">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#0b0f19] transition-colors duration-300 pt-16 lg:pt-20">

      {/* ── Hero ── */}
      <section className="relative py-16 lg:py-24 bg-orange-50 dark:bg-[#0f1422] overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-orange-200/30 dark:bg-orange-500/8 filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-300/20 dark:bg-orange-600/6 filter blur-3xl" />
        <div className="relative mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 mb-6">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Portfolio Projects
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              My Recent <span className="text-orange-500">Work & Projects</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Explore my latest projects showcasing full-stack development, modern web technologies, and creative solutions.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/90 dark:bg-white/[0.04] backdrop-blur-sm rounded-2xl p-3 border border-gray-100 dark:border-white/10 shadow-lg">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Search projects…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-transparent text-gray-900 dark:text-white rounded-xl focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-600" />
                </div>
                <div className="relative">
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="appearance-none bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl px-4 py-3 pr-9 focus:outline-none text-sm w-full sm:w-auto">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <FunnelIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      {featuredProjects.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
          <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 mb-3">Highlighted</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Featured Projects</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <article key={project.id} className={`group bg-white dark:bg-[#0f1422] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="relative h-56">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/10">
                      {project.image && !project.image.includes('placeholder')
                        ? <Image src={project.image} alt={project.title} fill className="object-cover" sizes="50vw" />
                        : <div className="absolute inset-0 flex items-center justify-center text-5xl">🚀</div>}
                    </div>
                    <div className="absolute top-4 left-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${statusCls(project.status)}`}>{project.status}</span></div>
                    <button onClick={() => toggleLike(project.id)} className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full">
                      {likedProjects.has(project.id) ? <HeartSolidIcon className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5 text-gray-600" />}
                    </button>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" />{formatDate(project.date)}</span>
                      <span className="flex items-center gap-1.5"><EyeIcon className="w-4 h-4" />{project.views?.toLocaleString()}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-5 line-clamp-3">{project.longDescription || project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map(t => <span key={t} className="px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-xs font-bold">{t}</span>)}
                      {project.technologies.length > 4 && <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 rounded-full text-xs">+{project.technologies.length - 4}</span>}
                    </div>
                    <div className="flex gap-3">
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"><EyeIcon className="w-4 h-4" />Live Demo</a>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 px-5 py-2.5 rounded-xl font-bold text-sm border border-gray-200 dark:border-white/10 hover:border-orange-500/30 transition-all duration-300"><CodeBracketSquareIcon className="w-4 h-4" />Source</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Projects ── */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1422] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Projects'}
            </h2>
            <span className="text-sm text-gray-500">{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">Try adjusting your search or filter criteria</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`group bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="relative h-44">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/10">
                      {project.image && !project.image.includes('placeholder')
                        ? <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                        : <div className="absolute inset-0 flex items-center justify-center text-3xl">📱</div>}
                    </div>
                    <div className="absolute top-3 left-3"><span className="px-2 py-1 bg-orange-500 text-white rounded-lg text-xs font-bold">{project.category}</span></div>
                    <button onClick={() => toggleLike(project.id)} className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-lg">
                      {likedProjects.has(project.id) ? <HeartSolidIcon className="w-4 h-4 text-red-500" /> : <HeartIcon className="w-4 h-4 text-gray-600" />}
                    </button>
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{formatDate(project.date)}</span>
                      <span>{project.views?.toLocaleString()} views</span>
                    </div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 3).map(t => <span key={t} className="px-2 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded text-xs font-semibold">{t}</span>)}
                      {project.technologies.length > 3 && <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 rounded text-xs">+{project.technologies.length - 3}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      {project.liveUrl
                        ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 text-sm font-bold transition-colors duration-300">View Project →</a>
                        : <span className="text-gray-400 text-sm">Coming Soon</span>}
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-orange-500 transition-colors duration-300"><CodeBracketSquareIcon className="w-5 h-5" /></a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Like What You See?</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              I'm always working on new projects and looking for exciting opportunities to collaborate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 w-full sm:w-auto text-center">
                Start a Project
              </Link>
              <Link href="/about" className="text-orange-500 hover:text-orange-400 px-8 py-4 rounded-full font-bold text-base border border-orange-200 dark:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 w-full sm:w-auto text-center">
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
