'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

// Define custom easing values
const customEase = [0.25, 0.1, 0.25, 1]; // cubic-bezier

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setStatus('success');
      setMessage(`Thanks for subscribing! We'll keep you updated with the latest from Playnaad.`);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch {
      // Error
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Animation variants with proper typing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: customEase as any, // Type assertion for custom bezier array
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-cream py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-600/5 via-transparent to-amber-600/5" /> {/* Changed from bg-gradient-to-b */}
        
        {/* Decorative Circles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full border border-amber-600/20" // Changed from w-[800px] h-[800px]
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 rounded-full border border-amber-600/10" // Changed from w-[1000px] h-[1000px]
        />
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 opacity-30">
          <Sparkles size={20} className="text-amber-600" strokeWidth={1} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-30">
          <Sparkles size={20} className="text-amber-600" strokeWidth={1} />
        </div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-600 via-amber-600 to-transparent" /> {/* Fixed spacing */}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Small Decorative Element */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-px bg-amber-600" />
              <Sparkles size={14} className="text-amber-600" />
              <div className="w-8 h-px bg-amber-600" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-charcoal mb-4"
          >
            Stay in the{' '}
            <span className="relative italic text-amber-600 font-medium inline-block">
              loop
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={isInView ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-0.5 bg-linear-to-r from-amber-600/0 via-amber-600 to-amber-600/0" // Changed from h-[2px] and bg-gradient-to-r
              />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-muted-gray text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Be the first to know about new collections, exclusive offers, 
            and behind-the-scenes stories from the world of Playnaad.
          </motion.p>

          {/* Newsletter Form */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-6 py-4 bg-white border border-charcoal/20 rounded-full text-charcoal placeholder-muted-gray/50 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                
                {/* Input Focus Glow */}
                <div className="absolute inset-0 rounded-full opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-600/10 via-amber-600/5 to-transparent" /> {/* Changed from bg-gradient-to-r */}
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="group relative px-8 py-4 bg-charcoal text-cream rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-amber-600 hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
                
                {/* Hover Background Animation */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-amber-600"
                  style={{ display: status === 'idle' ? 'block' : 'none' }}
                />
              </button>
            </form>

            {/* Status Message */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-red-500'
                  } flex items-center justify-center gap-2`}
                >
                  {status === 'success' ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust Message */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-muted-gray/60 mt-6"
            >
              No spam, unsubscribe anytime. We respect your privacy.
            </motion.p>
          </motion.div>

          {/* Decorative Bottom Line */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8"
          >
            <div className="w-16 h-px bg-linear-to-r from-transparent via-amber-600/30 to-transparent mx-auto" /> {/* Changed from bg-gradient-to-r */}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-600/20 to-transparent" /> {/* Changed from bg-gradient-to-r */}
    </section>
  );
}