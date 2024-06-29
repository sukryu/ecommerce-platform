import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard } from 'react-icons/fi';

const CheckoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <button 
      onClick={handleCheckout}
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300"
    >
      Checkout <FiCreditCard className="ml-2" />
    </button>
  );
};

export default CheckoutButton;