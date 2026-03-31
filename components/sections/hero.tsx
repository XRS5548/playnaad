'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// Define custom easing values
const customEase = [0.25, 0.1, 0.25, 1]; // cubic-bezier

export default function HeroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

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
        duration: 0.8,
        ease: customEase as any, // Type assertion for custom bezier array
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const, // Use const assertion for string literal
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: customEase as any, // Type assertion for custom bezier array
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const, // Use const assertion for string literal
      },
    },
  };

  return (
    <section ref={ref} className="relative w-full bg-cream overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Faded Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] whitespace-nowrap">
          <span className="text-[15vw] font-serif font-bold tracking-[0.2em] text-charcoal">
            PLAYNAAD
          </span>
        </div>
        
        {/* Decorative Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-2 border-gold/20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute -bottom-40 -left-40 w-150 h-150 rounded-full bg-gold/5 blur-3xl" // Changed from w-[600px] h-[600px]
        />
        
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          {/* Subtle Grain Texture - Simplified */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[#2C2A29] bg-noise" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen lg:min-h-[90vh]">
        <div className="flex flex-col lg:flex-row items-stretch min-h-screen lg:min-h-[90vh]">
          
          {/* LEFT COLUMN - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="w-full lg:w-1/2 flex items-center justify-center py-16 lg:py-0"
          >
            <div className="max-w-xl px-4 lg:px-8">
              {/* Top Tag */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-px bg-gold/60" />
                <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium">
                  New Collection 2025
                </span>
                <Sparkles size={14} className="text-gold" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight text-charcoal mb-6"
              >
                Dress in{' '}
                <span className="relative italic text-gold font-medium inline-block">
                  your
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute bottom-2 left-0 h-0.5 bg-gold/30" // Changed from h-[2px]
                  />
                </span>
                <br />
                story
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-muted-gray leading-relaxed mb-8 max-w-md"
              >
                Discover timeless elegance with our latest collection. Where 
                contemporary design meets the soul of Indian craftsmanship. 
                Each piece tells a unique story of artistry and heritage.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="/collections"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-charcoal text-cream rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gold hover:text-charcoal shadow-lg hover:shadow-xl"
                  >
                    Shop Now
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="/collections/all"
                    className="group inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal/20 text-charcoal rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:border-gold hover:text-gold bg-transparent"
                  >
                    Explore Collection
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                variants={itemVariants}
                className="mt-12 pt-8 border-t border-charcoal/10"
              >
                <div className="flex items-center gap-6 text-xs text-muted-gray">
                  <span className="tracking-wide">ETHICALLY CRAFTED</span>
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  <span className="tracking-wide">SUSTAINABLE FABRICS</span>
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  <span className="tracking-wide">ARTISAN MADE</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Image */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
            className="w-full lg:w-1/2 relative overflow-hidden"
          >
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              className="relative h-[60vh] lg:h-full min-h-125 w-full" // Changed from min-h-[500px]
            >
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format"
                alt="Playnaad Fashion Collection - Elegant Model in Designer Attire"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
              />
              
              {/* Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/20 via-transparent to-transparent lg:bg-linear-to-r lg:from-cream/10 lg:via-transparent lg:to-transparent" /> {/* Changed from bg-gradient-to-t and lg:bg-gradient-to-r */}
              
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/20 pointer-events-none opacity-0 lg:opacity-100 transition-opacity duration-700" />
              
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-linear-to-tr from-gold/10 via-transparent to-gold/10" /> {/* Changed from bg-gradient-to-tr */}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-gray">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gold/40"
          />
        </div>
      </motion.div>
    </section>
  );
}