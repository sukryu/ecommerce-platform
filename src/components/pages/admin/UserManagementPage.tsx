import React, { useState, useEffect } from 'react';
import { AuthService, Role, UserEntity } from '../../../services/users/users.service';
import { useAlert } from '../../AlertsProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUser, FiMail, FiLock, FiChevronDown, FiSearch } from 'react-icons/fi';

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [editingUser, setEditingUser] = useState<UserEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'email' | 'id'>('email');
    const [searchResult, setSearchResult] = useState<UserEntity | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const { showAlert } = useAlert();
  
    useEffect(() => {
      fetchUsers();
      fetchRoles();
    }, []);
  
    const fetchUsers = async (cursor?: string) => {
      setIsLoading(true);
      try {
        const result = await AuthService.getUsers(cursor);
        setUsers(prev => cursor ? [...prev, ...result.users] : result.users);
        setNextCursor(result.nextCursor);
      } catch (error) {
        console.error('Error fetching users:', error);
        showAlert('Failed to fetch users', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRoles = async () => {
        try {
            const fetchedRoles = await AuthService.getRoles();
            setRoles(fetchedRoles);
        } catch (error) {
            console.error('Error fetching roles:', error);
            showAlert('Failed to fetch roles', 'error');
        }
    };
  
    const handleCreateUser = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const createdUser = await AuthService.createUser(newUser);
        showAlert('User created successfully', 'success');
        setNewUser({ username: '', email: '', password: '' });
        setUsers(prevUsers => [createdUser, ...prevUsers]);
      } catch (error) {
        console.error('Error creating user:', error);
        showAlert('Failed to create user', 'error');
      }
    };
  
    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        try {
            const updatedUser = await AuthService.updateUser(editingUser.id, editingUser);
            showAlert('User updated successfully', 'success');
            setEditingUser(null);
            setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
            if (searchResult && searchResult.id === updatedUser.id) {
                setSearchResult(updatedUser);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            showAlert('Failed to update user', 'error');
        }
    };
  
    const handleDeleteUser = async (userId: string) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        try {
          await AuthService.deleteUser(userId);
          showAlert('User deleted successfully', 'success');
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
          console.error('Error deleting user:', error);
          showAlert('Failed to delete user', 'error');
        }
      }
    };

    
  
    const loadMore = () => {
      if (nextCursor) {
        fetchUsers(nextCursor);
      }
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
          let user;
          if (searchType === 'email') {
            user = await AuthService.getUserByEmail(searchTerm);
          } else {
            user = await AuthService.getUserById(searchTerm);
          }
          if (user) {
            setSearchResult(user);
          } else {
            showAlert('User not found', 'error');
          }
        } catch (error) {
          console.error('Error searching user:', error);
          showAlert('Error searching user', 'error');
        } finally {
          setIsLoading(false);
        }
      };

  if (isLoading && users.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading users...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      {/* Create User Form */}
      <form onSubmit={handleCreateUser} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                <FiUser />
              </span>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="username"
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                <FiMail />
              </span>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                <FiLock />
              </span>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pl-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FiPlus className="inline-block mr-2" />
            Create User
          </motion.button>
        </div>
      </form>

      {/* Search User Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Search User</h2>
        <div className="flex items-center">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'email' | 'id')}
            className="mr-2 border rounded py-2 px-3"
          >
            <option value="email">Email</option>
            <option value="id">ID</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchType}`}
            className="flex-grow border rounded py-2 px-3 mr-2"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FiSearch className="inline-block mr-2" />
            Search
          </motion.button>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        {users.length === 0 ? (
          <div className="text-center py-4">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Updated At
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{user.id}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(user.created_At).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(user.updated_At).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingUser(user)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <FiEdit2 />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
        {nextCursor && (
          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FiChevronDown className="inline-block mr-2" />
              Load More
            </motion.button>
          </div>
        )}
      </div>

      {/* Search Result Modal */}
      {searchResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
           <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-8 rounded-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <div className="mb-4">
                    <p><strong>ID:</strong> {searchResult.id}</p>
                    <p><strong>Username:</strong> {searchResult.username}</p>
                    <p><strong>Email:</strong> {searchResult.email}</p>
                    <p><strong>Created At:</strong> {searchResult.created_At}</p>
                    <p><strong>Updated At:</strong> {searchResult.updated_At}</p>
                </div>
                <div className="flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingUser(searchResult)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    >Edit
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchResult(null)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </motion.button> 
                </div>
            </motion.div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="edit-username"
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;