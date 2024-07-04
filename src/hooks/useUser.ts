import { useState, useCallback } from 'react';
import { ServiceFactory } from '../api/common/utils/service-factory';
import { ApiError, NetworkError } from '../api/common/errors/custom-error-classes';
import { UserEntity } from '../api/types/user.type';
import { PaginatedUsers } from '../api/types/paginated-users.type';
import { CursorPaginationDto } from '../api/dto/user/cursor-pagination.dto';
import { CreateUserDto } from '../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../api/dto/user/update-user.dto';

export const useUser = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userService = ServiceFactory.getUserService();

  const getUsers = useCallback(async (cursorPaginationDto: CursorPaginationDto): Promise<PaginatedUsers> => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.getUsersWithCursorPaginations(cursorPaginationDto);
      setUsers(prev => cursorPaginationDto.cursor ? [...prev, ...result.users] : result.users);
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (userId: string): Promise<UserEntity> => {
    setLoading(true);
    setError(null);
    try {
      return await userService.getUserById(userId);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserByEmail = useCallback(async (email: string): Promise<UserEntity> => {
    setLoading(true);
    setError(null);
    try {
      return await userService.getUserByEmail(email);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (createUserDto: CreateUserDto): Promise<UserEntity> => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userService.createUser(createUserDto);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId: string, updateUserDto: UpdateUserDto): Promise<UserEntity> => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateUser(userId, updateUserDto);
      setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user));
      return updatedUser;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (userId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      handleError(error);
      throw error;
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
    users, 
    error, 
    loading, 
    getUsers, 
    getUserById, 
    getUserByEmail, 
    createUser, 
    updateUser, 
    deleteUser 
  };
};