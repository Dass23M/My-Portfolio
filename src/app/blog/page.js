'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon, CalendarIcon, ClockIcon, EyeIcon,
  ArrowRightIcon, BookmarkIcon, FunnelIcon, SparklesIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setBlogPosts(data.data || []);
      } catch {
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', 'React', 'Next.js', 'Node.js', 'Python', 'Database', 'DevOps', 'UI/UX', 'Career', 'Tutorial'];

  const filteredPosts = blogPosts.filter(post => {
    const q = searchQuery.toLowerCase();
    const matchSearch = post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.tags.some(t => t.toLowerCase().includes(q));
    return matchSearch && (selectedCategory === 'All' || post.category === selectedCategory || post.tags.includes(selectedCategory));
  });

  const featuredPosts = blogPosts.filter(p => p.featured);

  const toggleBookmark = (id) => {
    setBookmarkedPosts(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const formatDate = d => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return (
    <div className="bg-white dark:bg-[#0b0f19] min-h-screen pt-16 lg:pt-20">
      <div className="py-16 px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
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
        <div className="text-5xl mb-4">⚠️</div>
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
              Developer Blog
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              Insights & Tutorials on <span className="text-orange-500">Full-Stack Development</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Sharing knowledge, experiences, and best practices from my journey as a full-stack developer.
            </p>

            {/* Search + Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/90 dark:bg-white/[0.04] backdrop-blur-sm rounded-2xl p-3 border border-gray-100 dark:border-white/10 shadow-lg">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-transparent text-gray-900 dark:text-white rounded-xl focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-600"
                  />
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

      {/* ── Featured Articles ── */}
      {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
          <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 mb-3">Highlighted</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Featured Articles</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white dark:bg-[#0f1422] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-56">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/10 flex items-center justify-center">
                      <div className="text-5xl">📚</div>
                    </div>
                    <div className="absolute top-4 left-4"><span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-bold">{post.category}</span></div>
                    <button onClick={() => toggleBookmark(post.id)} className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full">
                      {bookmarkedPosts.has(post.id) ? <BookmarkSolidIcon className="w-5 h-5 text-orange-500" /> : <BookmarkIcon className="w-5 h-5 text-gray-500" />}
                    </button>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" />{formatDate(post.publishDate)}</span>
                      <span className="flex items-center gap-1.5"><ClockIcon className="w-4 h-4" />{post.readTime}</span>
                      <span className="flex items-center gap-1.5"><EyeIcon className="w-4 h-4" />{post.views?.toLocaleString()}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 rounded-lg text-xs font-semibold">#{tag}</span>)}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-400 font-bold text-sm transition-colors duration-300">
                        Read More <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Articles ── */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1422] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Articles'}
            </h2>
            <span className="text-sm text-gray-500">{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 leading-relaxed mb-6">Try adjusting your search or filter criteria</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-44">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/10 flex items-center justify-center">
                      <div className="text-3xl">📝</div>
                    </div>
                    <div className="absolute top-3 left-3"><span className="px-2 py-1 bg-orange-500 text-white rounded-lg text-xs font-bold">{post.category}</span></div>
                    <button onClick={() => toggleBookmark(post.id)} className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
                      {bookmarkedPosts.has(post.id) ? <BookmarkSolidIcon className="w-4 h-4 text-orange-500" /> : <BookmarkIcon className="w-4 h-4 text-gray-500" />}
                    </button>
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <span>{formatDate(post.publishDate)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.views?.toLocaleString()} views</span>
                    </div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-500 rounded text-xs">#{tag}</span>)}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-orange-500 hover:text-orange-400 text-sm font-bold transition-colors duration-300">Read →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-orange-500/20">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Stay Updated</h2>
              <p className="text-xl text-orange-100 leading-relaxed mb-8 max-w-xl mx-auto">
                Get the latest articles, tutorials, and insights delivered to your inbox. Join 1,000+ developers.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 text-sm" />
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-xl font-bold transition-colors duration-300 whitespace-nowrap text-sm">
                    Subscribe
                  </button>
                </div>
                <p className="text-orange-100 text-sm mt-3">No spam, unsubscribe anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
