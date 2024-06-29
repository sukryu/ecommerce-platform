import React, { useState } from 'react';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}

const ProductDetailPage: React.FC = () => {
  // 이 부분은 실제로는 API 호출이나 상태 관리 라이브러리에서 가져올 것입니다.
  const product: Product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life, these headphones are perfect for music lovers and professionals alike.',
    image: '/images/headphones.jpg',
    rating: 4.5,
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-96 w-full object-cover md:w-96" src={product.image} alt={product.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
              {product.rating} <FiStar className="inline" /> Rating
            </div>
            <h1 className="mt-2 text-3xl font-bold text-purple-900">{product.name}</h1>
            <p className="mt-2 text-2xl text-green-600">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-gray-600">{product.description}</p>
            
            <div className="mt-8 flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-purple-600 hover:text-purple-800 px-3 py-1 rounded-md border border-purple-300"
              >
                -
              </button>
              <span className="mx-4 text-gray-700">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-purple-600 hover:text-purple-800 px-3 py-1 rounded-md border border-purple-300"
              >
                +
              </button>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center">
                <FiShoppingCart className="mr-2" /> Add to Cart
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full inline-flex items-center justify-center">
                <FiHeart className="mr-2" /> Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;