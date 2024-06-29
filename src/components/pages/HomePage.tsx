import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProducts = [
    { id: 1, name: 'Premium Headphones', price: 199.99, image: '/images/headphones.jpg' },
    { id: 2, name: 'Smartwatch', price: 299.99, image: '/images/smartwatch.jpg' },
    { id: 3, name: 'Wireless Keyboard', price: 79.99, image: '/images/keyboard.jpg' },
    { id: 4, name: 'Bluetooth Speaker', price: 129.99, image: '/images/speaker.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold text-purple-600">E-Shop</h1>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-purple-600 hover:text-purple-800">
            <FiShoppingCart size={24} />
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-purple-600 hover:text-purple-800">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
        className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg z-50 p-6"
      >
        <ul className="space-y-4">
          <li><Link to="/" className="text-purple-600 hover:text-purple-800">Home</Link></li>
          <li><Link to="/products" className="text-purple-600 hover:text-purple-800">Products</Link></li>
          <li><Link to="/about" className="text-purple-600 hover:text-purple-800">About</Link></li>
          <li><Link to="/contact" className="text-purple-600 hover:text-purple-800">Contact</Link></li>
        </ul>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 transform -skew-y-6 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-4 text-white">Discover Your Vibrant Style</h2>
          <p className="text-xl mb-8 text-white">Explore our colorful collection of premium products</p>
          <Link
            to="/products"
            className="inline-block py-3 px-8 bg-yellow-400 text-purple-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition duration-300"
          >
            Shop Now <FiArrowRight className="inline ml-2" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h3 className="text-3xl font-bold mb-8 text-center text-purple-800">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-lg overflow-hidden shadow-lg ${
                index % 2 === 0 ? 'transform -rotate-1' : 'transform rotate-1'
              }`}
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2 text-purple-700">{product.name}</h4>
                <p className="text-lg font-bold mb-4 text-green-600">${product.price.toFixed(2)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full text-center py-2 px-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-3xl font-bold mb-4 text-white">Stay Colorful, Stay Updated</h3>
            <p className="text-yellow-200 mb-4">Subscribe to our newsletter for vibrant deals and updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-r-full hover:bg-yellow-300 transition duration-300 font-semibold">
                Subscribe
              </button>
            </form>
          </div>
          <div className="md:w-1/3">
            <div className="bg-yellow-300 h-64 w-64 rounded-full transform rotate-45 shadow-lg"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;