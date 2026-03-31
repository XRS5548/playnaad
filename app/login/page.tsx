// app/login/page.tsx
'use client';
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Apple, Sparkles } from 'lucide-react';

// Define proper types
interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  error?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginError>({});

  // Validation function
  const validateForm = () => {
    const newErrors: LoginError = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login with API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user info in localStorage for quick access
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('Login successful', data);
      
      // Redirect to home page or previous page
      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/';
      router.push(redirectTo);
      
    } catch (error: unknown) {
      console.error('Login failed', error);
      const errorMessage = error instanceof Error ? error.message : 'Invalid credentials. Please try again.';
      setErrors({ 
        general: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
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
        ease: [0.25, 0.1, 0.25, 1] as const, // Type assertion for Framer Motion compatibility
      },
    },
  };

  return (
    <div className="min-h-screen bg-cream overflow-hidden">
      <div className="flex min-h-screen flex-col lg:flex-row">
        
        {/* LEFT SECTION - Fashion Image with Overlay */}
        <div className="relative hidden lg:block lg:w-1/2 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format"
            alt="Playnaad Fashion"
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
                <h1 className="text-3xl font-serif tracking-[0.2em] font-light text-white">
                  PLAY<span className="text-amber-600 font-medium">NAAD</span>
                </h1>
              </Link>
            </div>
            
            {/* Welcome Text */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 text-white"
              >
                <div className="w-8 h-px bg-gold" />
                <Sparkles size={14} className="text-gold" />
                <div className="w-8 h-px bg-gold" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-light text-white leading-tight"
              >
                Welcome back to
                <br />
                <span className="text-amber-600 italic">Playnaad</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/70 text-sm max-w-md"
              >
                Where timeless elegance meets contemporary design. 
                Sign in to explore our curated collections.
              </motion.p>
            </div>
            
            {/* Decorative Elements */}
            <div className="space-y-2">
              <div className="w-16 h-px bg-linear-to-r from-gold/50 to-transparent" />
              <p className="text-cream/40 text-xs tracking-wider uppercase">
                Est. 2025
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
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
                <Sparkles size={12} className="text-gold" />
                <div className="w-8 h-px bg-gold" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-light text-charcoal mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-gray text-sm">
                Sign in to continue your style journey
              </p>
            </motion.div>

            {/* General Error Message */}
            {errors.general && (
              <motion.div 
                variants={itemVariants}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Login Form */}
            <motion.form variants={itemVariants} onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray/50" 
                    strokeWidth={1.5}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg text-charcoal placeholder-muted-gray/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100' 
                        : 'border-charcoal/20 focus:border-gold focus:ring-gold/20'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-gray/50" 
                    strokeWidth={1.5}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-charcoal/20 text-gold focus:ring-gold/20 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-muted-gray group-hover:text-charcoal transition-colors">
                    Remember me
                  </span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-gold hover:text-gold/80 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3 bg-charcoal text-cream rounded-lg text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gold hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg 
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
                  <span className="px-4 bg-cream text-muted-gray/60">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-charcoal/20 rounded-lg text-sm text-charcoal hover:border-gold hover:text-gold transition-all duration-300 group"
                >
                  <FaGoogle size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-charcoal/20 rounded-lg text-sm text-charcoal hover:border-gold hover:text-gold transition-all duration-300 group"
                >
                  <Apple size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Apple</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-gray mt-6">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-gold hover:text-gold/80 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}