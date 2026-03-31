'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHeart,
    FaRegHeart,
    FaShoppingBag,
    FaBolt,
    FaTruck,
    FaUndo,
    FaShieldAlt,
    FaStar,
    FaRegStar,
    FaChevronDown,
    FaChevronUp,
    FaExpand,
    FaMinus,
    FaPlus,
    FaCheckCircle,
    FaTimes
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

// Product Data
const product = {
    id: 1,
    name: "Embroidered Silk Saree",
    category: "Women's Wear",
    price: 8999,
    oldPrice: 12999,
    rating: 4.8,
    reviews: 124,
    description: "Handcrafted by master artisans, this exquisite silk saree features intricate zari embroidery inspired by Mughal architecture. The luxurious fabric drapes gracefully, making it perfect for weddings and festive occasions.",
    shortDescription: "Exquisite hand-embroidered silk saree with intricate zari work. Perfect for weddings and festive celebrations.",
    fabric: "Pure Silk with Zari Work",
    fit: "Regular Fit, True to Size",
    care: "Dry Clean Only",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["amber-600", "Maroon", "Navy Blue", "Emerald Green"],
    images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1974&auto=format", // nature lake
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1974&auto=format", // city skyline
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format", // dog portrait
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format", // mountains
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1974&auto=format", // food
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1974&auto=format", // workspace
    ]
};

// Related Products
const relatedProducts = [
    {
        id: 2,
        name: "Banarasi Silk Saree",
        price: 12999,
        oldPrice: 18999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format",
        rating: 4.9
    },
    {
        id: 3,
        name: "Chanderi Cotton Saree",
        price: 5499,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format",
        rating: 4.7
    },
    {
        id: 4,
        name: "Designer Lehenga",
        price: 24999,
        oldPrice: 34999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format",
        rating: 4.9
    },
    {
        id: 5,
        name: "Silk Blend Kurta",
        price: 6499,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format",
        rating: 4.6
    }
];

// Toast Notification Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
        >
            {type === 'success' ? <FaCheckCircle size={16} /> : <FaTimes size={16} />}
            <span className="text-sm">{message}</span>
        </motion.div>
    );
};

// Accordion Component
const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-charcoal/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex justify-between items-center text-left hover:text-amber-600 transition-colors duration-300"
            >
                <span className="font-medium text-charcoal">{title}</span>
                {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 text-muted-gray text-sm leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            

            {isOpen && (
    <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        onClick={() => setIsOpen(false)} // 👈 close on click
    >
        <div className="relative w-[90%] h-[90%]">
            <Image
                src={images[selectedImage]}
                alt="Zoomed image"
                fill
                className="object-contain"
            />
        </div>
    </div>
)}

            <div
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-charcoal/5 cursor-zoom-in group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onClick={() => setIsOpen(true)} // 👈 click event
            >
                <Image
                    src={images[selectedImage]}
                    alt="Product image"
                    fill
                    className={`object-cover transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'
                        }`}
                    priority
                />

                <div className="absolute top-4 right-4 p-2 bg-cream/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaExpand size={16} className="text-charcoal" />
                </div>
            </div>


            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === idx
                            ? 'border-amber-600 shadow-lg'
                            : 'border-transparent hover:border-amber-600/50'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

// Size Selector Component
const SizeSelector = ({ sizes, selectedSize, onSelect }: any) => {
    return (
        <div className="flex flex-wrap gap-3">
            {sizes.map((size: string) => (
                <button
                    key={size}
                    onClick={() => onSelect(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${selectedSize === size
                        ? 'border-amber-600 bg-amber-600 text-charcoal font-medium'
                        : 'border-charcoal/20 hover:border-amber-600 text-charcoal'
                        }`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

// Main Product Page Component
export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('amber-600');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuyingNow, setIsBuyingNow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [cartCount, setCartCount] = useState(0);
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('playnaad_cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
            setCartCount(totalItems);
        }

        // Load recently viewed
        const savedRecentlyViewed = localStorage.getItem('playnaad_recently_viewed');
        if (savedRecentlyViewed) {
            setRecentlyViewed(JSON.parse(savedRecentlyViewed));
        }

        // Add current product to recently viewed
        const currentProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]
        };

        let recent = [currentProduct];
        if (savedRecentlyViewed) {
            const parsed = JSON.parse(savedRecentlyViewed);
            const filtered = parsed.filter((p: any) => p.id !== product.id);
            recent = [currentProduct, ...filtered].slice(0, 4);
        }

        localStorage.setItem('playnaad_recently_viewed', JSON.stringify(recent));
        setRecentlyViewed(recent);
    }, []);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    const handleAddToCart = async () => {
        setIsAddingToCart(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get existing cart
        const existingCart = localStorage.getItem('playnaad_cart');
        let cart = existingCart ? JSON.parse(existingCart) : [];

        // Check if product already exists with same size and color
        const existingItemIndex = cart.findIndex(
            (item: any) =>
                item.id === product.id &&
                item.size === selectedSize &&
                item.color === selectedColor
        );

        if (existingItemIndex !== -1) {
            // Update quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: selectedSize,
                color: selectedColor,
                quantity: quantity,
                image: product.images[0]
            });
        }

        // Save to localStorage
        localStorage.setItem('playnaad_cart', JSON.stringify(cart));

        // Update cart count
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);

        // Dispatch custom event for navbar update
        window.dispatchEvent(new Event('cartUpdated'));

        showNotification(`Added ${quantity} item(s) to cart!`, 'success');
        setIsAddingToCart(false);
    };

    const handleBuyNow = async () => {
        setIsBuyingNow(true);

        // Add to cart first
        const existingCart = localStorage.getItem('playnaad_cart');
        let cart = existingCart ? JSON.parse(existingCart) : [];

        const existingItemIndex = cart.findIndex(
            (item: any) =>
                item.id === product.id &&
                item.size === selectedSize &&
                item.color === selectedColor
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: selectedSize,
                color: selectedColor,
                quantity: quantity,
                image: product.images[0]
            });
        }

        localStorage.setItem('playnaad_cart', JSON.stringify(cart));

        await new Promise(resolve => setTimeout(resolve, 500));

        // Redirect to checkout
        window.location.href = '/checkout';
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);

        // Get existing wishlist
        const existingWishlist = localStorage.getItem('playnaad_wishlist');
        let wishlist = existingWishlist ? JSON.parse(existingWishlist) : [];

        if (!isWishlisted) {
            // Add to wishlist
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0]
            });
            showNotification('Added to wishlist!', 'success');
        } else {
            // Remove from wishlist
            wishlist = wishlist.filter((item: any) => item.id !== product.id);
            showNotification('Removed from wishlist', 'success');
        }

        localStorage.setItem('playnaad_wishlist', JSON.stringify(wishlist));
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <Toast
                        message={toastMessage}
                        type={toastType}
                        onClose={() => setShowToast(false)}
                    />
                )}
            </AnimatePresence>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* LEFT COLUMN - Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <ImageGallery images={product.images} />
                    </motion.div>

                    {/* RIGHT COLUMN - Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-1/2"
                    >
                        {/* Category */}
                        <div className="mb-4">
                            <span className="text-xs tracking-[0.2em] uppercase text-amber-600">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl font-serif font-light text-charcoal mb-3">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    i < Math.floor(product.rating) ? (
                                        <FaStar key={i} size={14} className="text-amber-600" />
                                    ) : (
                                        <FaRegStar key={i} size={14} className="text-amber-600/30" />
                                    )
                                ))}
                            </div>
                            <span className="text-sm text-muted-gray">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                            <MdVerified size={14} className="text-amber-600" />
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-serif text-charcoal">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.oldPrice && (
                                <span className="text-lg text-muted-gray line-through">
                                    ₹{product.oldPrice.toLocaleString()}
                                </span>
                            )}
                            {product.oldPrice && (
                                <span className="text-sm text-green-600 font-medium">
                                    Save ₹{(product.oldPrice - product.price).toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="text-muted-gray leading-relaxed mb-6">
                            {product.shortDescription}
                        </p>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-medium text-charcoal">Select Size</label>
                                <button className="text-xs text-amber-600 hover:text-amber-600/80 transition-colors">
                                    Size Guide
                                </button>
                            </div>
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={selectedSize}
                                onSelect={setSelectedSize}
                            />
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-charcoal mb-3">
                                Select Color
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${selectedColor === color
                                            ? 'border-amber-600 bg-amber-600/10 text-amber-600'
                                            : 'border-charcoal/20 hover:border-amber-600 text-charcoal'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-charcoal mb-3">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-charcoal/20 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-all duration-300"
                                >
                                    <FaMinus size={12} />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-lg border border-charcoal/20 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-all duration-300"
                                >
                                    <FaPlus size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="flex-1 py-3 bg-charcoal text-cream rounded-lg text-sm font-medium tracking-wide transition-all duration-300 hover:bg-amber-600 hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                {isAddingToCart ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                                        <span>Adding...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingBag size={14} />
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleWishlist}
                                className="px-4 py-3 rounded-lg border border-charcoal/20 hover:border-amber-600 transition-all duration-300 group"
                            >
                                {isWishlisted ? (
                                    <FaHeart size={18} className="text-amber-600" />
                                ) : (
                                    <FaRegHeart size={18} className="text-charcoal group-hover:text-amber-600" />
                                )}
                            </button>
                        </div>

                        {/* Buy Now Button */}
                        <button
                            onClick={handleBuyNow}
                            disabled={isBuyingNow}
                            className="w-full py-3 bg-transparent border-2 border-charcoal text-charcoal rounded-lg text-sm font-medium tracking-wide transition-all duration-300 hover:bg-amber-600 hover:border-amber-600 hover:text-charcoal mb-6 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isBuyingNow ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <FaBolt size={14} />
                                    <span>Buy Now</span>
                                </>
                            )}
                        </button>

                        {/* Delivery Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-charcoal/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <FaTruck size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-xs font-medium text-charcoal">Free Shipping</p>
                                    <p className="text-xs text-muted-gray">On orders ₹2499+</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaUndo size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-xs font-medium text-charcoal">Easy Returns</p>
                                    <p className="text-xs text-muted-gray">15 days policy</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaShieldAlt size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-xs font-medium text-charcoal">Secure Checkout</p>
                                    <p className="text-xs text-muted-gray">100% secure</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MdVerified size={18} className="text-amber-600" />
                                <div>
                                    <p className="text-xs font-medium text-charcoal">Authentic</p>
                                    <p className="text-xs text-muted-gray">Guaranteed quality</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-charcoal mb-3">Product Details</h3>
                            <div className="space-y-2 text-sm text-muted-gray">
                                <p><span className="font-medium text-charcoal">Fabric:</span> {product.fabric}</p>
                                <p><span className="font-medium text-charcoal">Fit:</span> {product.fit}</p>
                                <p><span className="font-medium text-charcoal">Care:</span> {product.care}</p>
                            </div>
                        </div>

                        {/* Accordion Section */}
                        <div className="border-t border-charcoal/10 pt-4">
                            <AccordionItem title="Description">
                                <p>{product.description}</p>
                            </AccordionItem>
                            <AccordionItem title="Shipping & Returns">
                                <p>Free shipping on orders above ₹2499. Estimated delivery within 5-7 business days.
                                    Easy returns within 15 days of delivery. Please ensure the product is unused and in original packaging.</p>
                            </AccordionItem>
                            <AccordionItem title="Size Guide">
                                <p>Please refer to our size chart below for accurate measurements. For custom sizing,
                                    please contact our customer support team at support@playnaad.com</p>
                            </AccordionItem>
                        </div>
                    </motion.div>
                </div>

                {/* Recently Viewed Section */}
                {recentlyViewed.length > 0 && (
                    <div className="mt-16 md:mt-20">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-serif font-light text-charcoal">
                                Recently Viewed
                            </h2>
                            <div className="w-12 h-px bg-amber-600 mx-auto mt-3" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                            {recentlyViewed.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => window.location.href = `/product/${item.id}`}
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="font-serif text-sm font-light text-charcoal group-hover:text-amber-600 transition-colors line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-charcoal font-medium text-sm">₹{item.price.toLocaleString()}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Products Section */}
                <div className="mt-16 md:mt-20">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-serif font-light text-charcoal">
                            You May Also Like
                        </h2>
                        <div className="w-12 h-px bg-amber-600 mx-auto mt-3" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => window.location.href = `/product/${product.id}`}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="font-serif text-lg font-light text-charcoal group-hover:text-amber-600 transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-charcoal font-medium">₹{product.price.toLocaleString()}</span>
                                    {product.oldPrice && (
                                        <span className="text-sm text-muted-gray line-through">
                                            ₹{product.oldPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <FaStar size={12} className="text-amber-600" />
                                    <span className="text-xs text-muted-gray">{product.rating}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Add-to-Cart Bar (Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-charcoal/10 p-4 lg:hidden z-50 shadow-lg">
                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className="flex-1 py-3 bg-charcoal text-cream rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isAddingToCart ? (
                            <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <FaShoppingBag size={14} />
                                Add to Cart - ₹{product.price.toLocaleString()}
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleBuyNow}
                        disabled={isBuyingNow}
                        className="flex-1 py-3 border-2 border-charcoal text-charcoal rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isBuyingNow ? (
                            <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <FaBolt size={14} />
                                Buy Now
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}