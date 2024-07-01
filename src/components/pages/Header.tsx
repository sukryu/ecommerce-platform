import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../AlertsProvider';
import { AuthService } from '../../services/users/users.service';

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isSuperAdmin: boolean;
  userRoles: string[];
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn, isSuperAdmin, userRoles }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setIsLoggedIn(false);
      showAlert('Successfully logged out', 'success');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      showAlert('Failed to logout. Please try again.', 'error');
    }
  };

  const isAdmin = isSuperAdmin || userRoles.includes('ADMIN');
  console.log('Is admin:', isAdmin);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Shop</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/products" className="hover:text-secondary-light transition duration-300">Products</Link></li>
            <li><Link to="/cart" className="hover:text-secondary-light transition duration-300">Cart</Link></li>
            {isLoggedIn && (
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
            )}
            {!isLoggedIn && (
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