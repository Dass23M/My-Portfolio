'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
  const skills = ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS'];
  
  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation for roles
    const typeRole = () => {
      const role = roles[currentRole];
      let i = 0;
      setTypedText('');
      
      const typing = setInterval(() => {
        if (i < role.length) {
          setTypedText(role.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }, 2000);
        }
      }, 100);
    };
    
    typeRole();
    const roleInterval = setInterval(typeRole, 4000);
    
    return () => clearInterval(roleInterval);
  }, [currentRole]);

  const technologies = [
    { name: 'Frontend', icon: DevicePhoneMobileIcon, items: ['React', 'Next.js', 'Vue.js', 'TypeScript'] },
    { name: 'Backend', icon: CommandLineIcon, items: ['Node.js', 'Python', 'Express', 'FastAPI'] },
    { name: 'Database', icon: CpuChipIcon, items: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma'] },
    { name: 'Cloud', icon: CloudIcon, items: ['AWS', 'Vercel', 'Docker', 'Kubernetes'] }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      image: '/api/placeholder/600/400',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management with Socket.io and JWT authentication',
      image: '/api/placeholder/600/400',
      tags: ['Next.js', 'Socket.io', 'PostgreSQL', 'JWT'],
      link: '#'
    },
    {
      title: 'AI Analytics Dashboard',
      description: 'Machine learning dashboard for business analytics with Python and React',
      image: '/api/placeholder/600/400',
      tags: ['Python', 'React', 'TensorFlow', 'D3.js'],
      link: '#'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '20+', label: 'Happy Clients' },
    { number: '100%', label: 'Success Rate' }
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-20 sm:top-40 left-4 sm:left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 sm:bottom-20 left-8 sm:left-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-4 sm:mb-6">
                <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  👋 Welcome to my portfolio
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-4 sm:mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="text-blue-600 relative block sm:inline">
                  Methmal
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform scale-x-0 animate-scale-x" />
                </span>
              </h1>
              
              <div className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 h-6 sm:h-8">
                <span className="font-medium text-blue-600">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              
              <p className="text-base sm:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                I create exceptional digital experiences through innovative full-stack development. 
                Specializing in modern web technologies, scalable architecture, and user-centered design 
                that drives business growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  href="#projects"
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <span>View My Work</span>
                  <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <Link
                  href="#contact"
                  className="group text-black hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 flex items-center space-x-2 hover:bg-blue-50 w-full sm:w-auto justify-center"
                >
                  <span>Get in Touch</span>
                  <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              
              {/* Skills Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`px-2 sm:px-3 py-1 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full text-xs sm:text-sm font-medium border border-gray-200 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className={`relative transition-all duration-1000 delay-500 mt-8 lg:mt-0 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Code Window */}
                <div className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  {/* Window Header */}
                  <div className="bg-gray-800 px-3 sm:px-6 py-2 sm:py-4 flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-xs sm:text-sm ml-2 sm:ml-4 truncate">methmal-portfolio.tsx</span>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-3 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                    <div className="text-blue-400">const <span className="text-yellow-300">developer</span> = {`{`}</div>
                    <div className="ml-2 sm:ml-4 text-gray-300">
                      <div>name: <span className="text-green-400">'Methmal'</span>,</div>
                      <div>role: <span className="text-green-400">'Full-Stack Developer'</span>,</div>
                      <div>skills: [</div>
                      <div className="ml-2 sm:ml-4">
                        <div><span className="text-green-400">'React'</span>, <span className="text-green-400">'Next.js'</span>,</div>
                        <div><span className="text-green-400">'Node.js'</span>, <span className="text-green-400">'Python'</span>,</div>
                        <div><span className="text-green-400">'MongoDB'</span>, <span className="text-green-400">'AWS'</span></div>
                      </div>
                      <div>],</div>
                      <div>passion: <span className="text-green-400">'Building amazing apps'</span></div>
                    </div>
                    <div className="text-blue-400">{`};`}</div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <CodeBracketIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <GlobeAltIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
              Technologies I Work With
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              I use cutting-edge technologies to build scalable, performant applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={tech.name}
                  className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">{tech.name}</h3>
                  <div className="space-y-1">
                    {tech.items.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section id="projects" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              A selection of my recent full-stack development projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-3xl sm:text-4xl">🚀</div>
                  </div>
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 text-sm sm:text-base"
                  >
                    View Project
                    <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
            >
              View All Projects
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's collaborate and create exceptional digital experiences that drive your business forward.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="#contact"
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 w-full sm:w-auto text-center"
            >
              Start a Project
            </Link>
            
            <Link
              href="/about"
              className="text-white hover:text-blue-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 border border-white/20 hover:bg-white/10 w-full sm:w-auto text-center"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}