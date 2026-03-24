'use client';
import { useState, useEffect } from 'react';
import { 
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPulse, setShowPulse] = useState(true);
  
  const phoneNumber = "94703056192"; // Your Sri Lankan number with country code
  const defaultMessage = "Hi Methmal! I saw your portfolio and would like to discuss a project.";

  const quickMessages = [
    {
      text: "I need a website for my business",
      icon: "ðŸŒ",
      category: "Business"
    },
    {
      text: "Can we schedule a call to discuss my project?",
      icon: "ðŸ“ž",
      category: "Consultation"
    },
    {
      text: "I need help with a programming assignment",
      icon: "ðŸ’»",
      category: "Assignment"
    },
    {
      text: "Please share your pricing and timeline",
      icon: "ðŸ’°",
      category: "Pricing"
    },
    {
      text: "I have a custom project requirement",
      icon: "ðŸŽ¯",
      category: "Custom"
    }
  ];

  // Hide/show button on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Remove pulse after first interaction
  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  // Auto-hide quick messages after 10 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleMessageClick = (message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCustomMessage = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Floating Button */}
      <div className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${showPulse ? 'animate-pulse' : ''}`}
          aria-label="Contact via WhatsApp"
        >
          {/* Ripple Effect */}
          {showPulse && (
            <>
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 animation-delay-1000" />
            </>
          )}
          
          {/* Button Content */}
          <div className="relative flex items-center justify-center">
            {isOpen ? (
              <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 rotate-180" />
            ) : (
              <svg className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.285A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
          </div>
        </button>

        {/* Tooltip - Hidden on mobile */}
        {!isOpen && (
          <div className="hidden sm:block absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              Let's chat on WhatsApp
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Message Panel */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-16 sm:bottom-24 sm:right-6 sm:left-auto sm:inset-x-auto z-50 animate-fade-in-up">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 w-full sm:min-w-80 sm:max-w-sm max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                  M
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-black text-sm sm:text-base">Methmal</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs sm:text-sm text-green-600 font-medium">Online now</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Typically responds within minutes</span>
              </div>
            </div>

            {/* Quick Messages */}
            <div className="p-3 sm:p-4 flex-1 overflow-hidden">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900">Quick message options:</span>
              </div>
              
              <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                {quickMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleMessageClick(message.text)}
                    className="w-full p-2.5 sm:p-3 text-left text-xs sm:text-sm text-gray-700 hover:bg-green-50 rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-sm group"
                  >
                    <div className="flex items-center space-x-2.5 sm:space-x-3">
                      <span className="text-base sm:text-lg flex-shrink-0">{message.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                          {message.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                          {message.category}
                        </div>
                      </div>
                      <PaperAirplaneIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-300 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Message Button */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <button
                  onClick={handleCustomMessage}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2.5 sm:p-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Start Custom Conversation</span>
                  <PaperAirplaneIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Footer */}
              <div className="mt-2 sm:mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Powered by WhatsApp â€¢ End-to-end encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for mobile */
        @media (max-width: 640px) {
          .overflow-y-auto::-webkit-scrollbar {
            width: 3px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
        }
      `}</style>
    </>
  );
}
