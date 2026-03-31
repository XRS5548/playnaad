'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Info,
  ChevronRight
} from 'lucide-react';
import { CartDialog } from '../cart/CartDialog';

// Navigation data for consistency
const navLinks = [
  {
    name: 'New Arrivals',
    href: '/new-arrivals',
  },
  {
    name: 'Topwear',
    href: '/topwear',
    subLinks: [
      { name: 'T-Shirts', href: '/topwear/tshirts' },
      { name: 'Shirts', href: '/topwear/shirts' },
      { name: 'Hoodies', href: '/topwear/hoodies' },
      { name: 'Sweatshirts', href: '/topwear/sweatshirts' },
    ],
  },
  {
    name: 'Bottomwear',
    href: '/bottomwear',
    subLinks: [
      { name: 'Jeans', href: '/bottomwear/jeans' },
      { name: 'Trousers', href: '/bottomwear/trousers' },
      { name: 'Joggers', href: '/bottomwear/joggers' },
      { name: 'Shorts', href: '/bottomwear/shorts' },
    ],
  },
  {
    name: 'Accessories',
    href: '/accessories',
    subLinks: [
      { name: 'Watches', href: '/accessories/watches' },
      { name: 'Sunglasses', href: '/accessories/sunglasses' },
      { name: 'Caps', href: '/accessories/caps' },
      { name: 'Bags', href: '/accessories/bags' },
    ],
  },
  {
    name: 'Collections',
    href: '/collections',
    subLinks: [
      { name: 'Trending', href: '/collections/trending' },
      { name: 'Best Sellers', href: '/collections/best-sellers' },
      { name: 'Limited Edition', href: '/collections/limited' },
      { name: 'Streetwear', href: '/collections/streetwear' },
    ],
  },
  {
    name: 'Custom Design',
    href: '/custom-design',
  },
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
    className={`relative p-2 text-gray-700 transition-all duration-300 hover:text-amber-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-full ${className}`}
  >
    <Icon size={22} strokeWidth={1.5} />
    {badgeCount !== undefined && badgeCount > 0 && (
      <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-[11px] font-semibold leading-none text-white bg-amber-600 rounded-full shadow-sm">
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
        isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-600 transition-transform duration-300 ease-out origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
};

// Mobile Submenu Component
const MobileSubmenu = ({ 
  link, 
  onClose 
}: { 
  link: typeof navLinks[0]; 
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === link.href;

  if (!link.subLinks || link.subLinks.length === 0) {
    return (
      <Link
        href={link.href}
        onClick={onClose}
        className={`block text-lg font-medium tracking-wide transition-colors duration-300 py-3 border-b border-gray-200 ${
          isActive ? 'text-amber-600' : 'text-gray-800 hover:text-amber-600'
        }`}
      >
        {link.name}
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-lg font-medium tracking-wide text-gray-800 hover:text-amber-600 transition-colors duration-300"
      >
        <span>{link.name}</span>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-4 pb-3 space-y-2">
          {link.subLinks.map((subLink) => (
            <Link
              key={subLink.name}
              href={subLink.href}
              onClick={onClose}
              className="block py-2 text-base text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              {subLink.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Desktop Dropdown Component
const DesktopDropdown = ({ link }: { link: typeof navLinks[0] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative text-sm font-medium tracking-wide text-gray-700 hover:text-amber-600 transition-colors duration-300 group">
          {link.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
        </button>
      </DialogTrigger>

      {link.subLinks && link.subLinks.length > 0 && (
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border-none shadow-2xl z-[100] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-400/40 via-amber-600 to-amber-400/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6 sm:mb-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-600/10 flex items-center justify-center">
                  <Menu className="w-5 h-5 text-amber-600" />
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {link.name}
                </DialogTitle>
              </div>
              <p className="text-sm text-gray-500 max-w-md mx-auto sm:mx-0">
                Explore our curated {link.name.toLowerCase()} collection
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {link.subLinks.map((sub, index) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className="group relative rounded-xl p-4 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/5 border border-gray-100 hover:border-amber-600/20 bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-600/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-600/10 group-hover:bg-amber-600/20 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                      <span className="text-amber-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                        {sub.name}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Link>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Click any option to explore
                </p>
                <Link
                  href={link.href}
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors group"
                >
                  View all {link.name.toLowerCase()}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = 3;
  const wishlistCount = 2;
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50'
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[70px]">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 transition-colors hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-full"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                link.subLinks && link.subLinks.length > 0 ? (
                  <DesktopDropdown key={link.name} link={link} />
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative text-sm font-medium tracking-wide text-gray-700 hover:text-amber-600 transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              ))}
            </nav>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
              <Link
                href="/"
                className="block focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-sm"
                aria-label="Playnaad Home"
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-[0.2em] font-light whitespace-nowrap">
                  PLAY<span className="text-amber-600 font-medium">NAAD</span>
                </h1>
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <IconButton icon={Search} label="Search" />
              <IconButton
                icon={Heart}
                label="Wishlist"
                badgeCount={wishlistCount}
              />
              <CartDialog />

              {/* Desktop Menu Toggle - Hidden on mobile, shown on desktop if needed */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hidden md:flex md:hidden p-2 text-gray-700 transition-colors hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-full"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
            {/* Mobile Header */}
            <div className="absolute top-0 left-0 right-0 px-6 py-4 bg-white border-b border-gray-200">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <MobileSubmenu key={link.name} link={link} onClose={() => setMobileMenuOpen(false)} />
              ))}
            </nav>

            {/* Mobile Footer Links */}
            <div className="mt-auto pt-8 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-gray-600 hover:text-amber-600 transition-colors py-2"
                >
                  Help & Support
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-gray-600 hover:text-amber-600 transition-colors py-2"
                >
                  Sign In / Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 sm:h-[70px]" />
    </>
  );
}