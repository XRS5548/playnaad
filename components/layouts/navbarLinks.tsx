'use client';

import Link from 'next/link';
import { useState } from 'react';

type SubLink = {
  name: string;
  href: string;
};

type Category = {
  title: string;
  links: SubLink[];
};

type NavItem = {
  name: string;
  href?: string;
  categories?: Category[];
};

const navData: NavItem[] = [
  {
    name: 'Topwear',
    categories: [
      {
        title: 'Men',
        links: [
          { name: 'T-Shirts', href: '/men/tshirts' },
          { name: 'Shirts', href: '/men/shirts' },
          { name: 'Hoodies', href: '/men/hoodies' },
        ],
      },
      {
        title: 'Women',
        links: [
          { name: 'Tops', href: '/women/tops' },
          { name: 'Kurtis', href: '/women/kurtis' },
        ],
      },
    ],
  },
  {
    name: 'Bottomwear',
    categories: [
      {
        title: 'All',
        links: [
          { name: 'Jeans', href: '/jeans' },
          { name: 'Trousers', href: '/trousers' },
        ],
      },
    ],
  },
  {
    name: 'Accessories',
    categories: [
      {
        title: 'Explore',
        links: [
          { name: 'Watches', href: '/watches' },
          { name: 'Sunglasses', href: '/sunglasses' },
        ],
      },
    ],
  },
  {
    name: 'New Arrivals',
    href: '/new-arrivals',
  },
];

export default function NavLinks() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      className="relative"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {/* TOP LINKS */}
      <div className="flex items-center space-x-8">
        {navData.map((item, index) => (
          <div
            key={item.name}
            onMouseEnter={() => setActiveIndex(index)}
            className="relative"
          >
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm font-medium tracking-wide hover:text-gold transition"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-sm font-medium tracking-wide cursor-pointer hover:text-gold transition">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* FULL WIDTH DROPDOWN */}
      {activeIndex !== null &&
        navData[activeIndex].categories && (
          <div className="absolute left-0 top-full w-screen bg-cream shadow-xl border-t border-charcoal/10">
            <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-4 gap-10">
              
              {navData[activeIndex].categories?.map((cat) => (
                <div key={cat.title}>
                  <h3 className="text-sm font-semibold mb-4 tracking-wide">
                    {cat.title}
                  </h3>

                  <ul className="space-y-2">
                    {cat.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-charcoal/70 hover:text-gold transition"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>
          </div>
        )}
    </div>
  );
}