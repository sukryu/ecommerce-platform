import { useState, useCallback, useEffect } from 'react';
import { ServiceFactory } from '../api/common/utils/service-factory';
import { ApiError, NetworkError } from '../api/common/errors/custom-error-classes';
import { UserEntity } from '../api/types/user.type';
import { EmailLoginDto } from '../api/dto/auth/email-login.dto';
import { CreateUserDto } from '../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../api/dto/user/update-user.dto';

export const useAuth = () => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const authService = ServiceFactory.getAuthService();

  const checkAuthStatus = useCallback(async () => {
    try {
      const userData = await authService.profile();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email: string, password: string) => {
    try {
      await authService.login({ email, password });
      await checkAuthStatus();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const signup = useCallback(async (createUserDto: CreateUserDto) => {
    setLoading(true);
    setError(null);
    try {
      await authService.signup(createUserDto);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updateUserDto: UpdateUserDto) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile(updateUserDto);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.deleteAccount();
      setUser(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.refreshToken();
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
    user,
    error, 
    loading, 
    login, 
    logout, 
    signup, 
    updateProfile, 
    deleteAccount, 
    refreshToken, 
    checkAuthStatus 
  };
};