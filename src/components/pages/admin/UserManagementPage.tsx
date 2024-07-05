import React, { useState, useEffect } from 'react';
import { useUser } from '../../../hooks/useUser';
import { useRole } from '../../../hooks/useRole';
import { useAlert } from '../../AlertsProvider';
import { UserEntity } from '../../../api/types/user.type';
import { CreateUserDto } from '../../../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../../../api/dto/user/update-user.dto';

const UserManagementPage: React.FC = () => {
    const [newUser, setNewUser] = useState<CreateUserDto>({ username: '', email: '', password: '', phoneNumber: '' });
    const [editingUser, setEditingUser] = useState<UserEntity | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'email' | 'id'>('email');
    const [searchResult, setSearchResult] = useState<UserEntity | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [localUsers, setLocalUsers] = useState<UserEntity[]>([]);

    const { users, error: userError, loading: userLoading, getUsers, createUser, updateUser, deleteUser, getUserById, getUserByEmail } = useUser();
    const { roles, error: roleError, loading: roleLoading, getRoles } = useRole();
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers({ limit: 10 });
            setLocalUsers(result.users);
            setNextCursor(result.nextCursor);
        };
        fetchUsers();
        getRoles();
    }, [getUsers, getRoles]);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdUser = await createUser(newUser);
            setLocalUsers(prevUsers => [createdUser, ...prevUsers]);
            showAlert('User created successfully', 'success');
            setNewUser({ username: '', email: '', password: '', phoneNumber: '' });
        } catch (error) {
            showAlert('Failed to create user', 'error');
        }
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        try {
            const updateUserDto: UpdateUserDto = {
                email: editingUser.email,
                username: editingUser.username,
                phoneNumber: editingUser.phoneNumber,
                roles: editingUser.roles
            };
            const updatedUser = await updateUser(editingUser.id, updateUserDto);
            setLocalUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
            showAlert('User updated successfully', 'success');
            setEditingUser(null);
        } catch (error) {
            showAlert('Failed to update user', 'error');
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId);
                setLocalUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                showAlert('User deleted successfully', 'success');
            } catch (error) {
                showAlert('Failed to delete user', 'error');
            }
        }
    };

    const handleSearch = async () => {
        try {
            let user;
            if (searchType === 'email') {
                user = await getUserByEmail(searchTerm);
            } else {
                user = await getUserById(searchTerm);
            }
            if (user) {
                setSearchResult(user);
            } else {
                showAlert('User not found', 'error');
            }
        } catch (error) {
            showAlert('Error searching user', 'error');
        }
    };

    const loadMore = async () => {
        if (nextCursor) {
            const result = await getUsers({ cursor: nextCursor, limit: 10 });
            setLocalUsers(prevUsers => [...prevUsers, ...result.users]);
            setNextCursor(result.nextCursor);
        }
    };

    if (userLoading && users.length === 0) {
        return <div className="flex justify-center items-center h-screen">Loading users...</div>;
    }

    return (
      <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">User Management</h1>
          
          {/* Create User Form */}
          <form onSubmit={handleCreateUser} className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Create New User</h2>
              <div className="flex flex-wrap -mx-3 mb-6">
                  {(['username', 'email', 'password', 'phoneNumber'] as const).map((field) => (
                      <div key={field} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field}>
                              {field}
                          </label>
                          <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              id={field}
                              type={field === 'password' ? 'password' : 'text'}
                              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                              value={newUser[field]}
                              onChange={(e) => setNewUser({...newUser, [field]: e.target.value})}
                          />
                      </div>
                  ))}
              </div>
              <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Create User
                  </button>
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
                  <button
                      onClick={handleSearch}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                      Search
                  </button>
              </div>
          </div>

          {/* User List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">User List</h2>
              {localUsers.length === 0 ? (
                  <div className="text-center py-4">No users found.</div>
              ) : (
                  <div className="overflow-x-auto">
                      <table className="min-w-full leading-normal">
                          <thead>
                              <tr>
                                  {['ID', 'Username', 'Email', 'Phone Number', 'Created At', 'Updated At', 'Actions'].map((header) => (
                                      <th key={header} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                          {header}
                                      </th>
                                  ))}
                              </tr>
                          </thead>
                          <tbody>
                              {localUsers.map((user) => (
                                  <tr key={user.id}>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.id}</td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.username}</td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.phoneNumber}</td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(user.created_At).toLocaleString()}</td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(user.updated_At).toLocaleString()}</td>
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <button onClick={() => setEditingUser(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                          <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              )}
              {nextCursor && (
                  <div className="mt-4 text-center">
                      <button
                          onClick={loadMore}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                          Load More
                      </button>
                  </div>
              )}
          </div>

          {/* Search Result Modal */}
          {searchResult && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg w-full max-w-md">
                      <h2 className="text-2xl font-bold mb-4">User Details</h2>
                      <div className="mb-4">
                          {Object.entries(searchResult).map(([key, value]) => (
                              <p key={key}><strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
                          ))}
                      </div>
                      <div className="flex justify-end">
                          <button
                              onClick={() => setEditingUser(searchResult)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                          >
                              Edit
                          </button>
                          <button
                              onClick={() => setSearchResult(null)}
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                              Close
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {/* Edit User Modal */}
          {editingUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg w-full max-w-md">
                      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                      <form onSubmit={handleUpdateUser}>
                          {(['username', 'email', 'phoneNumber'] as const).map((field) => (
                              <div key={field} className="mb-4">
                                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`edit-${field}`}>
                                      {field.charAt(0).toUpperCase() + field.slice(1)}
                                  </label>
                                  <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id={`edit-${field}`}
                                      type={field === 'email' ? 'email' : 'text'}
                                      value={editingUser[field as keyof UserEntity] as string}
                                      onChange={(e) => setEditingUser({...editingUser, [field]: e.target.value})}
                                  />
                              </div>
                          ))}
                          <div className="flex justify-end">
                              <button
                                  type="submit"
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                              >
                                  Save Changes
                              </button>
                              <button
                                  onClick={() => setEditingUser(null)}
                                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                  Cancel
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
      </div>
  );
};

export default UserManagementPage;