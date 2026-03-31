'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Define custom easing values
const customEase = [0.25, 0.1, 0.25, 1]; // cubic-bezier

// Testimonial Data
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Jaipur, India",
    rating: 5,
    text: "The craftsmanship of Playnaad's pieces is truly exceptional. Every detail, from the fabric to the embroidery, speaks of luxury and tradition. My wedding lehenga was an absolute dream come true. The team went above and beyond to ensure every fitting was perfect.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format",
    initials: "PS",
    date: "March 2025"
  },
  {
    id: 2,
    name: "Ananya Kapoor",
    location: "Mumbai, India",
    rating: 5,
    text: "Absolutely in love with my festive collection purchase! The attention to detail and the quality of fabric is unmatched. Playnaad has become my go-to for all special occasions. Their customer service is equally impressive and personalized.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format",
    initials: "AK",
    date: "February 2025"
  },
  {
    id: 3,
    name: "Rahul Mehta",
    location: "Bengaluru, India",
    rating: 5,
    text: "The men's collection at Playnaad is a game-changer. The sherwani I ordered for my brother's wedding received countless compliments. The fit was perfect, and the fabric felt incredibly luxurious. Highly recommend for anyone seeking refined elegance.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format",
    initials: "RM",
    date: "January 2025"
  },
  {
    id: 4,
    name: "Neha Gupta",
    location: "Delhi, India",
    rating: 5,
    text: "The fusion wear collection is absolutely stunning. I've purchased multiple pieces and each one has been a conversation starter. The brand's commitment to sustainable fashion while maintaining luxury is truly admirable.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format",
    initials: "NG",
    date: "December 2024"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Hyderabad, India",
    rating: 5,
    text: "Exceptional quality and timeless designs. The customer service team was incredibly helpful in helping me choose the perfect outfit for my anniversary celebration. The packaging was also very elegant and thoughtful.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
    initials: "VS",
    date: "November 2024"
  },
  {
    id: 6,
    name: "Meera Krishnan",
    location: "Chennai, India",
    rating: 4,
    text: "Beautiful designs that blend traditional aesthetics with modern sensibilities. The saree I ordered exceeded my expectations in terms of quality and craftsmanship. Will definitely be ordering again for upcoming festivals.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format",
    initials: "MK",
    date: "October 2024"
  }
];

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${i < rating ? 'fill-amber-600 text-amber-600' : 'text-amber-600/30'} transition-colors duration-300`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: customEase as any, // Type assertion for custom bezier array
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const, // Use const assertion for string literal
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="group relative bg-cream rounded-2xl p-6 md:p-8 border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      {/* Decorative Quote Background */}
      <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Quote size={80} strokeWidth={0.5} className="text-charcoal" />
      </div>

      {/* Star Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote Icon */}
      <div className="mb-4">
        <Quote size={28} className="text-amber-600/40" strokeWidth={1.5} />
      </div>

      {/* Review Text - Fixed unescaped quotes */}
      <p className="text-charcoal/80 font-serif italic text-base md:text-lg leading-relaxed mb-6 line-clamp-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-charcoal/10">
        {/* Avatar */}
        <div className="relative shrink-0"> {/* Changed from flex-shrink-0 */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-amber-600/20 to-amber-600/5"> {/* Changed from bg-gradient-to-br */}
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-600 font-medium">
                {testimonial.initials}
              </div>
            )}
          </div>
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border border-amber-600/20 group-hover:border-amber-600/40 transition-all duration-300" />
        </div>

        {/* Name and Location */}
        <div className="flex-1">
          <h4 className="font-medium text-charcoal tracking-wide">
            {testimonial.name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-gray">
            <span>{testimonial.location}</span>
            <span className="w-1 h-1 rounded-full bg-amber-600/40" />
            <span>{testimonial.date}</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-amber-600/5 via-transparent to-transparent rounded-2xl" /> {/* Changed from bg-gradient-to-br */}
      </div>
    </motion.div>
  );
};

// Main Testimonials Section
export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
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

  const headerVariants = {
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
    <section ref={sectionRef} className="relative w-full bg-linear-to-b from-cream to-cream/95 py-16 md:py-20 lg:py-24 overflow-hidden"> {/* Changed from bg-gradient-to-b */}
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Faded Quote Pattern */}
        <div className="absolute top-20 left-10 opacity-[0.02] hidden lg:block">
          <Quote size={200} strokeWidth={0.5} className="text-charcoal" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-[0.02] hidden lg:block">
          <Quote size={200} strokeWidth={0.5} className="text-charcoal" />
        </div>
        
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
        
        {/* Subtle Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-amber-600/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-amber-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={headerVariants} className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-amber-600" />
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-amber-600 font-medium">
              Real Reviews
            </span>
            <div className="w-8 h-px bg-amber-600" />
          </motion.div>
          
          <motion.h2
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-charcoal"
          >
            What our{' '}
            <span className="relative italic text-amber-600 font-medium inline-block">
              community
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={isInView ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-0.5 bg-linear-to-r from-amber-600/0 via-amber-600 to-amber-600/0" // Changed from h-[2px] and bg-gradient-to-r
              />
            </span>
            <br />
            says
          </motion.h2>
          
          <motion.p
            variants={headerVariants}
            className="text-muted-gray text-sm md:text-base max-w-2xl mx-auto mt-4"
          >
            Join thousands of satisfied customers who have experienced the Playnaad difference
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 md:mt-16 pt-8 border-t border-charcoal/10"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-gray">
            <div className="flex items-center gap-2">
              <Star size={16} className="fill-amber-600 text-amber-600" />
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-600" />
              <span>1000+ Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-600" />
              <span>Trusted by 40K+ Customers</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-600/20 to-transparent" /> {/* Changed from bg-gradient-to-r */}
    </section>
  );
}