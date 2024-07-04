import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../AlertsProvider';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      showAlert('Successfully logged out', 'success');
      navigate('/');
    } catch (error) {
      showAlert('Failed to logout. Please try again.', 'error');
    }
  };

  const isAdmin = user?.roles.includes('SUPERADMIN') || user?.roles.includes('ADMIN');

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Shop</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/products" className="hover:text-secondary-light transition duration-300">Products</Link></li>
            <li><Link to="/cart" className="hover:text-secondary-light transition duration-300">Cart</Link></li>
            {user ? (
              <>
                <li><Link to="/account" className="hover:text-secondary-light transition duration-300">My Account</Link></li>
                {isAdmin && (
                  <li>
                    <Link to="/admin" className="hover:text-secondary-light transition duration-300">Admin</Link>
                  </li>
                )}
                <li>
                  <button 
                    onClick={handleLogout}
                    className="bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded transition duration-300"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;