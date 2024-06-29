import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiSliders, FiStar, FiShoppingCart } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const ProductListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 이 부분은 실제로는 API 호출이나 상태 관리 라이브러리에서 가져올 것입니다.
  const products: Product[] = [
    { id: 1, name: 'Premium Headphones', price: 199.99, image: '/images/headphones.jpg', rating: 4.5, category: 'Audio' },
    { id: 2, name: 'Smartwatch', price: 299.99, image: '/images/smartwatch.jpg', rating: 4.2, category: 'Wearables' },
    { id: 3, name: 'Wireless Keyboard', price: 79.99, image: '/images/keyboard.jpg', rating: 4.0, category: 'Accessories' },
    { id: 4, name: 'Bluetooth Speaker', price: 129.99, image: '/images/speaker.jpg', rating: 4.3, category: 'Audio' },
    // 더 많은 제품을 추가할 수 있습니다.
  ];

  const categories = ['All', 'Audio', 'Wearables', 'Accessories'];

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Our Products</h1>
        
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-purple-500 hover:bg-purple-100'
                } transition-colors duration-200`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-purple-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                  <span className="text-yellow-500 flex items-center">
                    <FiStar className="mr-1" /> {product.rating}
                  </span>
                </div>
                <div className="flex justify-between">
                  <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-200">
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;