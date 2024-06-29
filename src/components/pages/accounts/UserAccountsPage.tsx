import React, { useEffect, useState } from 'react';
import { FiUser, FiShoppingBag, FiHeart, FiEdit2, FiMoon, FiSun } from 'react-icons/fi';
import { AuthService } from '../../../services/users/users.service';

interface UserData {
  id: string;
  username: string;
  email: string;
}

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await AuthService.getUser();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderTabContent = () => {
    if (loading) {
      return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
      return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    if (!user) {
      return <div className="text-center py-4">No user data available</div>;
    }

    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Profile Information</h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 space-y-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Username</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.username}</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                  <FiEdit2 size={24} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email Address</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.email}</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                  <FiEdit2 size={24} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Order History</h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg transition-all duration-300 ease-in-out`}>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>You have no recent orders.</p>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                Start Shopping
              </button>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">Wishlist</h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg transition-all duration-300 ease-in-out`}>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your wishlist is empty.</p>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-600 text-white rounded-full hover:from-yellow-600 hover:to-red-700 transition-all duration-300">
                Explore Products
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text`}>My Account</h2>
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {darkMode ? <FiSun size={24} className="text-yellow-400" /> : <FiMoon size={24} className="text-gray-700" />}
          </button>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out`}>
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'profile', icon: FiUser, label: 'Profile' },
              { id: 'orders', icon: FiShoppingBag, label: 'Orders' },
              { id: 'wishlist', icon: FiHeart, label: 'Wishlist' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 py-6 px-6 text-center font-medium flex items-center justify-center transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2" size={24} />
                <span className="text-lg">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;