// app/signup/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaEye, 
  FaEyeSlash, 
  FaUser,
  FaApple,
  FaGoogle,
  FaStar,
  FaGift,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { MdEmail, MdLock, MdVerified } from 'react-icons/md';
import { IoSparkles } from "react-icons/io5";

// Define proper types
interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

interface SignupResponse {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  error?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof SignupErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors: SignupErrors = {};
    
    // Full Name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle signup - API automatically sets cookie
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: SignupResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Cookie automatically set by API, no need to handle token
      console.log('Signup successful', data);
      
      // Redirect to home page
      router.push('/?signup=success');
      
    } catch (error: unknown) {
      console.error('Signup failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setErrors({ 
        email: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social signup
  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    // Redirect to OAuth endpoints
    if (provider === 'google') {
      window.location.href = '/api/auth/google';
    } else if (provider === 'apple') {
      window.location.href = '/api/auth/apple';
    }
  };

  // Animation variants with proper Framer Motion types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      <div className="flex min-h-screen flex-col lg:flex-row">
        
        {/* LEFT SECTION - Fashion Image with Overlay */}
        <div className="relative hidden lg:block lg:w-1/2 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format"
            alt="Playnaad Fashion Community"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-charcoal/80 via-charcoal/50 to-gold/20" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Logo */}
            <div>
              <Link href="/" className="inline-block">
                <h1 className="text-3xl font-serif tracking-[0.2em] font-light text-cream">
                  PLAY<span className="text-gold font-medium">NAAD</span>
                </h1>
              </Link>
            </div>
            
            {/* Welcome Text */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2"
              >
                <div className="w-8 h-px bg-gold" />
                <IoSparkles size={14} className="text-gold" />
                <div className="w-8 h-px bg-gold" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-light text-cream leading-tight"
              >
                Join the
                <br />
                <span className="text-gold italic">Playnaad</span>
                <br />
                community
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-cream/70 text-sm max-w-md"
              >
                Become part of an exclusive community that celebrates 
                timeless elegance, craftsmanship, and sustainable luxury.
              </motion.p>
            </div>
            
            {/* Decorative Elements */}
            <div className="space-y-2">
              <div className="w-16 h-px bg-linear-to-r from-gold/50 to-transparent" />
              <p className="text-cream/40 text-xs tracking-wider uppercase">
                Join the legacy
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            {/* Form Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-gold" />
                <IoSparkles size={12} className="text-gold" />
                <div className="w-8 h-px bg-gold" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-light text-charcoal mb-2">
                Create Account
              </h1>
              <p className="text-muted-gray text-sm">
                Start your fashion journey with Playnaad
              </p>
            </motion.div>

            {/* Signup Form */}
            <motion.form variants={itemVariants} onSubmit={handleSignup} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser 
                    size={16} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray/50" 
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg text-charcoal placeholder-muted-gray/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.fullName 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                        : 'border-charcoal/20 focus:border-gold focus:ring-gold/20'
                    }`}
                    placeholder="Priya Sharma"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MdEmail 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray/50" 
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg text-charcoal placeholder-muted-gray/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                        : 'border-charcoal/20 focus:border-gold focus:ring-gold/20'
                    }`}
                    placeholder="hello@playnaad.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <MdLock 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray/50" 
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white border rounded-lg text-charcoal placeholder-muted-gray/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                        : 'border-charcoal/20 focus:border-gold focus:ring-gold/20'
                    }`}
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-gray/50 hover:text-gold transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.password}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-gray/60">
                  Must be at least 6 characters with letters and numbers
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <MdLock 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray/50" 
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white border rounded-lg text-charcoal placeholder-muted-gray/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                        : 'border-charcoal/20 focus:border-gold focus:ring-gold/20'
                    }`}
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-gray/50 hover:text-gold transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FaExclamationCircle size={12} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                  }}
                  className="mt-1 w-4 h-4 rounded border-charcoal/20 text-gold focus:ring-gold/20 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-muted-gray cursor-pointer">
                  I agree to the{' '}
                  <Link href="/terms" className="text-gold hover:text-gold/80 transition-colors">
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-gold hover:text-gold/80 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <FaExclamationCircle size={12} />
                  {errors.terms}
                </p>
              )}

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3 bg-charcoal text-cream rounded-lg text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gold hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <FaCheckCircle size={14} className="group-hover:scale-110 transition-transform duration-300" />
                    </>
                  )}
                </span>
                
                {/* Hover Background Animation */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gold"
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-charcoal/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-cream text-muted-gray/60">Or sign up with</span>
                </div>
              </div>

              {/* Social Signup Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialSignup('google')}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-charcoal/20 rounded-lg text-sm text-charcoal hover:border-gold hover:text-gold transition-all duration-300 group"
                >
                  <FaGoogle size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialSignup('apple')}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-charcoal/20 rounded-lg text-sm text-charcoal hover:border-gold hover:text-gold transition-all duration-300 group"
                >
                  <FaApple size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Apple</span>
                </button>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-sm text-muted-gray mt-6">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-gold hover:text-gold/80 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </motion.form>

            {/* Benefits Section */}
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-charcoal/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <FaStar className="mx-auto mb-1 text-gold text-xs" />
                  <p className="text-xs font-medium text-charcoal">Free Shipping</p>
                  <p className="text-xs text-muted-gray/60">On ₹2499+</p>
                </div>
                <div>
                  <MdVerified className="mx-auto mb-1 text-gold text-xs" />
                  <p className="text-xs font-medium text-charcoal">Easy Returns</p>
                  <p className="text-xs text-muted-gray/60">15 days policy</p>
                </div>
                <div>
                  <FaGift className="mx-auto mb-1 text-gold text-xs" />
                  <p className="text-xs font-medium text-charcoal">Member Benefits</p>
                  <p className="text-xs text-muted-gray/60">Exclusive access</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}