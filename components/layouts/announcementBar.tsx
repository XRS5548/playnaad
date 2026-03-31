'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  /** Whether the bar is dismissible */
  dismissible?: boolean;
  /** Custom message (optional, uses default if not provided) */
  message?: string;
  /** Duration in days for the dismissal cookie */
  dismissDuration?: number;
}

const DEFAULT_MESSAGE = "Free shipping on orders above ₹2499 · New arrivals every Friday · Use code PLAY10 for 10% off";

export default function AnnouncementBar({ 
  dismissible = true, 
  message = DEFAULT_MESSAGE,
  dismissDuration = 7 
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true); // Default to true initially
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle client-side initialization after mount
  useEffect(() => {
    setIsMounted(true);
    
    // Check localStorage for dismissal preference
    if (dismissible) {
      const dismissed = localStorage.getItem('announcementBarDismissed');
      const dismissedAt = localStorage.getItem('announcementBarDismissedAt');
      
      if (dismissed === 'true' && dismissedAt) {
        const dismissedDate = new Date(parseInt(dismissedAt));
        const now = new Date();
        const daysDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // If within duration, hide the bar
        if (daysDiff < dismissDuration) {
          setIsVisible(false);
        } else {
          // Clear expired dismissal
          localStorage.removeItem('announcementBarDismissed');
          localStorage.removeItem('announcementBarDismissedAt');
        }
      }
    }
  }, [dismissible, dismissDuration]);

  // Clean up expired localStorage data when visible state changes
  useEffect(() => {
    if (!isMounted) return;
    
    if (dismissible && isVisible) {
      const dismissed = localStorage.getItem('announcementBarDismissed');
      const dismissedAt = localStorage.getItem('announcementBarDismissedAt');
      
      if (dismissed === 'true' && dismissedAt) {
        const dismissedDate = new Date(parseInt(dismissedAt));
        const now = new Date();
        const daysDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
        
        // Clear expired dismissal
        if (daysDiff >= dismissDuration) {
          localStorage.removeItem('announcementBarDismissed');
          localStorage.removeItem('announcementBarDismissedAt');
        }
      }
    }
  }, [dismissible, dismissDuration, isVisible, isMounted]);

  // Handle dismissal
  const handleDismiss = () => {
    setIsVisible(false);
    if (dismissible) {
      localStorage.setItem('announcementBarDismissed', 'true');
      localStorage.setItem('announcementBarDismissedAt', Date.now().toString());
    }
  };

  // Clone content for seamless infinite scroll
  const renderMarqueeContent = () => {
    const content = (
      <div 
        ref={contentRef}
        className="flex items-center gap-8 px-4 whitespace-nowrap"
      >
        <span className="inline-block tracking-wide">{message}</span>
      </div>
    );

    // Duplicate content for seamless loop
    return (
      <>
        {content}
        {content}
      </>
    );
  };

  // Don't render anything during SSR to avoid hydration issues
  if (!isMounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <div className="relative w-full bg-charcoal overflow-hidden z-50">
        <div className="relative h-10 md:h-10.5 w-full" />
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div 
      className="relative w-full bg-charcoal overflow-hidden z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Bar Container */}
      <div className="relative h-10 md:h-10.5 w-full">
        {/* Marquee Container */}
        <div 
          ref={marqueeRef}
          className="absolute inset-0 flex items-center"
          style={{
            animation: `marquee ${isHovered ? '25s' : '30s'} linear infinite`,
          }}
        >
          <div className="flex shrink-0">
            {renderMarqueeContent()}
          </div>
        </div>

        {/* Overlay Gradient for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-linear-to-r from-charcoal to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-12 bg-linear-to-l from-charcoal to-transparent pointer-events-none z-10" />

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 text-soft-amber-600/70 hover:text-soft-amber-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-soft-amber-600/50 rounded-full"
            aria-label="Dismiss announcement"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Custom Keyframes Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}