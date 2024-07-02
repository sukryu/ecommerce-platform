import React, { useState, useEffect } from 'react';
import { AuthService, Role, UserEntity } from '../../../services/users/users.service';
import { useAlert } from '../../AlertsProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiX } from 'react-icons/fi';

const RoleManagementPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[] | null>(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoleUsers, setSelectedRoleUsers] = useState<{ role: Role; users: UserEntity[] } | null>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const fetchedRoles = await AuthService.getRoles();
      setRoles(fetchedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      showAlert('Failed to fetch roles', 'error');
      setRoles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRole = await AuthService.createRole(newRoleName);
      showAlert('Role created successfully', 'success');
      setNewRoleName('');
      setRoles(prevRoles => prevRoles ? [...prevRoles, newRole] : [newRole]);
    } catch (error) {
      console.error('Error creating role:', error);
      showAlert('Failed to create role', 'error');
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRole) return;
    try {
      const updatedRole = await AuthService.updateRole(editingRole.id, editingRole.name);
      showAlert('Role updated successfully', 'success');
      setEditingRole(null);
      setRoles(prevRoles => prevRoles ? prevRoles.map(role => role.id === updatedRole.id ? updatedRole : role) : null);
    } catch (error) {
      console.error('Error updating role:', error);
      showAlert('Failed to update role', 'error');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await AuthService.deleteRole(roleId);
        showAlert('Role deleted successfully', 'success');
        setRoles(prevRoles => prevRoles ? prevRoles.filter(role => role.id !== roleId) : null);
      } catch (error) {
        console.error('Error deleting role:', error);
        showAlert('Failed to delete role', 'error');
      }
    }
  };

  const handleViewUsers = async (role: Role) => {
    try {
      const users = await AuthService.getRoleUsers(role.id);
      setSelectedRoleUsers({ role, users });
    } catch (error) {
      console.error('Error fetching role users:', error);
      showAlert('Failed to fetch users for this role', 'error');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading roles...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Role Management</h1>
      
      <form onSubmit={handleCreateRole} className="mb-8">
        <div className="flex items-center">
          <input
            type="text"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            placeholder="New role name"
            className="border p-2 mr-2 flex-grow"
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FiPlus className="mr-2" /> Create Role
          </motion.button>
        </div>
      </form>

      {roles === null ? (
        <p>Error loading roles.</p>
      ) : roles.length === 0 ? (
        <p>No roles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {roles.map((role) => (
              <motion.div
                key={role.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{role.name}</h2>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingRole(role)}
                      className="text-yellow-500"
                    >
                      <FiEdit2 />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-500"
                    >
                      <FiTrash2 />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleViewUsers(role)}
                      className="text-blue-500"
                    >
                      <FiUsers />
                    </motion.button>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Created: {new Date(role.created_At).toLocaleString()}</p>
                <p className="text-sm text-gray-500">Updated: {new Date(role.updated_At).toLocaleString()}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {editingRole && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
            <form onSubmit={handleUpdateRole}>
              <input
                type="text"
                value={editingRole.name}
                onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                className="border p-2 mb-2 w-full"
              />
              <div className="flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingRole(null)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {selectedRoleUsers && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Users with role: {selectedRoleUsers.role.name}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedRoleUsers(null)}
                className="text-gray-500"
              >
                <FiX size={24} />
              </motion.button>
            </div>
            {selectedRoleUsers.users.length === 0 ? (
              <p>No users found with this role.</p>
            ) : (
              <ul className="space-y-2">
                {selectedRoleUsers.users.map(user => (
                  <li key={user.id} className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RoleManagementPage;