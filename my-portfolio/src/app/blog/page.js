'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  TagIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ShareIcon,
  FunnelIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  BookmarkIcon as BookmarkSolidIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/solid';

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    'All',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Database',
    'DevOps',
    'UI/UX',
    'Career',
    'Tutorial'
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications with Next.js 14',
      excerpt: 'Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with the new App Router, Server Components, and more.',
      content: 'Full article content here...',
      author: 'Methmal',
      publishDate: '2024-01-15',
      readTime: '8 min read',
      category: 'Next.js',
      tags: ['React', 'Next.js', 'Performance', 'Web Development'],
      featured: true,
      views: 2845,
      likes: 127,
      image: '/api/placeholder/800/400',
      slug: 'building-scalable-react-applications-nextjs-14'
    },
    {
      id: 2,
      title: 'Mastering Database Design: MongoDB vs PostgreSQL',
      excerpt: 'A comprehensive comparison of NoSQL and SQL databases, when to use each, and best practices for data modeling in modern applications.',
      content: 'Full article content here...',
      author: 'Methmal',
      publishDate: '2024-01-10',
      readTime: '12 min read',
      category: 'Database',
      tags: ['MongoDB', 'PostgreSQL', 'Database', 'Backend'],
      featured: true,
      views: 3204,
      likes: 189,
      image: '/api/placeholder/800/400',
      slug: 'mastering-database-design-mongodb-vs-postgresql'
    },
    {
      id: 3,
      title: 'API Design Best Practices for RESTful Services',
      excerpt: 'Learn how to design clean, maintainable, and scalable REST APIs with proper error handling, versioning, and documentation.',
      content: 'Full article content here...',
      author: 'Methmal',
      publishDate: '2024-01-05',
      readTime: '10 min read',
      category: 'Node.js',
      tags: ['API', 'REST', 'Node.js', 'Backend', 'Best Practices'],
      featured: false,
      views: 1876,
      likes: 94,
      image: '/api/placeholder/800/400',
      slug: 'api-design-best-practices-restful-services'
    },
    {
      id: 4,
      title: 'Modern CSS Techniques for Better User Interfaces',
      excerpt: 'Discover advanced CSS techniques including Grid, Flexbox, Custom Properties, and Container Queries for creating responsive, modern web interfaces.',
      content: 'Full article content here...',
      author: 'Methmal',
      publishDate: '2023-12-28',
      readTime: '7 min read',
      category: 'UI/UX',
      tags: ['CSS', 'Frontend', 'UI/UX', 'Responsive Design'],
      featured: false,
      views: 2156,
      likes: 156,
      image: '/api/placeholder/800/400',
      slug: 'modern-css-techniques-better-user-interfaces'
    },
    {
      id: 5,
      title: 'From Junior to Senior: My Full-Stack Developer Journey',
      excerpt: 'Personal insights and lessons learned during my journey from a junior developer to a senior full-stack developer, including key milestones and advice.',
      content: 'Full article content here...',
      author: 'Methmal',
      publishDate: '2023-12-20',
      readTime: '15 min read',
      category: 'Career',
      tags: ['Career', 'Personal', 'Growth', 'Advice'],
      featured: false,
      views: 4521,
      likes: 298,
      image: '/api/placeholder/800/400',
      slug: 'from-junior-to-senior-fullstack-developer-journey'
    },
    {
      id: 6,
      title: 'Deploying Full-Stack Applications on AWS',
      excerpt: 'Step-by-step guide to deploying React and Node.js applications on AWS using EC2, RDS, S3, and CloudFront for optimal performance.',
      content: 'Full article content here...',
      author: 'Methmal',
      publishDate: '2023-12-15',
      readTime: '18 min read',
      category: 'DevOps',
      tags: ['AWS', 'DevOps', 'Deployment', 'Cloud', 'Tutorial'],
      featured: false,
      views: 1643,
      likes: 87,
      image: '/api/placeholder/800/400',
      slug: 'deploying-fullstack-applications-aws'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
                           post.category === selectedCategory ||
                           post.tags.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 4);

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(postId)) {
        newBookmarks.delete(postId);
      } else {
        newBookmarks.add(postId);
      }
      return newBookmarks;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Developer Blog
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Insights & Tutorials on
              <span className="text-blue-600"> Full-Stack Development</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Sharing knowledge, experiences, and best practices from my journey as a full-stack developer. 
              From React to Node.js, databases to deployment - let's learn and grow together.
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-12 text-center">Featured Articles</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div className="text-4xl">📚</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Bookmark */}
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                    >
                      {bookmarkedPosts.has(post.id) ? (
                        <BookmarkSolidIcon className="w-5 h-5 text-blue-600" />
                      ) : (
                        <BookmarkIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
                      >
                        Read More
                        <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-black">
              {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Articles'}
            </h2>
            <span className="text-gray-500">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-black mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div className="text-3xl">📝</div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Bookmark */}
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-300"
                    >
                      {bookmarkedPosts.has(post.id) ? (
                        <BookmarkSolidIcon className="w-4 h-4 text-blue-600" />
                      ) : (
                        <BookmarkIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                      <span>{formatDate(post.publishDate)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-300"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and insights delivered directly to your inbox. 
                Join 1000+ developers who trust my content.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-blue-100 text-sm mt-3">
                  No spam, unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}