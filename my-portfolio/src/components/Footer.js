'use client';
import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowUpIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/methmal', 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
      ),
      color: 'hover:text-gray-300'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/methmal', 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      ),
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/methmal', 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      color: 'hover:text-blue-300'
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/methmal', 
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 4.814.107 4.086.277 3.45.525a7.017 7.017 0 00-2.188 1.238A7.017 7.017 0 00.525 3.45C.277 4.086.107 4.814.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.047 1.063.217 1.791.465 2.427a7.017 7.017 0 001.238 2.188 7.017 7.017 0 002.188 1.238c.636.248 1.364.418 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.063-.047 1.791-.217 2.427-.465a7.017 7.017 0 002.188-1.238 7.017 7.017 0 001.238-2.188c.248-.636.418-1.364.465-2.427C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123c-.047-1.063-.217-1.791-.465-2.427a7.017 7.017 0 00-1.238-2.188A7.017 7.017 0 0016.05.525C15.414.277 14.686.107 13.623.06 12.556.012 12.216 0 10 0zm0 1.802c2.67 0 2.987.01 4.041.059.975.045 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.883.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858a3.097 3.097 0 01-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.883.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344a3.097 3.097 0 01-1.15-.748 3.097 3.097 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344C7.014 1.812 7.33 1.802 10 1.802zM10 5.865a4.135 4.135 0 100 8.27 4.135 4.135 0 000-8.27zm0 6.468a2.333 2.333 0 110-4.666 2.333 2.333 0 010 4.666zm5.338-7.87a.966.966 0 11-1.932 0 .966.966 0 011.932 0z" clipRule="evenodd" />
        </svg>
      ),
      color: 'hover:text-pink-400'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  M
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Methmal</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6 max-w-md">
                Crafting exceptional digital experiences through innovative design and clean code. Let's build something amazing together.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                  <span>hello@methmal.dev</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <PhoneIcon className="h-5 w-5 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPinIcon className="h-5 w-5 text-blue-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Stay Updated</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Get the latest updates on my projects and insights.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-300 hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>&copy; {currentYear} Methmal. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ using Next.js & Tailwind CSS</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-110 group"
            aria-label="Back to top"
          >
            <ArrowUpIcon className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
