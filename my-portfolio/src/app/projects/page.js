'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  CodeBracketSquareIcon,
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  TagIcon,
  SparklesIcon,
  FunnelIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedProjects, setLikedProjects] = useState(new Set());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock projects data - replace with your actual data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing with Stripe, inventory management, and admin dashboard.',
      longDescription: 'Complete e-commerce platform with advanced features including real-time inventory tracking, order management, customer analytics, and multi-vendor support.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      category: 'Full-Stack',
      liveUrl: 'https://demo-ecommerce.vercel.app',
      githubUrl: 'https://github.com/methmal/ecommerce-platform',
      featured: true,
      date: '2024-01-15',
      status: 'Completed',
      likes: 142,
      views: 2856
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time collaborative task management application with drag-and-drop functionality, team collaboration, and progress tracking.',
      longDescription: 'Comprehensive project management tool with Kanban boards, team chat, file sharing, time tracking, and detailed reporting features.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'JWT', 'Material-UI'],
      category: 'Frontend',
      liveUrl: 'https://taskflow-demo.netlify.app',
      githubUrl: 'https://github.com/methmal/task-manager',
      featured: true,
      date: '2023-12-10',
      status: 'Completed',
      likes: 89,
      views: 1743
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Modern weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      longDescription: 'Advanced weather application featuring 7-day forecasts, weather alerts, historical data analysis, and beautiful data visualizations.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Mapbox'],
      category: 'Frontend',
      liveUrl: 'https://weather-pro-dashboard.netlify.app',
      githubUrl: 'https://github.com/methmal/weather-dashboard',
      featured: false,
      date: '2023-11-20',
      status: 'Completed',
      likes: 67,
      views: 1234
    },
    {
      id: 4,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool using OpenAI API for creating blog posts, social media content, and marketing copy.',
      longDescription: 'Intelligent content creation platform with multiple templates, SEO optimization suggestions, and content scheduling features.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'FastAPI', 'OpenAI API', 'React', 'Redis', 'Docker'],
      category: 'Full-Stack',
      liveUrl: 'https://ai-content-gen.vercel.app',
      githubUrl: 'https://github.com/methmal/ai-content-generator',
      featured: true,
      date: '2023-10-05',
      status: 'Completed',
      likes: 198,
      views: 3421
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Responsive portfolio website built with Next.js, featuring modern animations, contact forms, and CMS integration.',
      longDescription: 'Professional portfolio website with blog functionality, project showcase, contact management, and admin panel for content updates.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS', 'Vercel'],
      category: 'Frontend',
      liveUrl: 'https://methmal-portfolio.vercel.app',
      githubUrl: 'https://github.com/methmal/portfolio-v2',
      featured: false,
      date: '2023-09-15',
      status: 'Completed',
      likes: 134,
      views: 2187
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Secure voting platform built on Ethereum blockchain ensuring transparency and immutability of voting records.',
      longDescription: 'Decentralized voting application with smart contracts, voter verification, real-time results, and audit trail functionality.',
      image: '/api/placeholder/600/400',
      technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum', 'MetaMask', 'IPFS'],
      category: 'Blockchain',
      liveUrl: 'https://blockchain-vote.netlify.app',
      githubUrl: 'https://github.com/methmal/blockchain-voting',
      featured: false,
      date: '2023-08-20',
      status: 'In Progress',
      likes: 76,
      views: 1456
    }
  ];

  const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'Mobile', 'Blockchain'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = projects.filter(project => project.featured);

  const toggleLike = (projectId) => {
    setLikedProjects(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(projectId)) {
        newLikes.delete(projectId);
      } else {
        newLikes.add(projectId);
      }
      return newLikes;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Portfolio Projects
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6">
              My Recent
              <span className="text-blue-600"> Work & Projects</span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4">
              Explore my latest projects showcasing full-stack development, modern web technologies, 
              and creative solutions to real-world problems.
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <FunnelIcon className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8 sm:mb-12 text-center">Featured Projects</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <article
                  key={project.id}
                  className={`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div className="text-3xl sm:text-4xl">🚀</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                    >
                      {likedProjects.has(project.id) ? (
                        <HeartSolidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{formatDate(project.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{project.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{project.likes}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-3">
                      {project.longDescription || project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <EyeIcon className="w-4 h-4 mr-1.5 sm:mr-2" />
                        Live Demo
                      </a>
                      
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-300 border border-gray-200 hover:bg-gray-50"
                      >
                        <CodeBracketSquareIcon className="w-4 h-4 mr-1.5 sm:mr-2" />
                        Source Code
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Projects'}
            </h2>
            <span className="text-gray-500 text-sm sm:text-base">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative">
                    <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <div className="text-2xl sm:text-3xl">📱</div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className="px-2 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-300"
                    >
                      {likedProjects.has(project.id) ? (
                        <HeartSolidIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                      <span>{formatDate(project.date)}</span>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span>{project.views.toLocaleString()} views</span>
                        <span>{project.likes} likes</span>
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-black mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold transition-colors duration-300"
                      >
                        View Project →
                      </a>
                      
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      >
                        <CodeBracketSquareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">
            Like What You See?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            I'm always working on new projects and looking for exciting opportunities to collaborate. 
            Let's create something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto text-center"
            >
              Start a Project
            </Link>
            
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 border border-blue-200 hover:bg-blue-50 w-full sm:w-auto text-center"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}