import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser } from '../store/slices/userSlice';
import { CursorPaginationDto } from '../api/dto/user/cursor-pagination.dto';
import { CreateUserDto } from '../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../api/dto/user/update-user.dto';
import { UserEntity } from '../api/types/user.type';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser, paginationInfo, isLoading, error } = useAppSelector((state) => state.user);

  const fetchUsers = useCallback(async (cursorPaginationDto: CursorPaginationDto) => {
    const resultAction = await dispatch(getUsers(cursorPaginationDto));
    if (getUsers.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to fetch users');
    }
  }, [dispatch]);

  const fetchUserById = useCallback(async (userId: string) => {
    const resultAction = await dispatch(getUserById(userId));
    if (getUserById.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to fetch user');
    }
  }, [dispatch]);

  const fetchUserByEmail = useCallback(async (email: string) => {
    const resultAction = await dispatch(getUserByEmail(email));
    if (getUserByEmail.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to fetch user');
    }
  }, [dispatch]);

  const createNewUser = useCallback(async (createUserDto: CreateUserDto) => {
    const resultAction = await dispatch(createUser(createUserDto));
    if (createUser.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to create user');
    }
  }, [dispatch]);

  const updateExistingUser = useCallback(async (userId: string, updateUserDto: UpdateUserDto) => {
    const resultAction = await dispatch(updateUser({ userId, updateUserDto }));
    if (updateUser.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to update user');
    }
  }, [dispatch]);

  const deleteExistingUser = useCallback(async (userId: string) => {
    const resultAction = await dispatch(deleteUser(userId));
    if (deleteUser.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error('Failed to delete user');
    }
  }, [dispatch]);

  return { 
    users, 
    selectedUser,
    paginationInfo,
    error, 
    loading: isLoading, 
    getUsers: fetchUsers, 
    getUserById: fetchUserById, 
    getUserByEmail: fetchUserByEmail, 
    createUser: createNewUser, 
    updateUser: updateExistingUser, 
    deleteUser: deleteExistingUser 
  };
};