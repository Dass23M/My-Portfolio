'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CodeBracketIcon, PaintBrushIcon, CloudIcon, DevicePhoneMobileIcon,
  ChartBarIcon, CogIcon, RocketLaunchIcon, AcademicCapIcon,
  CheckCircleIcon, ArrowRightIcon, StarIcon, SparklesIcon,
  DocumentTextIcon, LightBulbIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

const TYPE_COLORS = {
  'Web Development': 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
  'UI/UX Design': 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
  'API/Backend': 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20',
  'E-Commerce': 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  'Consultation': 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
  'Assignment Help': 'bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/20',
};

const AVATAR_COLORS = ['bg-orange-400', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500'];

function ClientAvatar({ name, image, size = 'md' }) {
  const [imgError, setImgError] = useState(false);
  const initials = name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : '?';
  const color = AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];
  const sz = size === 'lg' ? 'w-14 h-14 text-base' : 'w-12 h-12 text-sm';

  if (image && !imgError) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setImgError(true)}
        className={`${sz} rounded-full object-cover border-2 border-orange-200 dark:border-orange-500/30 flex-shrink-0`}
      />
    );
  }
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => { setIsVisible(true); }, []);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews?isPublished=true');
        const data = await res.json();
        setTestimonials(data.data || []);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    }
    loadReviews();
  }, []);

  const services = [
    { title: 'Full-Stack Web Development', description: 'Complete web applications with modern React, Next.js, and Node.js technologies built with scalability in mind.', icon: CodeBracketIcon, category: 'development', features: ['React & Next.js', 'Node.js & Express', 'Database Integration', 'API Development'], pricing: 'From $2,500', timeline: '4–8 weeks' },
    { title: 'UI/UX Design & Development', description: 'User-centered design that creates engaging and intuitive digital experiences with smooth interactions.', icon: PaintBrushIcon, category: 'design', features: ['Wireframing & Prototyping', 'Responsive Design', 'User Testing', 'Design Systems'], pricing: 'From $1,500', timeline: '2–4 weeks' },
    { title: 'E-Commerce Solutions', description: 'Custom online stores with payment integration and powerful inventory management.', icon: DevicePhoneMobileIcon, category: 'development', features: ['Payment Integration', 'Inventory Management', 'Admin Dashboard', 'Mobile Responsive'], pricing: 'From $3,000', timeline: '6–10 weeks' },
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
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${selectedCategory === cat.id
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

          {/* Loading skeletons */}
          {reviewsLoading && (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 animate-pulse">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="flex-1">
                      <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <div key={j} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />)}
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!reviewsLoading && testimonials.length === 0 && (
            <div className="text-center py-12">
              <StarIcon className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">Client reviews coming soon.</p>
            </div>
          )}

          {/* Reviews grid */}
          {!reviewsLoading && testimonials.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((t, index) => (
                <div
                  key={t._id || t.name}
                  className={`group relative bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Quote decoration */}
                  <div className="absolute top-5 right-6 text-5xl font-black text-orange-100 dark:text-orange-500/10 leading-none select-none">"</div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarSolid
                        key={star}
                        className={`w-4 h-4 ${star <= (t.rating || 5) ? 'text-orange-400' : 'text-gray-200 dark:text-gray-700'}`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic text-sm relative z-10">
                    &ldquo;{t.comment}&rdquo;
                  </p>

                  {/* Client info */}
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-white/5">
                    <ClientAvatar name={t.name} image={t.image} />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-gray-900 dark:text-white text-sm truncate">{t.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {t.role}{t.company ? ` · ${t.company}` : ''}
                      </div>
                    </div>
                    {t.reviewType && (
                      <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border ${TYPE_COLORS[t.reviewType] || 'bg-gray-100 dark:bg-white/5 text-gray-500 border-gray-200 dark:border-white/10'}`}>
                        {t.reviewType}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
