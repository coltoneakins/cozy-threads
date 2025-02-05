'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-[#e5e5e5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-playfair text-2xl font-bold text-[#1a1a1a]">
              Cozy Threads
            </Link>
            <div className="ml-10 space-x-8">
              <Link href="/catalog" className="text-[#666666] hover:text-[#1a1a1a] transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-[#666666] hover:text-[#1a1a1a] transition-colors">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/cart" className="p-2 relative text-[#666666] hover:text-[#1a1a1a] transition-colors">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 