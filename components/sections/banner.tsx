'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Quote } from 'lucide-react';

// Stats Data
const stats = [
  {
    value: "12+",
    label: "Years of Craft",
    description: "Decades of excellence in design"
  },
  {
    value: "40K",
    label: "Happy Customers",
    description: "Trusted by discerning clientele"
  },
  {
    value: "300+",
    label: "Styles Live",
    description: "Curated collections for every occasion"
  },
  {
    value: "100%",
    label: "Ethically Made",
    description: "Sustainable practices, transparent sourcing"
  }
];

// Define custom easing values
const customEase = [0.25, 0.1, 0.25, 1]; // cubic-bezier

export default function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants with proper easing types
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

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        ease: customEase as any, // Type assertion for custom bezier array
      },
    }),
  };

  return (
    <section className="relative w-full bg-charcoal overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-600/5 via-transparent to-amber-600/5" /> {/* Changed from bg-gradient-to-br */}
        
        {/* Decorative Circles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-amber-600/30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -bottom-60 -left-40 w-125 h-125 rounded-full border-2 border-amber-600/20" // Changed from w-[500px] h-[500px]
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-amber-600/10" // Changed from w-[600px] h-[600px]
        />
        
        {/* Large Faded Quote Icon */}
        <div className="absolute bottom-10 right-10 opacity-5">
          <Quote size={120} strokeWidth={0.5} className="text-cream" />
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN - Brand Story */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Small Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-amber-600" />
              <span className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium">
                Our Philosophy
              </span>
              <Sparkles size={12} className="text-amber-600" />
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-cream leading-[1.2]"
            >
              Crafted with{' '}
              <span className="relative italic text-amber-600 font-medium inline-block">
                intention
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-amber-600/40" // Changed from h-[2px]
                />
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-cream/70 leading-relaxed text-base md:text-lg max-w-md"
            >
              At Playnaad, we believe that true luxury lies in the details. 
              Each piece is meticulously crafted by master artisans, blending 
              contemporary design with India&apos;s rich textile heritage. {/* Fixed unescaped apostrophe */}
              Our commitment to sustainability and ethical practices ensures 
              that every creation tells a story of purpose and passion.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link
                href="/our-story"
                className="group inline-flex items-center gap-3 px-8 py-3 border-2 border-amber-600 text-amber-600 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-amber-600 hover:text-charcoal"
              >
                <span>Discover Our Story</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  strokeWidth={1.5}
                />
              </Link>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              variants={itemVariants}
              className="pt-6"
            >
              <div className="w-16 h-px bg-linear-to-r from-amber-600/50 to-transparent" /> {/* Changed from bg-gradient-to-r */}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-8 md:gap-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statVariants}
                className="relative group"
              >
                {/* Vertical Divider Line */}
                {index % 2 === 0 && (
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-linear-to-b from-amber-600/30 via-amber-600/10 to-transparent hidden md:block" /> /* Changed from bg-gradient-to-b */
                )}
                
                <div className="space-y-2 text-center md:text-left">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-amber-600"
                  >
                    {stat.value}
                  </motion.div>
                  <div>
                    <h3 className="text-sm md:text-base font-medium text-cream tracking-wide mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-cream/50 hidden md:block">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-600/30 to-transparent" /> {/* Changed from bg-gradient-to-r */}
    </section>
  );
}