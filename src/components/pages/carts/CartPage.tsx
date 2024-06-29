import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import CheckoutButton from '../checkout/CheckoutButton';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  // 이 부분은 실제로는 상태 관리 라이브러리나 컨텍스트에서 가져올 것입니다.
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { id: 1, name: 'Premium Headphones', price: 199.99, quantity: 1, image: '/images/headphones.jpg' },
    { id: 2, name: 'Smartwatch', price: 299.99, quantity: 2, image: '/images/smartwatch.jpg' },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-purple-500 to-pink-500">
          <h1 className="text-3xl font-bold text-white">Your Cart</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="py-4 flex items-center">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover mr-4" />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-purple-700">{item.name}</p>
                    <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-purple-600 hover:text-purple-800 px-2 py-1 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-purple-600 hover:text-purple-800 px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => updateQuantity(item.id, 0)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-2xl font-bold text-purple-700">${total.toFixed(2)}</span>
          </div>
          <div className="mt-5 flex justify-between">
            <Link 
              to="/products" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
            >
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
            <CheckoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;