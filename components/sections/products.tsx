'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: 'new' | 'sale';
  filterType: string;
  rating?: number;
}

// Sample Products Data
const products: Product[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    category: "Men's Wear",
    price: 999,
    oldPrice: 1499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    badge: "sale",
    filterType: "men",
    rating: 4.5
  },
  {
    id: 2,
    name: "Denim Jacket",
    category: "Men's Wear",
    price: 2499,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985",
    badge: "new",
    filterType: "men",
    rating: 4.7
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    category: "Women's Wear",
    price: 1999,
    oldPrice: 2999,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    badge: "sale",
    filterType: "women",
    rating: 4.6
  },
  {
    id: 4,
    name: "High Waist Jeans",
    category: "Women's Wear",
    price: 1799,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09",
    filterType: "women",
    rating: 4.4
  },
  {
    id: 5,
    name: "Running Sneakers",
    category: "Footwear",
    price: 2999,
    oldPrice: 3999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    badge: "sale",
    filterType: "casuals",
    rating: 4.8
  },
  {
    id: 6,
    name: "Leather Wallet",
    category: "Accessories",
    price: 799,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    filterType: "casuals",
    rating: 4.3
  },
  {
    id: 7,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    oldPrice: 6999,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    badge: "new",
    filterType: "electronics",
    rating: 4.6
  },
  {
    id: 8,
    name: "Backpack Travel Bag",
    category: "Bags",
    price: 1599,
    image: "https://images.unsplash.com/photo-1509762774605-f07235a08f1f",
    filterType: "casuals",
    rating: 4.5
  }
];

// Product Card Component
const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      // Add to cart logic here
      console.log('Added to cart:', product.name);
    }, 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={90}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.badge === 'new' && (
              <span className="px-2 py-1 text-xs font-medium tracking-wide uppercase bg-charcoal text-cream rounded">
                New
              </span>
            )}
            {product.badge === 'sale' && (
              <span className="px-2 py-1 text-xs font-medium tracking-wide uppercase bg-gold text-charcoal rounded">
                Sale
              </span>
            )}
          </div>
          
          {/* Hover Action Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? '0%' : '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal via-charcoal/95 to-transparent p-4 pt-8"
          >
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                className="flex-1 bg-gold text-charcoal py-2 rounded-full text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    Add to Cart
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className="p-2 bg-cream/10 backdrop-blur-sm rounded-full hover:bg-cream/20 transition-colors"
              >
                <Heart 
                  size={18} 
                  className={isWishlisted ? 'fill-gold text-gold' : 'text-cream'} 
                  strokeWidth={1.5}
                />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
              className="bg-cream/90 backdrop-blur-sm text-charcoal px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <Eye size={14} />
              Quick View
            </motion.div>
          </motion.div>
        </div>
        
        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <p className="text-xs tracking-wider uppercase text-muted-gray">
            {product.category}
          </p>
          <h3 className="font-serif text-lg font-light text-charcoal group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-charcoal">₹{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-gray line-through">₹{product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-gold text-gold" />
              <span className="text-xs text-muted-gray">{product.rating}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-charcoal/10 rounded-lg" />
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-charcoal/10 rounded w-1/3" />
      <div className="h-5 bg-charcoal/10 rounded w-2/3" />
      <div className="h-4 bg-charcoal/10 rounded w-1/2" />
    </div>
  </div>
);

// Main Products Section
export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'festive', label: 'Festive' },
    { id: 'casuals', label: 'Casuals' }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter products
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.filterType === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section className="w-full bg-cream py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm tracking-[0.2em] uppercase text-gold mb-3">
            Curated For You
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-charcoal">
            New{' '}
            <span className="relative italic text-gold font-medium inline-block">
              Arrivals
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '100%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0"
              />
            </span>
          </h2>
          <p className="text-muted-gray text-sm md:text-base max-w-2xl mx-auto mt-4">
            Discover our latest collection featuring timeless designs and contemporary elegance
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-charcoal text-cream shadow-lg'
                  : 'bg-transparent border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading
            ? // Show skeletons while loading
              Array(8).fill(0).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : // Show actual products
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
          }
        </div>

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-gray">No products found in this category.</p>
          </motion.div>
        )}

        {/* View All Link */}
        {!isLoading && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12 md:mt-16"
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-charcoal hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold pb-1"
            >
              <span>View All Products</span>
              <ShoppingBag 
                size={14} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}