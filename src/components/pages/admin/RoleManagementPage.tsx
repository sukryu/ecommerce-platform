import React, { useState, useEffect } from 'react';
import { AuthService } from '../../../services/users/users.service';
import { useAlert } from '../../AlertsProvider';

export interface Role {
  id: number;
  name: string;
}

const RoleManagementPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRoleName, setNewRoleName] = useState('');
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const fetchedRoles = await AuthService.getRoles();
      setRoles(fetchedRoles);
    } catch (error) {
      showAlert('Failed to fetch roles', 'error');
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.createRole(newRoleName);
      showAlert('Role created successfully', 'success');
      setNewRoleName('');
      fetchRoles();
    } catch (error) {
      showAlert('Failed to create role', 'error');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await AuthService.deleteRole(roleId);
        showAlert('Role deleted successfully', 'success');
        fetchRoles();
      } catch (error) {
        showAlert('Failed to delete role', 'error');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      
      <form onSubmit={handleCreateRole} className="mb-4">
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="New role name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Role
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Name</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagementPage;