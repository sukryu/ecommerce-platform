import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-gray-600">Your trusted online shop for quality products.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <p className="text-gray-600">Contact: support@eshop.com</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-600 hover:text-indigo-800">Facebook</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800">Twitter</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          &copy; 2024 E-Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;