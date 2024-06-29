import React from 'react';
import { useParams } from 'react-router-dom';
import { useAlert } from '../../AlertsProvider';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showAlert } = useAlert();

  // This would typically come from an API or state management
  const product = {
    id: id ? Number(id) : 0,
    name: 'Premium Headphones',
    price: 199.99,
    description: 'High-quality headphones with noise cancellation feature.',
    image: '/api/placeholder/500/500'
  };

  const handleAddToCart = () => {
    // Add to cart logic would go here
    showAlert('Product added to cart', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-2xl text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;