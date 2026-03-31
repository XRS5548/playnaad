'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

interface PopupModalProps {
  delay?: number;
  dismissDuration?: number;
}

export default function PopupModal({ delay = 2000, dismissDuration = 7 }: PopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('popupDismissed');
    const dismissedAt = localStorage.getItem('popupDismissedAt');
    
    if (hasSeenPopup === 'true' && dismissedAt) {
      const dismissedDate = new Date(parseInt(dismissedAt));
      const now = new Date();
      const daysDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysDiff < dismissDuration) {
        return;
      } else {
        localStorage.removeItem('popupDismissed');
        localStorage.removeItem('popupDismissedAt');
      }
    }
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, dismissDuration]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('popupDismissed', 'true');
    localStorage.setItem('popupDismissedAt', Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage('Welcome! Your 10% off code: PLAYNAAD10');
      setEmail('');
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fixed Backdrop Overlay - Solid background */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(44, 42, 41, 0.85)' }} // Solid charcoal with opacity
            onClick={handleClose}
          >
            {/* Modal Container - Solid background */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
              style={{ backgroundColor: '#FEF9F0' }} // Solid cream background
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-charcoal/10 hover:bg-charcoal/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-600/50"
                aria-label="Close popup"
              >
                <X size={18} className="text-charcoal" strokeWidth={1.5} />
              </button>

              {/* Split Layout */}
              <div className="flex flex-col md:flex-row">
                {/* Left Section - Image with better overlay for text readability */}
                <div className="relative md:w-1/2 h-80 md:h-auto min-h-100 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format"
                    alt="Playnaad Exclusive Offer"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Darker Gradient Overlay for better text visibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
                  
                  {/* Text Content on Image - Now clearly visible */}
                  <div className="absolute bottom-0 text-white left-0 right-0 p-6 text-cream">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift size={20} className="text-amber-600" strokeWidth={1.5} />
                      <span className="text-xs tracking-wider uppercase text-amber-600">Limited Time Offer</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-light mb-1">
                      Exclusive Deal
                    </h3>
                    <p className="text-cream/80 text-sm">
                      Don&apos;t miss out on this special offer
                    </p>
                  </div>
                </div>

                {/* Right Section - Content with solid background */}
                <div className="md:w-1/2 p-8 md:p-10 lg:p-12" style={{ backgroundColor: '#FEF9F0' }}>
                  {/* Decorative Top Line */}
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-px" style={{ backgroundColor: '#C6A43B' }} />
                    <Sparkles size={12} style={{ color: '#C6A43B' }} />
                    <div className="w-8 h-px" style={{ backgroundColor: '#C6A43B' }} />
                  </div>

                  {/* Heading - Solid color for readability */}
                  <h2 className="text-3xl md:text-4xl font-serif font-light mb-2" style={{ color: '#2C2A29' }}>
                    Get <span style={{ color: '#C6A43B', fontWeight: 500 }}>10% Off</span>
                  </h2>
                  
                  {/* Subtext */}
                  <p className="mb-6 text-sm leading-relaxed" style={{ color: '#6B6A69' }}>
                    Join Playnaad and unlock exclusive deals, early access, and more.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50"
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid rgba(44, 42, 41, 0.2)',
                          color: '#2C2A29',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#C6A43B';
                          e.target.style.boxShadow = '0 0 0 2px rgba(198, 164, 59, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(44, 42, 41, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading' || status === 'success'}
                      className="group relative w-full py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                      style={{
                        backgroundColor: '#2C2A29',
                        color: '#FEF9F0',
                      }}
                      onMouseEnter={(e) => {
                        if (status === 'idle') {
                          e.currentTarget.style.backgroundColor = '#C6A43B';
                          e.currentTarget.style.color = '#2C2A29';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (status === 'idle') {
                          e.currentTarget.style.backgroundColor = '#2C2A29';
                          e.currentTarget.style.color = '#FEF9F0';
                        }
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'loading' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : status === 'success' ? (
                          <>
                            <CheckCircle size={16} />
                            <span>Code Copied!</span>
                          </>
                        ) : (
                          <>
                            <span>Unlock Offer</span>
                            <Gift size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>

                    {/* Status Message */}
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-xs flex items-center gap-1 ${
                          status === 'success' ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {status === 'success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                        <span>{message}</span>
                      </motion.div>
                    )}

                    {/* Small Note */}
                    <p className="pt-2 text-xs text-center" style={{ color: '#6B6A69', opacity: 0.6 }}>
                      No spam. Only premium drops.
                    </p>
                  </form>

                  {/* No Thanks Link */}
                  <button
                    onClick={handleClose}
                    className="w-full mt-4 text-xs text-center transition-colors duration-300"
                    style={{ color: '#6B6A69', opacity: 0.5 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#C6A43B';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6B6A69';
                      e.currentTarget.style.opacity = '0.5';
                    }}
                  >
                    No thanks, I&apos;ll pass
                  </button>
                </div>
              </div>

              {/* amber-600 Accent Border */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl border" style={{ borderColor: 'rgba(198, 164, 59, 0.2)' }} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}