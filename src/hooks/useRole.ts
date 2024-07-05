import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getRoles, getRoleById, getRoleUsers, createRole, updateRole, deleteRole } from '../store/slices/roleSlice';
import { CreateRoleDto } from '../api/dto/role/create-role.dto';
import { UpdateRoleDto } from '../api/dto/role/update-role.dto';
import { UserEntity } from '../api/types/user.type';
import { Role } from '../api/types/role.type';

export const useRole = () => {
  const dispatch = useAppDispatch();
  const { roles, selectedRole, roleUsers, isLoading, error } = useAppSelector((state) => state.role);

  const fetchRoles = useCallback(async () => {
    const resultAction = await dispatch(getRoles());
    if (getRoles.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to fetch roles');
    }
  }, [dispatch]);

  const fetchRoleById = useCallback(async (id: number) => {
    const resultAction = await dispatch(getRoleById(id));
    if (getRoleById.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to fetch role');
    }
  }, [dispatch]);

  const fetchRoleUsers = useCallback(async (roleId: number) => {
    const resultAction = await dispatch(getRoleUsers(roleId));
    if (getRoleUsers.fulfilled.match(resultAction)) {
      return resultAction.payload.users;
    } else {
      throw new Error('Failed to fetch role users');
    }
  }, [dispatch]);

  const createNewRole = useCallback(async (createRoleDto: CreateRoleDto) => {
    const resultAction = await dispatch(createRole(createRoleDto));
    if (createRole.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to create role');
    }
  }, [dispatch]);

  const updateExistingRole = useCallback(async (id: number, updateRoleDto: UpdateRoleDto) => {
    const resultAction = await dispatch(updateRole({ id, updateRoleDto }));
    if (updateRole.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to update role');
    }
  }, [dispatch]);

  const deleteExistingRole = useCallback(async (id: number) => {
    const resultAction = await dispatch(deleteRole(id));
    if (deleteRole.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to delete role');
    }
  }, [dispatch]);

  return { 
    roles, 
    selectedRole,
    roleUsers,
    error, 
    loading: isLoading, 
    getRoles: fetchRoles, 
    getRoleById: fetchRoleById, 
    getRoleUsers: fetchRoleUsers, 
    createRole: createNewRole, 
    updateRole: updateExistingRole, 
    deleteRole: deleteExistingRole 
  };
};