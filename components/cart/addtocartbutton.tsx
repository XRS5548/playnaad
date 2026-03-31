// components/AddToCartButton.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types/cart";

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  showQuantityControls?: boolean; // Option to show +/- controls
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  variant = "default",
  size = "default",
  className = "",
  showQuantityControls = false
}) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  // Check if product is already in cart and get quantity
  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === product.id);
    if (cartItem) {
      setIsAdded(true);
      setQuantity(cartItem.quantity);
    } else {
      setIsAdded(false);
      setQuantity(0);
    }
  }, [cartItems, product.id]);

  const handleAddToCart = (): void => {
    addToCart(product);
    
    // Show feedback animation
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };

  const handleIncrement = (): void => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
    
    // Show feedback on increment
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 1000);
  };

  const handleDecrement = (): void => {
    if (quantity === 1) {
      removeFromCart(product.id);
      setIsAdded(false);
      setQuantity(0);
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  // If quantity controls are enabled and item is in cart, show quantity selector
  if (showQuantityControls && isAdded) {
    return (
      <div className="flex items-center gap-2">
        <Button
          onClick={handleDecrement}
          variant="outline"
          size={size}
          className="border-gray-300 hover:border-gold hover:text-gold transition-all duration-300"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <div className="relative">
          <span className="w-12 text-center font-semibold text-gray-800 text-lg">
            {quantity}
          </span>
          {showFeedback && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
              +1
            </span>
          )}
        </div>
        <Button
          onClick={handleIncrement}
          variant="outline"
          size={size}
          className="border-gray-300 hover:border-gold hover:text-gold transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleAddToCart}
      variant={variant}
      size={size}
     
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 mr-2 animate-in fade-in zoom-in duration-200" />
          <span>Added to Cart</span>
          <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
            {quantity}
          </span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Add to Cart
        </>
      )}
      
      {/* Success Feedback Tooltip */}
      {showFeedback && (
        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-lg">
          <Check className="w-3 h-3 inline mr-1" />
          Added to cart! (Total: {quantity + 1})
        </span>
      )}
    </Button>
  );
};