'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="font-playfair text-3xl font-bold text-[#1a1a1a]">
            {product.title}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-2xl text-[#1a1a1a]">${product.price}</p>
            <div className="flex items-center text-[#666666]">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </div>
          </div>
          <p className="text-[#666666]">{product.description}</p>
          <p className="text-[#666666]">Category: {product.category}</p>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#1a1a1a] text-white py-3 rounded-md hover:bg-[#333333] 
              transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}