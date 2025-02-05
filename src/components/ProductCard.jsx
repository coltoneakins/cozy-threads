'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden border border-[#e5e5e5] transition-shadow hover:shadow-md"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-lg font-medium text-[#1a1a1a] mb-2 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-[#666666]">${product.price}</p>
          <div className="flex items-center text-sm text-[#666666]">
            ★ {product.rating.rate} 
          </div>
        </div>
      </div>
    </Link>
  );
} 