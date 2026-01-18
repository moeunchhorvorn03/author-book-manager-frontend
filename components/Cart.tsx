
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onContinueShopping: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onContinueShopping }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = items.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mb-6">
          <svg className="w-24 h-24 text-gray-200 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your basket is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any stories to your collection yet. Explore our shop to find your next adventure.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors"
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-10">Your Shopping Bag</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          {items.map((item) => (
            <div key={item.book.id} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
              <div className="w-24 h-36 shrink-0 rounded-lg overflow-hidden shadow-md">
                <img src={item.book.coverImage} alt={item.book.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.book.title}</h3>
                    <p className="text-gray-500 text-sm">by {item.book.author}</p>
                    <p className="text-amber-600 text-xs mt-1 font-semibold">{item.book.category}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${(item.book.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => onUpdateQuantity(item.book.id, -1)}
                      className="px-3 py-1 hover:bg-gray-50 text-gray-500"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-sm font-bold text-gray-900 border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(item.book.id, 1)}
                      className="px-3 py-1 hover:bg-gray-50 text-gray-500"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemove(item.book.id)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-96">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-200 mb-4">
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-gray-400">Secure checkout powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
