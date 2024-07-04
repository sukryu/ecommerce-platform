import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiEdit2, FiMoon, FiSun, FiTrash2, FiSave } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useAlert } from '../../AlertsProvider';
import { UpdateUserDto } from '../../../api/dto/user/update-user.dto';
import { UserEntity } from '../../../api/types/user.type';

type TabId = 'profile' | 'orders' | 'wishlist';

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UpdateUserDto | null>(null);

  const { user, error, loading, updateProfile, deleteAccount } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  const handleEdit = useCallback(() => {
    if (user) {
      setEditedUser({ email: user.email, username: user.username });
      setEditMode(true);
    }
  }, [user]);

  const handleSave = useCallback(async () => {
    if (!editedUser) return;
    try {
      await updateProfile(editedUser);
      showAlert('Profile updated successfully!', 'success');
      setEditMode(false);
    } catch (error) {
      showAlert('Failed to update profile. Please try again later.', 'error');
    }
  }, [editedUser, updateProfile, showAlert]);

  const handleCancel = useCallback(() => {
    setEditedUser(null);
    setEditMode(false);
  }, []);

  const handleDelete = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        showAlert('Account deleted successfully.', 'success');
        navigate('/');
      } catch (error) {
        showAlert('Failed to delete account. Please try again later.', 'error');
      }
    }
  }, [deleteAccount, showAlert, navigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => prev ? { ...prev, [name]: value } : null);
  }, []);

  const tabs = useMemo(() => [
    { id: 'profile' as const, icon: FiUser, label: 'Profile' },
    { id: 'orders' as const, icon: FiShoppingBag, label: 'Orders' },
    { id: 'wishlist' as const, icon: FiHeart, label: 'Wishlist' },
  ], []);

  const renderProfileContent = useCallback(() => {
    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
    if (!user) return <div className="text-center py-4">No user data available</div>;

    return (
      <div className="space-y-6">
        <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Profile Information</h3>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 space-y-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105`}>
          {['username', 'email'].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                {editMode ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={(editedUser?.[field as keyof UpdateUserDto] as string) || ''}
                    onChange={handleChange}
                    className={`text-2xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} rounded p-2`}
                  />
                ) : (
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user[field as keyof Pick<UserEntity, 'username' | 'email'>]}
                  </p>
                )}
              </div>
              {!editMode && (
                <button onClick={handleEdit} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                  <FiEdit2 size={24} />
                </button>
              )}
            </div>
          ))}
          {editMode && (
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300 flex items-center">
                <FiSave className="mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
        <div className="mt-8">
          <button onClick={handleDelete} className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 flex items-center">
            <FiTrash2 className="mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    );
  }, [user, loading, error, darkMode, editMode, editedUser, handleChange, handleEdit, handleCancel, handleSave, handleDelete]);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
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
    }
  }, [activeTab, darkMode, renderProfileContent]);

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
            {tabs.map((tab) => (
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