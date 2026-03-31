// app/page.tsx
"use client";

import React from "react";
import { CartItem } from "@/types/cart";
import { CartDialog } from "@/components/cart/CartDialog";
import { AddToCartButton } from "@/components/cart/addtocartbutton";
import { Button } from "@/components/ui/button";

interface Product extends Omit<CartItem, 'quantity'> {
  description?: string;
}
const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 2999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    variant: "Wireless, Black",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 4999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    variant: "Silver, 44mm",
    description: "Fitness tracker with heart rate monitor and GPS"
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 1299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    variant: "Waterproof, Gray",
    description: "Durable backpack with laptop compartment"
  },
  {
    id: 4,
    name: "4K Ultra HD Smart TV",
    price: 34999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
    variant: "55-inch, Android TV",
    description: "Smart TV with 4K resolution and built-in streaming apps"
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 1999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    variant: "White, Bluetooth 5.0",
    description: "True wireless earbuds with charging case"
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    price: 2499,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    variant: "RGB, Mechanical",
    description: "Mechanical gaming keyboard with customizable RGB lighting"
  },
  {
    id: 7,
    name: "Wireless Mouse",
    price: 899,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop",
    variant: "Black, Ergonomic",
    description: "Ergonomic wireless mouse with long battery life"
  },
  {
    id: 8,
    name: "External SSD 1TB",
    price: 7999,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
    variant: "USB-C, 1TB",
    description: "Portable solid state drive with fast transfer speeds"
  },

  // Clothing
  {
    id: 9,
    name: "Men's Denim Jacket",
    price: 2499,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=500&fit=crop",
    variant: "Blue, L",
    description: "Classic denim jacket with button closure"
  },
  {
    id: 10,
    name: "Women's Cotton T-Shirt",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    variant: "White, M",
    description: "100% cotton comfortable t-shirt"
  },
  {
    id: 11,
    name: "Running Shoes",
    price: 3999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    variant: "Black/Red, Size 8",
    description: "Lightweight running shoes with cushioning"
  },
  {
    id: 12,
    name: "Casual Hoodie",
    price: 1499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    variant: "Gray, L",
    description: "Soft cotton blend hoodie with kangaroo pocket"
  },
  {
    id: 13,
    name: "Formal Shirt",
    price: 1299,
    image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500&h=500&fit=crop",
    variant: "Blue, M",
    description: "Premium cotton formal shirt for office wear"
  },
  {
    id: 14,
    name: "Slim Fit Jeans",
    price: 1799,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop",
    variant: "Dark Blue, 32",
    description: "Stretchable denim with slim fit"
  },

  // Accessories
  {
    id: 15,
    name: "Leather Wallet",
    price: 799,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    variant: "Brown, Genuine Leather",
    description: "Premium leather wallet with multiple card slots"
  },
  {
    id: 16,
    name: "Sunglasses",
    price: 1499,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    variant: "Black, UV Protected",
    description: "Polarized sunglasses with UV protection"
  },
  {
    id: 17,
    name: "Smartphone Case",
    price: 499,
    image: "https://images.unsplash.com/photo-1585336261022-680e9ce6f46a?w=500&h=500&fit=crop",
    variant: "Clear, Shockproof",
    description: "Durable phone case with drop protection"
  },
  {
    id: 18,
    name: "Laptop Stand",
    price: 1299,
    image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=500&h=500&fit=crop",
    variant: "Aluminum, Adjustable",
    description: "Ergonomic laptop stand for better posture"
  },
  {
    id: 19,
    name: "Power Bank 20000mAh",
    price: 1999,
    image: "https://images.unsplash.com/photo-1609592424307-1f3662f61c34?w=500&h=500&fit=crop",
    variant: "Black, Fast Charging",
    description: "High-capacity power bank with dual USB ports"
  },
  {
    id: 20,
    name: "USB-C Hub",
    price: 2499,
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500&h=500&fit=crop",
    variant: "7-in-1, 4K HDMI",
    description: "Multiport adapter with HDMI, USB, and SD card slots"
  },

  // Home & Living
  {
    id: 21,
    name: "Table Lamp",
    price: 1299,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    variant: "White, Dimmable",
    description: "Modern LED desk lamp with touch control"
  },
  {
    id: 22,
    name: "Coffee Maker",
    price: 4999,
    image: "https://images.unsplash.com/photo-1517668808822-9bba02a6b9a3?w=500&h=500&fit=crop",
    variant: "Black, 1.2L",
    description: "Automatic coffee maker with timer function"
  },
  {
    id: 23,
    name: "Throw Blanket",
    price: 899,
    image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=500&h=500&fit=crop",
    variant: "Gray, Fleece",
    description: "Soft and cozy fleece blanket"
  },
  {
    id: 24,
    name: "Wall Clock",
    price: 699,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=500&fit=crop",
    variant: "White, Silent",
    description: "Modern wall clock with silent movement"
  },
  {
    id: 25,
    name: "Indoor Plant",
    price: 399,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop",
    variant: "Snake Plant, Ceramic Pot",
    description: "Low-maintenance indoor plant with pot"
  },

  // Sports & Fitness
  {
    id: 26,
    name: "Yoga Mat",
    price: 999,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&h=500&fit=crop",
    variant: "Purple, 6mm",
    description: "Non-slip yoga mat with carrying strap"
  },
  {
    id: 27,
    name: "Dumbbell Set",
    price: 2499,
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=500&h=500&fit=crop",
    variant: "5kg Pair, Neoprene",
    description: "Neoprene dumbbell set for home workouts"
  },
  {
    id: 28,
    name: "Fitness Band",
    price: 1999,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
    variant: "Black, Heart Rate Monitor",
    description: "Activity tracker with sleep monitoring"
  },
  {
    id: 29,
    name: "Water Bottle",
    price: 399,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    variant: "Blue, 1L",
    description: "Insulated stainless steel water bottle"
  },
  {
    id: 30,
    name: "Resistance Bands",
    price: 599,
    image: "https://images.unsplash.com/photo-1599481238640-4c128875032a?w=500&h=500&fit=crop",
    variant: "Set of 5, Different Resistance",
    description: "Exercise bands for strength training"
  },

  // Books
  {
    id: 31,
    name: "The Psychology of Money",
    price: 299,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop",
    variant: "Paperback",
    description: "Timeless lessons on wealth and greed"
  },
  {
    id: 32,
    name: "Atomic Habits",
    price: 349,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop",
    variant: "Paperback",
    description: "Proven way to build good habits and break bad ones"
  },
  {
    id: 33,
    name: "Deep Work",
    price: 399,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop",
    variant: "Hardcover",
    description: "Rules for focused success in a distracted world"
  },

  // Beauty & Personal Care
  {
    id: 34,
    name: "Face Wash",
    price: 299,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
    variant: "Neem, 100ml",
    description: "Natural face wash for acne-prone skin"
  },
  {
    id: 35,
    name: "Hair Dryer",
    price: 1499,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500&h=500&fit=crop",
    variant: "Black, 1600W",
    description: "Professional hair dryer with multiple settings"
  },
  {
    id: 36,
    name: "Perfume",
    price: 899,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop",
    variant: "Blue, 50ml",
    description: "Long-lasting men's perfume"
  },

  // Kitchen & Dining
  {
    id: 37,
    name: "Non-Stick Pan",
    price: 799,
    image: "https://images.unsplash.com/photo-1584990347449-85b0759f0a5f?w=500&h=500&fit=crop",
    variant: "28cm, Black",
    description: "Durable non-stick frying pan"
  },
  {
    id: 38,
    name: "Knife Set",
    price: 1499,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=500&fit=crop",
    variant: "3-Piece, Stainless Steel",
    description: "Professional kitchen knife set"
  },
  {
    id: 39,
    name: "Dinner Set",
    price: 2499,
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b6bff2?w=500&h=500&fit=crop",
    variant: "16-Piece, White",
    description: "Complete dinner set for 4 people"
  },
  {
    id: 40,
    name: "Electric Kettle",
    price: 899,
    image: "https://images.unsplash.com/photo-1599282411606-08efc4eafffb?w=500&h=500&fit=crop",
    variant: "1.5L, Stainless Steel",
    description: "Fast boiling electric kettle with auto shut-off"
  }
];

export default function HomePage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">My Store</h1>
        <CartDialog />
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                {product.variant && (
                  <p className="text-sm text-gray-500 mt-1">{product.variant}</p>
                )}
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <AddToCartButton product={product}  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}