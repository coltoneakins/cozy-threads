'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link 
          href="/catalog"
          className="text-blue-500 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {cart.map((item) => (
          <div 
            key={`${item.id}`}
            className="flex gap-4 border-b pb-4"
          >
            <div className="w-24 h-24 relative">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="border rounded-md p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-xl font-bold">
          Total: ${cartTotal.toFixed(2)}
        </div>
        <button
          onClick={() => clearCart()}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>
        <Link
          href="/checkout"
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
} 