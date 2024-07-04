import { useState, useCallback } from 'react';
import { ServiceFactory } from '../api/common/utils/service-factory';
import { ApiError, NetworkError } from '../api/common/errors/custom-error-classes';
import { Role } from '../api/types/role.type';
import { CreateRoleDto } from '../api/dto/role/create-role.dto';
import { UpdateRoleDto } from '../api/dto/role/update-role.dto';

export const useRole = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roleService = ServiceFactory.getRoleService();

  const getRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRoles = await roleService.getRoles();
      setRoles(fetchedRoles);
      return fetchedRoles;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRoleById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await roleService.getRoleById(id);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRoleUsers = useCallback(async (roleId: number) => {
    setLoading(true);
    setError(null);
    try {
      return await roleService.getRoleUsers(roleId);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRole = useCallback(async (createRoleDto: CreateRoleDto) => {
    setLoading(true);
    setError(null);
    try {
      const newRole = await roleService.createRole(createRoleDto);
      setRoles(prev => [...prev, newRole]);
      return newRole;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRole = useCallback(async (id: number, updateRoleDto: UpdateRoleDto) => {
    setLoading(true);
    setError(null);
    try {
      const updatedRole = await roleService.updateRole(id, updateRoleDto);
      setRoles(prev => prev.map(role => role.id === id ? updatedRole : role));
      return updatedRole;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRole = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await roleService.deleteRole(id);
      setRoles(prev => prev.filter(role => role.id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      setError(`API Error: ${error.message}`);
    } else if (error instanceof NetworkError) {
      setError(`Network Error: ${error.message}`);
    } else {
      setError('An unexpected error occurred');
    }
  };

  return { 
    roles, 
    error, 
    loading, 
    getRoles, 
    getRoleById, 
    getRoleUsers, 
    createRole, 
    updateRole, 
    deleteRole 
  };
};