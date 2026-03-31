'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

interface MarqueeProps {
  /** Speed of animation in seconds (lower = faster) */
  speed?: number;
  /** Direction of scroll: 'left' or 'right' */
  direction?: 'left' | 'right';
  /** Whether to pause on hover */
  pauseOnHover?: boolean;
  /** Whether to increase speed on hover */
  speedUpOnHover?: boolean;
  /** Custom items to display */
  items?: string[];
  /** Custom separator symbol */
  separator?: string;
  /** Text color class */
  textColor?: string;
  /** Background color class */
  bgColor?: string;
  /** Whether to show gradient edges */
  showGradientEdges?: boolean;
  /** Font weight (light, normal, medium, semibold) */
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold';
  /** Whether to make text uppercase */
  uppercase?: boolean;
}

const DEFAULT_ITEMS = [
  'New Arrivals',
  'Sustainable Fashion',
  'Made in India',
  "Playnaad SS'25",
  'Free Shipping ₹2499+',
  'Artisan Crafted',
  'Limited Edition',
  'Ethical Luxury'
];

const SEPARATORS = {
  star: '✦',
  dot: '•',
  diamond: '◆',
  circle: '●',
  line: '—',
  arrow: '→',
};

export default function Marquee({
  speed = 25,
  direction = 'left',
  pauseOnHover = true,
  speedUpOnHover = true,
  items = DEFAULT_ITEMS,
  separator = 'star',
  textColor = 'text-gold',
  bgColor = 'bg-charcoal',
  showGradientEdges = true,
  fontWeight = 'light',
  uppercase = false,
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Get separator symbol using useMemo to avoid recalculation
  const getSeparator = useCallback(() => {
    if (separator in SEPARATORS) {
      return SEPARATORS[separator as keyof typeof SEPARATORS];
    }
    return separator;
  }, [separator]);

  // Font weight mapping using useMemo
  const getFontWeight = useCallback(() => {
    const weights = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    };
    return weights[fontWeight];
  }, [fontWeight]);

  // Calculate animation duration based on hover state
  const animationDuration = useMemo(() => {
    if (isHovered && speedUpOnHover) {
      return speed * 0.7; // 30% faster on hover
    }
    return speed;
  }, [isHovered, speedUpOnHover, speed]);

  // Create the marquee content with all dependencies properly included
  const renderContent = useCallback(() => {
    const textClasses = `text-sm md:text-base tracking-[0.1em] ${getFontWeight()} italic whitespace-nowrap transition-all duration-300 ${
      isHovered ? 'text-gold/90' : textColor
    } ${uppercase ? 'uppercase' : ''}`;

    return (
      <div className="flex items-center gap-8 md:gap-12 shrink-0">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-8 md:gap-12">
            <span className={textClasses}>
              {item}
            </span>
            {index < items.length - 1 && (
              <span className={`${textColor}/40 text-xs md:text-sm transition-all duration-300 ${
                isHovered ? `${textColor}/60` : ''
              }`}>
                {getSeparator()}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }, [items, textColor, getFontWeight, uppercase, isHovered, getSeparator]);

  return (
    <div 
      className={`relative w-full ${bgColor} overflow-hidden py-3 md:py-4 border-y border-white/5 transition-all duration-300 ${
        isHovered ? 'border-gold/20' : 'border-white/5'
      }`}
      onMouseEnter={() => {
        if (pauseOnHover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Gradient Fade Edges */}
      {showGradientEdges && (
        <>
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-charcoal to-transparent z-10 pointer-events-none" /> {/* Changed from bg-gradient-to-r */}
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-charcoal to-transparent z-10 pointer-events-none" /> {/* Changed from bg-gradient-to-l */}
        </>
      )}
      
      {/* Subtle Overlay Glow on Hover */}
      <div className={`absolute inset-0 bg-linear-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 transition-opacity duration-500 pointer-events-none ${
        isHovered ? 'opacity-100' : ''
      }`} /> {/* Changed from bg-gradient-to-r */}
      
      {/* Main Marquee Container */}
      <div 
        ref={marqueeRef}
        className="flex overflow-hidden"
        style={{
          animation: `marquee-${direction} ${animationDuration}s linear infinite`,
          animationPlayState: pauseOnHover && isHovered ? 'paused' : 'running',
        }}
      >
        {/* Triple duplicate for seamless loop (ensures no gaps) */}
        <div className="flex shrink-0">
          {renderContent()}
          {renderContent()}
          {renderContent()}
        </div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}