'use client';
import { useState, useEffect } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: 'dasunmethmal23@gmail.com',
      description: 'Send me an email anytime',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: '0703056192',
      description: 'Mon-Fri from 8am to 6pm',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: 'Colombo, Sri Lanka',
      description: 'Available worldwide remotely',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      icon: ClockIcon,
      label: 'Response Time',
      value: '24 hours',
      description: 'Average response time',
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  const services = [
    'Web Application Development',
    'Full-Stack Development',
    'API Development & Integration',
    'Database Design & Optimization',
    'Performance Optimization',
    'Technical Consulting'
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
                Let's Work Together
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Ready to Start Your 
              <span className="text-blue-600"> Next Project?</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you have a clear vision or just an idea, I'm here to help bring your project to life. 
              Let's discuss how we can create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={info.label}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 ${info.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{info.label}</h3>
                  <p className="text-gray-900 font-medium mb-1">{info.value}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-black mb-4">Send Me a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                        focusedField === 'name' ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                        focusedField === 'email' ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                        focusedField === 'message' ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-300 resize-none"
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'scale-95' : 'hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <p className="text-green-700 font-medium">
                        Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                      <XCircleIcon className="w-5 h-5 text-red-600" />
                      <p className="text-red-700 font-medium">
                        Sorry, there was an error sending your message. Please try again or contact me directly.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Information Panel */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="space-y-8">
                {/* Services */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <GlobeAltIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black">What I Can Help With</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {services.map((service, index) => (
                      <div 
                        key={service}
                        className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-gray-700 font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black">My Process</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { step: '01', title: 'Discovery Call', description: 'We discuss your project goals, requirements, and timeline' },
                      { step: '02', title: 'Proposal', description: 'I provide a detailed proposal with scope, timeline, and pricing' },
                      { step: '03', title: 'Development', description: 'Regular updates and collaboration throughout the build process' },
                      { step: '04', title: 'Launch', description: 'Testing, deployment, and post-launch support' }
                    ].map((item, index) => (
                      <div key={item.step} className="flex space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-black mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-100 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Currently Available</h3>
                  <p className="text-gray-600 mb-4">
                    I'm accepting new projects for Q1 2025. Let's discuss your timeline and requirements.
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Booking Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Common questions about working together</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications can take 8-12 weeks. I'll provide a detailed timeline in my proposal."
              },
              {
                question: "Do you work with international clients?",
                answer: "Absolutely! I work with clients worldwide and am comfortable with different time zones. Most of my communication happens via email and scheduled video calls."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "I specialize in React, Next.js, Node.js, Python, MongoDB, and PostgreSQL. I also work with various APIs, cloud platforms, and modern development tools."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes! I offer post-launch support packages including bug fixes, updates, and feature additions. We can discuss ongoing maintenance during our initial consultation."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-black mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}