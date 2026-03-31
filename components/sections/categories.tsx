'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Category Data with More Details
const categories = [
  {
    id: 1,
    name: "Women's Wear",
    slug: "/women",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format",
    description: "Timeless elegance for the modern woman",
    tagline: "Sarees • Lehengas • Kurtas",
    color: "from-rose-900/40",
    size: "large"
  },
  {
    id: 2,
    name: "Men's Edit",
    slug: "/men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format",
    description: "Refined sophistication",
    tagline: "Kurtas • Sherwanis • Blazers",
    color: "from-blue-900/40",
    size: "small"
  },
  {
    id: 3,
    name: "Accessories",
    slug: "/accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format",
    description: "Complete your look",
    tagline: "Jewelry • Bags • Footwear",
    color: "from-amber-900/40",
    size: "small"
  },
  {
    id: 4,
    name: "Festive",
    slug: "/collections/festive",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format",
    description: "Celebrate in style",
    tagline: "Wedding • Festivals • Occasions",
    color: "from-red-900/40",
    size: "small"
  },
  {
    id: 5,
    name: "Casuals",
    slug: "/collections/casuals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format",
    description: "Effortless everyday style",
    tagline: "Dresses • Tunics • Separates",
    color: "from-teal-900/40",
    size: "small"
  }
];

// Enhanced Category Card Component
const CategoryCard = ({ 
  category, 
  isLarge = false,
  index = 0
}: { 
  category: typeof categories[0]; 
  isLarge?: boolean;
  index?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={category.slug}
        className="group relative block overflow-hidden rounded-2xl bg-charcoal/5 transition-all duration-500 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={`relative w-full ${isLarge ? 'aspect-[3/4] md:aspect-[4/5]' : 'aspect-square'} overflow-hidden`}>
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
            quality={90}
            priority={index === 0}
          />
          
          {/* Gradient Overlay with Category Color */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-charcoal/40 to-charcoal/80 transition-opacity duration-500 group-hover:opacity-90`} />
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
            {/* <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0 L30 60 M0 30 L60 30" stroke="white" stroke-width="0.5" opacity="0.2"/%3E%3C/svg%3E')] bg-repeat" /> */}
            <div className="w-full h-full bg-[url('data:image/svg+xml;utf8,<svg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;M30 0 L30 60 M0 30 L60 30&quot; stroke=&quot;white&quot; stroke-width=&quot;0.5&quot; opacity=&quot;0.2&quot;/></svg>')] bg-repeat"></div>
          </div>
          
          {/* Arrow Icon - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 10, y: -10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 10,
              y: isHovered ? 0 : -10
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10"
          >
            <div className="p-2 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 group-hover:border-amber-600/50 transition-all duration-300">
              <ArrowUpRight 
                size={isLarge ? 20 : 16} 
                className="text-cream group-hover:text-amber-600 transition-colors duration-300" 
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
          
          {/* Text Content - Bottom Left */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-cream z-10">
            <div className="transform text-white/75 transition-transform duration-500 group-hover:-translate-y-1">
              <h3 className={`font-serif ${isLarge ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'} font-light tracking-wide mb-2`}>
                {category.name}
              </h3>
              <p className={`text-cream/70 ${isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'} mb-2 transition-all duration-500 group-hover:text-cream/90`}>
                {category.description}
              </p>
              <p className={`text-cream/50 text-xs transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                {category.tagline}
              </p>
              {/* Decorative Line */}
              <motion.div 
                className="w-8 h-px bg-amber-600 mt-3"
                animate={{ width: isHovered ? 48 : 32 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
        
        {/* Glow Effect on Hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          isLarge ? 'shadow-2xl shadow-amber-600/20' : 'shadow-xl shadow-amber-600/10'
        }`} />
      </Link>
    </motion.div>
  );
};

// Main Categories Section
export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const largeCategory = categories.find(c => c.size === 'large');
  const smallCategories = categories.filter(c => c.size === 'small');

  return (
    <section ref={sectionRef} className="relative w-full bg-cream py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-amber-600 font-medium">
              Shop by Category
            </span>
            <Sparkles size={14} className="text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-charcoal">
            Find your{' '}
            <span className="relative italic text-amber-600 font-medium inline-block">
              aesthetic
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '100%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-amber-600/0 via-amber-600 to-amber-600/0"
              />
            </span>
          </h2>
          <p className="text-muted-gray text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Discover our curated collections, each telling a unique story of craftsmanship and elegance
          </p>
        </motion.div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {/* Left Large Card */}
          <div className="md:row-span-2">
            {largeCategory && (
              <CategoryCard 
                category={largeCategory} 
                isLarge={true} 
                index={0}
              />
            )}
          </div>

          {/* Right Side - Grid of Small Cards */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              {smallCategories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Categories Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-charcoal hover:text-amber-600 transition-colors duration-300 border-b border-transparent hover:border-amber-600 pb-1"
          >
            <span>View All Collections</span>
            <ArrowUpRight 
              size={16} 
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}