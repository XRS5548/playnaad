'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X 
} from 'lucide-react';

// Navigation data for consistency
const navLinks = [
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Women', href: '/women' },
  { name: 'Men', href: '/men' },
  { name: 'Collections', href: '/collections' },
];

// Reusable IconButton component for consistency
const IconButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  badgeCount,
  className = '' 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick?: () => void; 
  badgeCount?: number;
  className?: string;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`relative p-2 text-charcoal transition-all duration-300 hover:text-gold hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-full ${className}`}
  >
    <Icon size={22} strokeWidth={1.5} />
    {badgeCount !== undefined && badgeCount > 0 && (
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[11px] font-semibold leading-none text-white bg-gold rounded-full shadow-sm">
        {badgeCount > 99 ? '99+' : badgeCount}
      </span>
    )}
  </button>
);

// Reusable NavLink component with active state and underline animation
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 group ${
        isActive ? 'text-gold' : 'text-charcoal hover:text-gold'
      }`}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-gold transition-transform duration-300 ease-out origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count, replace with real state management
  const [wishlistCount, setWishlistCount] = useState(2); // Example wishlist count
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change (handled via useEffect with pathname)
  const pathname = usePathname();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Navbar Container */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-xl shadow-sm border-b border-charcoal/5'
            : 'bg-cream/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* LEFT SECTION - Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* CENTER - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
              <Link
                href="/"
                className="block focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-sm"
                aria-label="Playnaad Home"
              >
                <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] font-light">
                  PLAY<span className="text-gold font-medium">NAAD</span>
                </h1>
              </Link>
            </div>

            {/* RIGHT SECTION - Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <IconButton icon={Search} label="Search" />
              <IconButton 
                icon={Heart} 
                label="Wishlist" 
                badgeCount={wishlistCount}
              />
              <IconButton 
                icon={ShoppingBag} 
                label="Cart" 
                badgeCount={cartCount}
              />
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-charcoal transition-colors hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-full"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle bottom border accent */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-[280px] bg-cream shadow-2xl transform transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium tracking-wide transition-colors duration-300 py-2 border-b border-charcoal/10 ${
                      isActive
                        ? 'text-gold border-gold'
                        : 'text-charcoal hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Optional: Mobile Footer Links */}
            <div className="mt-auto pt-8">
              <div className="flex flex-col space-y-4 text-sm text-charcoal/60">
                <Link href="/help" className="hover:text-gold transition-colors">
                  Help & Support
                </Link>
                <Link href="/signin" className="hover:text-gold transition-colors">
                  Sign In / Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-[70px]" />
    </>
  );
}