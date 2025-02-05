'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= products.length ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="space-x-2">
          <button onClick={prev} className="p-2 rounded-full bg-gray-100">
            ←
          </button>
          <button onClick={next} className="p-2 rounded-full bg-gray-100">
            →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .slice(currentIndex, currentIndex + 3)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
} 