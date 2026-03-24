'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CodeBracketIcon, PaintBrushIcon, CloudIcon, DevicePhoneMobileIcon,
  ChartBarIcon, CogIcon, RocketLaunchIcon, AcademicCapIcon,
  CheckCircleIcon, ArrowRightIcon, StarIcon, SparklesIcon,
  DocumentTextIcon, LightBulbIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => { setIsVisible(true); }, []);

  const services = [
    { title: 'Full-Stack Web Development', description: 'Complete web applications with modern React, Next.js, and Node.js technologies built with scalability in mind.', icon: CodeBracketIcon, category: 'development', features: ['React & Next.js', 'Node.js & Express', 'Database Integration', 'API Development'], pricing: 'From $2,500', timeline: '4–8 weeks' },
    { title: 'UI/UX Design & Development', description: 'User-centered design that creates engaging and intuitive digital experiences with smooth interactions.', icon: PaintBrushIcon, category: 'design', features: ['Wireframing & Prototyping', 'Responsive Design', 'User Testing', 'Design Systems'], pricing: 'From $1,500', timeline: '2–4 weeks' },
    { title: 'E-Commerce Solutions', description: 'Custom online stores with payment integration and powerful inventory management.', icon: DevicePhoneMobileIcon, category: 'development', features: ['Payment Integration', 'Inventory Management', 'Admin Dashboard', 'Mobile Responsive'], pricing: 'From $3,000', timeline: '6–10 weeks' },
    { title: 'API Development & Integration', description: 'RESTful APIs and third-party service integrations for seamless data connectivity.', icon: CogIcon, category: 'development', features: ['REST API Development', 'Third-party Integration', 'Authentication', 'Documentation'], pricing: 'From $1,000', timeline: '2–4 weeks' },
    { title: 'Database Design & Optimization', description: 'Efficient database architecture and optimization for maximum performance.', icon: ChartBarIcon, category: 'development', features: ['Database Design', 'Query Optimization', 'Data Migration', 'Performance Tuning'], pricing: 'From $800', timeline: '1–3 weeks' },
    { title: 'Cloud Deployment & DevOps', description: 'Professional deployment on AWS, Vercel, and other cloud platforms with CI/CD pipelines.', icon: CloudIcon, category: 'devops', features: ['AWS Deployment', 'CI/CD Pipeline', 'Docker Containerization', 'Monitoring'], pricing: 'From $500', timeline: '1–2 weeks' },
  ];

  const assignmentServices = [
    { title: 'Programming Assignments', description: 'Expert help with coding assignments in JavaScript, Python, React, and more.', icon: AcademicCapIcon, features: ['Code Review & Debugging', 'Algorithm Implementation', 'Best Practices', 'Documentation'], pricing: 'From $50/hr' },
    { title: 'Project Consultation', description: 'Technical guidance and mentoring for your development projects.', icon: LightBulbIcon, features: ['Code Review', 'Architecture Planning', '1-on-1 Mentoring', 'Problem Solving'], pricing: 'From $75/hr' },
    { title: 'Code Review & Optimization', description: 'Professional code review and performance optimization services.', icon: ShieldCheckIcon, features: ['Security Review', 'Performance Analysis', 'Best Practices', 'Refactoring'], pricing: 'From $60/hr' },
    { title: 'Technical Writing', description: 'Documentation, tutorials, and technical content creation.', icon: DocumentTextIcon, features: ['API Documentation', 'Tutorial Writing', 'Technical Blogs', 'Code Comments'], pricing: 'From $40/hr' },
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'development', label: 'Development' },
    { id: 'design', label: 'Design' },
    { id: 'devops', label: 'DevOps' },
    { id: 'assignments', label: 'Assignments' },
  ];

  const filteredServices = selectedCategory === 'all' ? services : services.filter(s => s.category === selectedCategory);
  const showAssignments = selectedCategory === 'all' || selectedCategory === 'assignments';

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Startup Founder', comment: 'Methmal delivered an exceptional e-commerce platform. Professional, timely, and great communication throughout.', rating: 5 },
    { name: 'Michael Chen', role: 'CS Student', comment: 'Got excellent help with my React assignment. Clear explanations and high-quality code. Highly recommended!', rating: 5 },
    { name: 'Lisa Rodriguez', role: 'Product Manager', comment: 'The API integration was flawless. Great attention to detail and excellent documentation provided.', rating: 5 },
  ];

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
              Professional Services
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              How I Can Help <span className="text-orange-500">Bring Your Ideas to Life</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              From full-stack development to assignment help, I offer comprehensive services to meet your technical needs.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
              {[['50+', 'Projects'], ['24 hrs', 'Response'], ['100%', 'Satisfaction']].map(([num, label], i) => (
                <div key={label} className={`text-center ${i === 1 ? 'border-x border-gray-200 dark:border-white/10' : ''}`}>
                  <div className="text-2xl font-black text-orange-500">{num}</div>
                  <div className="text-sm text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="py-8 bg-white dark:bg-[#0b0f19] border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-500/10 hover:text-orange-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Services ── */}
      {(selectedCategory !== 'assignments') && filteredServices.length > 0 && (
        <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
          <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 mb-3">Development</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Professional Development Services</h2>
              <p className="text-gray-500 leading-relaxed">Comprehensive solutions for your business needs</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredServices.map((service, index) => {
                const Icon = service.icon;
                const isHovered = hoveredService === service.title;
                return (
                  <div
                    key={service.title}
                    className={`group bg-white dark:bg-[#0f1422] border-2 ${isHovered ? 'border-orange-500 shadow-2xl shadow-orange-500/10 -translate-y-1' : 'border-gray-100 dark:border-white/5'} rounded-2xl p-6 lg:p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                    onMouseEnter={() => setHoveredService(service.title)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/15 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-5 text-sm">{service.description}</p>
                    <div className="space-y-2 mb-5">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/[0.03] rounded-xl border border-gray-100 dark:border-white/5 mb-5">
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Starting at</div>
                        <div className="font-black text-gray-900 dark:text-white text-sm">{service.pricing}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-0.5">Timeline</div>
                        <div className="font-black text-gray-900 dark:text-white text-sm">{service.timeline}</div>
                      </div>
                    </div>
                    <Link href="/contact" className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 ${isHovered ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-400 hover:bg-orange-500 hover:text-white'}`}>
                      Get Quote
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Assignment Services ── */}
      {showAssignments && (
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1422] transition-colors duration-300">
          <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 mb-3">Flexible Services</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Assignment & Consultation</h2>
              <p className="text-gray-500 leading-relaxed">Hourly services for students and professionals</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {assignmentServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className={`group bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="space-y-1.5 mb-5">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                          <span className="text-xs text-gray-500">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mb-4">
                      <div className="font-black text-gray-900 dark:text-white">{service.pricing}</div>
                      <div className="text-xs text-gray-400 mt-0.5">Flexible scheduling</div>
                    </div>
                    <Link href="/contact" className="block w-full text-center py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-orange-500 hover:text-white text-gray-700 dark:text-gray-400 rounded-lg font-bold text-sm transition-all duration-300">
                      Book Session
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Process ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 mb-3">Workflow</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">How I Work</h2>
            <p className="text-gray-500 leading-relaxed">A streamlined process to ensure project success</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Discuss requirements, goals, and timeline to understand your vision.', icon: LightBulbIcon },
              { step: '02', title: 'Planning', description: 'Create a detailed project plan with milestones and deliverables.', icon: DocumentTextIcon },
              { step: '03', title: 'Development', description: 'Regular updates and collaboration throughout the process.', icon: CodeBracketIcon },
              { step: '04', title: 'Delivery', description: 'Testing, deployment, and handover with full documentation.', icon: RocketLaunchIcon },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-xs font-black">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1422] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 mb-3">Reviews</span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">What Clients Say</h2>
            <p className="text-gray-500 leading-relaxed">Trusted by businesses and students worldwide</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-orange-400 fill-current" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">"{t.comment}"</p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-orange-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Whether you need a complete web application or help with a specific assignment, I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center">
                Start Your Project <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link href="/projects" className="text-orange-500 hover:text-orange-400 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-500/5 w-full sm:w-auto text-center">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
