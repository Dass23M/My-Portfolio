'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CodeBracketIcon,
  PaintBrushIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CogIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  SparklesIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: 'Full-Stack Web Development',
      description: 'Complete web applications with modern React, Next.js, and Node.js technologies.',
      icon: CodeBracketIcon,
      category: 'development',
      features: ['React & Next.js', 'Node.js & Express', 'Database Integration', 'API Development'],
      pricing: 'From $2,500',
      timeline: '4-8 weeks',
      color: 'blue'
    },
    {
      title: 'UI/UX Design & Development',
      description: 'User-centered design that creates engaging and intuitive digital experiences.',
      icon: PaintBrushIcon,
      category: 'design',
      features: ['Wireframing & Prototyping', 'Responsive Design', 'User Testing', 'Design Systems'],
      pricing: 'From $1,500',
      timeline: '2-4 weeks',
      color: 'purple'
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Custom online stores with payment integration and inventory management.',
      icon: DevicePhoneMobileIcon,
      category: 'development',
      features: ['Payment Integration', 'Inventory Management', 'Admin Dashboard', 'Mobile Responsive'],
      pricing: 'From $3,000',
      timeline: '6-10 weeks',
      color: 'green'
    },
    {
      title: 'API Development & Integration',
      description: 'RESTful APIs and third-party service integrations for seamless connectivity.',
      icon: CogIcon,
      category: 'development',
      features: ['REST API Development', 'Third-party Integration', 'Authentication', 'Documentation'],
      pricing: 'From $1,000',
      timeline: '2-4 weeks',
      color: 'orange'
    },
    {
      title: 'Database Design & Optimization',
      description: 'Efficient database architecture and optimization for better performance.',
      icon: ChartBarIcon,
      category: 'development',
      features: ['Database Design', 'Query Optimization', 'Data Migration', 'Performance Tuning'],
      pricing: 'From $800',
      timeline: '1-3 weeks',
      color: 'red'
    },
    {
      title: 'Cloud Deployment & DevOps',
      description: 'Professional deployment on AWS, Vercel, and other cloud platforms.',
      icon: CloudIcon,
      category: 'devops',
      features: ['AWS Deployment', 'CI/CD Pipeline', 'Docker Containerization', 'Monitoring'],
      pricing: 'From $500',
      timeline: '1-2 weeks',
      color: 'cyan'
    }
  ];

  const assignmentServices = [
    {
      title: 'Programming Assignments',
      description: 'Help with coding assignments in JavaScript, Python, React, and more.',
      icon: AcademicCapIcon,
      features: ['Code Review & Debugging', 'Algorithm Implementation', 'Best Practices', 'Documentation'],
      pricing: 'From $50/hour',
      color: 'indigo'
    },
    {
      title: 'Project Consultation',
      description: 'Technical guidance and mentoring for your development projects.',
      icon: LightBulbIcon,
      features: ['Code Review', 'Architecture Planning', '1-on-1 Mentoring', 'Problem Solving'],
      pricing: 'From $75/hour',
      color: 'pink'
    },
    {
      title: 'Code Review & Optimization',
      description: 'Professional code review and performance optimization services.',
      icon: ShieldCheckIcon,
      features: ['Security Review', 'Performance Analysis', 'Best Practices', 'Refactoring'],
      pricing: 'From $60/hour',
      color: 'teal'
    },
    {
      title: 'Technical Writing',
      description: 'Documentation, tutorials, and technical content creation.',
      icon: DocumentTextIcon,
      features: ['API Documentation', 'Tutorial Writing', 'Technical Blogs', 'Code Comments'],
      pricing: 'From $40/hour',
      color: 'yellow'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', count: services.length + assignmentServices.length },
    { id: 'development', label: 'Development', count: services.filter(s => s.category === 'development').length },
    { id: 'design', label: 'Design', count: services.filter(s => s.category === 'design').length },
    { id: 'devops', label: 'DevOps', count: services.filter(s => s.category === 'devops').length },
    { id: 'assignments', label: 'Assignments', count: assignmentServices.length }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-300' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:border-purple-300' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', hover: 'hover:border-green-300' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:border-orange-300' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', hover: 'hover:border-red-300' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-200', hover: 'hover:border-cyan-300' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', hover: 'hover:border-indigo-300' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', hover: 'hover:border-pink-300' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200', hover: 'hover:border-teal-300' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:border-yellow-300' }
    };
    return colors[color] || colors.blue;
  };

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const showAssignments = selectedCategory === 'all' || selectedCategory === 'assignments';

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      comment: 'Methmal delivered an exceptional e-commerce platform. Professional, timely, and great communication throughout.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Computer Science Student',
      comment: 'Got excellent help with my React assignment. Clear explanations and high-quality code. Highly recommended!',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Product Manager',
      comment: 'The API integration was flawless. Great attention to detail and excellent documentation provided.',
      rating: 5
    }
  ];

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
                Professional Services
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              How I Can Help
              <span className="text-blue-600"> Bring Your Ideas to Life</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From full-stack development to assignment help, I offer comprehensive services 
              to meet your technical needs. Let's build something amazing together.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl font-bold text-blue-600">24hrs</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      {(selectedCategory === 'all' || selectedCategory !== 'assignments') && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-4">Professional Development Services</h2>
              <p className="text-lg text-gray-600">Comprehensive solutions for your business needs</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => {
                const IconComponent = service.icon;
                const colors = getColorClasses(service.color);
                
                return (
                  <div
                    key={service.title}
                    className={`group bg-white rounded-3xl p-8 border-2 ${colors.border} ${colors.hover} hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredService(service.title)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    {/* Icon */}
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="text-sm text-gray-500">Starting at</div>
                        <div className="font-bold text-black">{service.pricing}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Timeline</div>
                        <div className="font-bold text-black">{service.timeline}</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href="#contact"
                      className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                        hoveredService === service.title
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Get Quote
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Assignment Services */}
      {showAssignments && (
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-4">Assignment & Consultation Services</h2>
              <p className="text-lg text-gray-600">Flexible hourly services for students and professionals</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {assignmentServices.map((service, index) => {
                const IconComponent = service.icon;
                const colors = getColorClasses(service.color);
                
                return (
                  <div
                    key={service.title}
                    className={`bg-white rounded-2xl p-6 border-2 ${colors.border} hover:shadow-xl transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-black mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-1 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-4">
                      <div className="font-bold text-lg text-black">{service.pricing}</div>
                      <div className="text-xs text-gray-500">Flexible scheduling</div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href="#contact"
                      className="block w-full text-center py-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded-lg font-semibold text-sm transition-all duration-300"
                    >
                      Book Session
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">How I Work</h2>
            <p className="text-lg text-gray-600">A streamlined process to ensure project success</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { 
                step: '01', 
                title: 'Discovery', 
                description: 'We discuss your requirements, goals, and timeline to understand your vision.',
                icon: LightBulbIcon
              },
              { 
                step: '02', 
                title: 'Planning', 
                description: 'I create a detailed project plan with milestones, timeline, and deliverables.',
                icon: DocumentTextIcon
              },
              { 
                step: '03', 
                title: 'Development', 
                description: 'Regular updates and collaboration throughout the development process.',
                icon: CodeBracketIcon
              },
              { 
                step: '04', 
                title: 'Delivery', 
                description: 'Testing, deployment, and handover with comprehensive documentation.',
                icon: RocketLaunchIcon
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">What Clients Say</h2>
            <p className="text-lg text-gray-600">Trusted by businesses and students worldwide</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-black">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you need a complete web application or help with a specific assignment, 
            I'm here to help. Let's discuss your project today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Your Project</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            
            <Link
              href="/portfolio"
              className="text-blue-600 hover:text-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-blue-200 hover:bg-blue-50"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}