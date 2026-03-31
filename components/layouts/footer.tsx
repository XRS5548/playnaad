'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
//   Facebook, 
//   Instagram, 
//   Twitter, 
//   Youtube,
  Heart,
  ChevronRight,
  Mail,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Social media links configuration
const socialLinks = [
  { name: 'Facebook', icon: Mail, href: 'https://facebook.com/playnaad' },
  { name: 'Instagram', icon: Mail, href: 'https://instagram.com/playnaad' },
  { name: 'Twitter', icon: Mail, href: 'https://twitter.com/playnaad' },
  { name: 'YouTube', icon: Mail, href: 'https://youtube.com/playnaad' },
];

// Shop links
const shopLinks = [
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: "Women's Wear", href: '/women' },
  { name: "Men's Edit", href: '/men' },
  { name: 'Festive Collection', href: '/collections/festive' },
  { name: 'Accessories', href: '/accessories' },
  { name: 'Sale', href: '/sale' },
];

// Help links
const helpLinks = [
  { name: 'Size Guide', href: '/size-guide' },
  { name: 'Shipping Policy', href: '/shipping-policy' },
  { name: 'Returns & Exchange', href: '/returns' },
  { name: 'Track Order', href: '/track-order' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact Us', href: '/contact' },
];

// Company links
const companyLinks = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Sustainability', href: '/sustainability' },
  { name: 'Artisan Partners', href: '/artisans' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
];

// Payment methods
const paymentMethods = [
  { name: 'Visa', icon: '💳', color: 'from-blue-600/20 to-blue-600/5' },
  { name: 'Mastercard', icon: '💳', color: 'from-red-600/20 to-red-600/5' },
  { name: 'UPI', icon: '📱', color: 'from-green-600/20 to-green-600/5' },
  { name: 'Razorpay', icon: '⚡', color: 'from-blue-500/20 to-blue-500/5' },
];

// Reusable Footer Section Component
const FooterSection = ({ title, links }: { title: string; links: Array<{ name: string; href: string }> }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wider uppercase text-soft-white/80">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="group inline-flex items-center text-sm text-muted-gray transition-all duration-300 hover:text-amber-600"
            >
              <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Social Icon Component
const SocialIcon = ({ icon: Icon, href, name }: { icon: React.ElementType; href: string; name: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="p-2 text-muted-gray transition-all duration-300 hover:text-amber-600 hover:scale-110 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-600/50 rounded-full"
    >
      <Icon size={18} strokeWidth={1.5} />
    </a>
  );
};

// Payment Method Badge
const PaymentBadge = ({ name, icon, color }: { name: string; icon: string; color: string }) => {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 bg-linear-to-br ${color} rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-amber-600/30 hover:scale-105`}>
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-medium text-muted-gray">{name}</span>
    </div>
  );
};

// Newsletter Signup Component
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    
    // Simulate API call - Replace with actual newsletter subscription endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Thanks for subscribing! Check your inbox.');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wider uppercase text-soft-white/80">
        Newsletter
      </h3>
      <p className="text-xs text-muted-gray leading-relaxed">
        Subscribe to receive updates, access to exclusive deals, and more.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 pr-12 text-sm bg-white/5 border border-white/10 rounded-lg text-soft-white placeholder-muted-gray/50 focus:outline-none focus:border-amber-600/50 focus:ring-2 focus:ring-amber-600/20 transition-all duration-300"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-600 hover:text-amber-600/80 transition-colors duration-300 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        
        {message && (
          <div className={`flex items-center gap-2 text-xs ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle size={12} />
            ) : (
              <AlertCircle size={12} />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Fade-in animation on load - using setTimeout to avoid ESLint warning
  useEffect(() => {
    // Use setTimeout to move the state update out of the synchronous effect body
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`relative w-full bg-charcoal overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-600/30 to-transparent" />
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-block group">
              <h2 className="text-3xl font-serif tracking-[0.2em] font-light">
                PLAY<span className="text-amber-600 font-medium">NAAD</span>
              </h2>
            </Link>
            <p className="text-sm text-muted-gray leading-relaxed">
              Where contemporary style meets the soul of India. Crafting timeless elegance for the modern connoisseur.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-1 pt-2">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.name}
                  icon={social.icon}
                  href={social.href}
                  name={social.name}
                />
              ))}
            </div>
          </div>

          {/* Column 2 - Shop */}
          <FooterSection title="Shop" links={shopLinks} />

          {/* Column 3 - Help */}
          <FooterSection title="Help" links={helpLinks} />

          {/* Column 4 - Company */}
          <FooterSection title="Company" links={companyLinks} />

          {/* Column 5 - Newsletter */}
          <NewsletterSignup />
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-gray tracking-wide">
              © {currentYear} Playnaad. All rights reserved. Made with{' '}
              <Heart size={10} className="inline text-amber-600 fill-amber-600" /> in India
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((method) => (
              <PaymentBadge key={method.name} name={method.name} icon={method.icon} color={method.color} />
            ))}
          </div>
        </div>

        {/* Additional Legal Links */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-gray/70">
            <Link href="/privacy-policy" className="hover:text-amber-600 transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms-of-service" className="hover:text-amber-600 transition-colors duration-300">
              Terms of Service
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/cookie-policy" className="hover:text-amber-600 transition-colors duration-300">
              Cookie Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/sitemap" className="hover:text-amber-600 transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-amber-600/20 to-transparent" />
    </footer>
  );
}