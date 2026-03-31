// components/CartDialog.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ShoppingCart, X, Trash2, CreditCard, Shield, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "./CartItem";
import Link from "next/link";

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
    className={`relative p-2 text-charcoal transition-all duration-300 hover:text-gold hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-full ${className}`}
  >
    <Icon size={22} strokeWidth={1.5} />
    {badgeCount !== undefined && badgeCount > 0 && (
      <span className="absolute -top-1 -right-5 flex items-center justify-center w-5 h-5  font-semibold leading-none bg-black text-sm p-2 px-5 text-white  rounded-full shadow-sm">
        {badgeCount > 99 ? '99+' : badgeCount}
      </span>
    )}
  </button>
);

interface CartDialogProps {
  className?: string;
}

export const CartDialog: React.FC<CartDialogProps> = ({ className = "" }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
  } = useCart();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate totals
  const subtotal: number = getCartTotal();
  const shipping: number = subtotal > 5000 ? 0 : 99;
  const tax: number = Math.round(subtotal * 0.18); // 18% GST
  const total: number = subtotal + shipping + tax;
  const itemCount: number = getItemCount();

  if (!mounted) {
    return (
      <IconButton
        icon={ShoppingCart}
        label="Cart"
        badgeCount={0}
        className={className}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <IconButton
          icon={ShoppingCart}
          label="Cart"
          badgeCount={itemCount}
          className={className}
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        {/* Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-gold/40 via-gold to-gold/40"></div>

        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-gold" />
                </div>
                <DialogTitle className="text-2xl font-semibold">
                  Your Cart
                </DialogTitle>
              </div>
              {cartItems.length > 0 && (
                <IconButton
                  icon={Trash2}
                  label="Clear cart"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 hover:scale-100"
                />
              )}
            </div>
            <DialogDescription className="text-sm text-gray-500 mt-2">
              {cartItems.length === 0
                ? "Your cart is empty"
                : `You have ${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`}
            </DialogDescription>
          </DialogHeader>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <DialogClose asChild>
                <Button 
                  onClick={() => setIsOpen(false)}
                  className="bg-gold hover:bg-gold/90 text-white"
                >
                  Continue Shopping
                </Button>
              </DialogClose>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Truck size={14} className="text-gray-400" />
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span className="font-medium">
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-gold">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <DialogClose asChild>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button 
                      className="flex-1 bg-gold hover:bg-gold/90 text-white group"
                      onClick={() => {
                        setIsOpen(false);
                        // Add checkout navigation logic here
                      }}
                    >
                      <CreditCard className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Proceed to Checkout
                    </Button>
                  </DialogClose>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Shield size={12} />
                      Secure payment
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck size={12} />
                      Free returns
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      24/7 support
                    </span>
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="text-xs text-gray-400">Visa</span>
                    <span className="text-xs text-gray-400">Mastercard</span>
                    <span className="text-xs text-gray-400">UPI</span>
                    <span className="text-xs text-gray-400">PayPal</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};