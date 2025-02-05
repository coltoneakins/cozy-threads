'use client';

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cart: []
};

// Cart calculations
const calculateCartTotals = (cart) => {
  return cart.reduce((totals, item) => ({
    cartTotal: totals.cartTotal + (item.price * item.quantity),
    cartCount: totals.cartCount + item.quantity
  }), { cartTotal: 0, cartCount: 0 });
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.cart.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        const updatedCart = state.cart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { cart: updatedCart };
      }

      return {
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_ITEM': {
      return {
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state;
      
      return {
        cart: state.cart.map(item =>
          item.id === id
            ? { ...item, quantity }
            : item
        )
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate totals from cart array
  const { cartTotal, cartCount } = calculateCartTotals(state.cart);

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: product,
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: productId },
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart: state.cart,
        cartTotal,
        cartCount,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 