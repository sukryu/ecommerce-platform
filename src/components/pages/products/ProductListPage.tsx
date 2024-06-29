// src/pages/ProductListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductListPage: React.FC = () => {
  // This would typically come from an API or state management
  const products: Product[] = [
    { id: 1, name: 'Premium Headphones', price: 199.99, image: '/api/placeholder/300/300' },
    { id: 2, name: 'Smartwatch', price: 299.99, image: '/api/placeholder/300/300' },
    { id: 3, name: 'Wireless Keyboard', price: 79.99, image: '/api/placeholder/300/300' },
    { id: 4, name: 'Bluetooth Speaker', price: 129.99, image: '/api/placeholder/300/300' },
    // Add more products as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <Link 
                to={`/product/${product.id}`} 
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;