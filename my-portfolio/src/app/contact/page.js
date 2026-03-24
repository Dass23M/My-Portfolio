'use client';
import { useState, useEffect } from 'react';
import {
  EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon,
  PaperAirplaneIcon, CheckCircleIcon, XCircleIcon,
  SparklesIcon, GlobeAltIcon, ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => { setIsVisible(true); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: EnvelopeIcon, label: 'Email', value: 'dasunmethmal23@gmail.com', description: 'Send me an email anytime' },
    { icon: PhoneIcon, label: 'Phone', value: '0703056192', description: 'Mon–Fri, 8am–6pm' },
    { icon: MapPinIcon, label: 'Location', value: 'Colombo, Sri Lanka', description: 'Available worldwide remotely' },
    { icon: ClockIcon, label: 'Response Time', value: '< 24 hours', description: 'Average response time' },
  ];

  const services = [
    'Web Application Development',
    'Full-Stack Development',
    'API Development & Integration',
    'Database Design & Optimization',
    'Performance Optimization',
    'Technical Consulting',
  ];

  const fieldLabel = (name, label) => (
    <label htmlFor={name} className={`block text-sm font-bold mb-2 transition-colors duration-200 ${focusedField === name ? 'text-orange-500' : 'text-gray-700 dark:text-gray-300'}`}>
      {label} *
    </label>
  );

  const inputCls = "w-full px-4 py-3.5 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-gray-900 dark:text-white rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20 placeholder-gray-400 dark:placeholder-gray-600 text-base";

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
              Let's Work Together
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              Ready to Start Your <span className="text-orange-500">Next Project?</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Whether you have a clear vision or just an idea, I'm here to help bring your project to life.
            </p>
          </div>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="py-12 lg:py-16 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className={`bg-white dark:bg-[#0f1422] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl hover:border-orange-500/30 hover:shadow-orange-500/10 hover:scale-105 transition-all duration-300 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white mb-1">{info.label}</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-1">{info.value}</p>
                  <p className="text-gray-500 text-sm">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1422] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 xl:gap-16 items-start">

            {/* Form */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Send Me a Message</h2>
                <p className="text-gray-500 leading-relaxed mb-8">Fill out the form below and I'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    {fieldLabel('name', 'Full Name')}
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} className={inputCls} placeholder="Enter your full name" />
                  </div>
                  <div>
                    {fieldLabel('email', 'Email Address')}
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} className={inputCls} placeholder="Enter your email address" />
                  </div>
                  <div>
                    {fieldLabel('message', 'Project Details')}
                    <textarea name="message" id="message" rows={6} required value={formData.message} onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} className={`${inputCls} resize-none`} placeholder="Tell me about your project, timeline, budget, and any specific requirements..." />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isSubmitting ? '' : 'hover:scale-[1.02]'}`}
                  >
                    {isSubmitting ? (
                      <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /><span>Sending…</span></>
                    ) : (
                      <><PaperAirplaneIcon className="w-5 h-5" /><span>Send Message</span></>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-green-700 dark:text-green-400 font-medium text-sm leading-relaxed">
                        Thank you! Your message has been sent. I'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                      <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 dark:text-red-400 font-medium text-sm leading-relaxed">
                        Sorry, there was an error. Please try again or contact me directly via email.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Services */}
              <div className="bg-orange-50 dark:bg-[#141928] border border-orange-100 dark:border-orange-500/10 rounded-2xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <GlobeAltIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">What I Can Help With</h3>
                </div>
                <div className="space-y-2.5">
                  {services.map((service) => (
                    <div key={service} className="flex items-center gap-3 p-3 bg-white/70 dark:bg-white/[0.03] rounded-xl hover:bg-white dark:hover:bg-white/[0.06] transition-all duration-200">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="bg-white dark:bg-[#141928] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">My Process</h3>
                </div>
                <div className="space-y-5">
                  {[
                    { step: '01', title: 'Discovery Call', description: 'Discuss goals, requirements, and timeline' },
                    { step: '02', title: 'Proposal', description: 'Detailed scope, timeline, and pricing' },
                    { step: '03', title: 'Development', description: 'Regular updates throughout the build' },
                    { step: '04', title: 'Launch', description: 'Testing, deployment, and support' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-9 h-9 bg-orange-100 dark:bg-orange-500/15 text-orange-500 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                  <CheckCircleIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Currently Available</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Accepting new projects for Q2 2025.</p>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 rounded-full text-sm font-bold">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Booking Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0b0f19] transition-colors duration-300">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 leading-relaxed">Common questions about working together</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {[
              { q: "What's your typical project timeline?", a: "Timelines vary by complexity. A simple website takes 2–4 weeks; complex web applications take 8–12 weeks. I'll provide a detailed timeline in my proposal." },
              { q: "Do you work with international clients?", a: "Absolutely! I work with clients worldwide and am comfortable with different time zones. Most communication happens via email and scheduled video calls." },
              { q: "What technologies do you specialize in?", a: "I specialize in React, Next.js, Node.js, Python, MongoDB, and PostgreSQL, along with various APIs, cloud platforms, and modern dev tools." },
              { q: "Do you provide ongoing support?", a: "Yes! I offer post-launch support packages including bug fixes, updates, and feature additions. We can discuss ongoing maintenance during our initial consultation." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-[#0f1422] border border-gray-100 dark:border-white/5 rounded-2xl p-6 lg:p-8 hover:border-orange-500/30 transition-all duration-300">
                <h3 className="text-base font-black text-gray-900 dark:text-white mb-3">{faq.q}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
