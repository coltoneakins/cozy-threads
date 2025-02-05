'use client';

import { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise, createPaymentIntent } from '@/lib/stripe';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// Checkout Form Component
function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        setIsProcessing(false);
        return;
      }

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (paymentError) {
        setError(paymentError.message);
      } else {
        clearCart();
        router.push('/checkout/success');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

// Main Checkout Page Component
export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  const { cart, cartTotal } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
      return;
    }

    const initializePayment = async () => {
      try {
        const { clientSecret: secret } = await createPaymentIntent(cartTotal);
        setClientSecret(secret);
      } catch (error) {
        console.error('Payment initialization error:', error);
      }
    };

    initializePayment();
  }, [cart.length, cartTotal, router]);

  if (!clientSecret) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between mb-2">
            <span>
              {item.name} (Size: {item.selectedSize}) x{item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Elements 
        stripe={stripePromise} 
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
          },
        }}
      >
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
} 