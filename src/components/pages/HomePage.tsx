// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './banner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const HomePage: React.FC = () => {
  // This would typically come from an API or state management
  const featuredProducts: Product[] = [
    { id: 1, name: 'Premium Headphones', price: 199.99, image: '/api/placeholder/300/300' },
    { id: 2, name: 'Smartwatch', price: 299.99, image: '/api/placeholder/300/300' },
    { id: 3, name: 'Wireless Keyboard', price: 79.99, image: '/api/placeholder/300/300' },
    { id: 4, name: 'Bluetooth Speaker', price: 129.99, image: '/api/placeholder/300/300' },
  ];

  return (
    <div>
      <Banner 
        title="Welcome to Our Store" 
        subtitle="Discover amazing products at great prices!" 
        backgroundImage="/api/placeholder/1200/400"
      />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <Link 
                  to={`/product/${product.id}`}
                  className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-block bg-secondary hover:bg-secondary-dark text-white py-3 px-6 rounded-md transition duration-300 text-lg font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;