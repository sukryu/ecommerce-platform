import React, { useEffect, useState } from 'react';
import { FiUser, FiShoppingBag, FiHeart, FiEdit2 } from 'react-icons/fi';
import { AuthService } from '../../../services/users/users.service';

interface UserData {
  id: string;
  email: string;
  username: string;
}

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <h3 className="text-2xl font-semibold text-gray-800">Profile Information</h3>
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-medium text-gray-800">{user.username}</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">
                  <FiEdit2 size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-medium text-gray-800">{user.email}</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">
                  <FiEdit2 size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-lg font-medium text-gray-800">test</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">
                  <FiEdit2 size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Order History</h3>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-600">You have no recent orders.</p>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Wishlist</h3>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-600">Your wishlist is empty.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">My Account</h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'profile', icon: FiUser, label: 'Profile' },
              { id: 'orders', icon: FiShoppingBag, label: 'Orders' },
              { id: 'wishlist', icon: FiHeart, label: 'Wishlist' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } transition duration-300`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2" size={20} />
                {tab.label}
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