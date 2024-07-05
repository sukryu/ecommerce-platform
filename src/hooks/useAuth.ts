import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout, signup, updateProfile, deleteAccount, refreshToken, checkAuthStatus } from '../store/slices/authSlice';
import { CreateUserDto } from '../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../api/dto/user/update-user.dto';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, error, isLoading } = useAppSelector((state) => state.auth);

  const loginUser = useCallback(async (email: string, password: string) => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const logoutUser = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const signupUser = useCallback(async (createUserDto: CreateUserDto) => {
    try {
      await dispatch(signup(createUserDto)).unwrap();
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const updateUserProfile = useCallback(async (updateUserDto: UpdateUserDto) => {
    try {
      const updatedUser = await dispatch(updateProfile(updateUserDto)).unwrap();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const deleteUserAccount = useCallback(async () => {
    try {
      await dispatch(deleteAccount()).unwrap();
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const refreshUserToken = useCallback(async () => {
    try {
      await dispatch(refreshToken()).unwrap();
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const checkUserAuthStatus = useCallback(async () => {
    try {
      await dispatch(checkAuthStatus()).unwrap();
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  return { 
    user,
    error, 
    loading: isLoading, 
    login: loginUser, 
    logout: logoutUser, 
    signup: signupUser, 
    updateProfile: updateUserProfile, 
    deleteAccount: deleteUserAccount, 
    refreshToken: refreshUserToken,
    checkAuthStatus: checkUserAuthStatus
  };
};