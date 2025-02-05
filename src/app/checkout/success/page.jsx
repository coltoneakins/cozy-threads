'use client';

import Link from 'next/link';

export default function Success() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. You will receive an email confirmation shortly.
      </p>
      <Link
        href="/catalog"
        className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
} 