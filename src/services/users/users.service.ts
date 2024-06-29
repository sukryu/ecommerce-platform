import Authapi from '../api';
import { API_CONFIG } from '../../common/constants/api-url.config';

interface UserEntity {
  id: string;
  email: string;
  username: string;
  created_At: string;
  updated_At: string;
  deleted_At: string | null;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const AuthService = {
    async login(email: string, password: string): Promise<void> {
        try {
            await Authapi.post<ApiResponse<void>>(
                `${API_CONFIG.AUTH_URL}/auth/login`,
                { email, password },
                { withCredentials: true }
            );
        } catch (error: any) {
            console.error(`Login Failed: `, error);
            throw new Error(error.response?.data?.message || 'Login Failed');
        }
    },

    async logout(): Promise<void> {
        try {
            await Authapi.post(
                `${API_CONFIG.AUTH_URL}/auth/logout`, 
                {}, 
                { withCredentials: true },
            );
        } catch (error) {
            console.error('Logout error:', error);
            throw new Error('Failed to logout');
        }
    },

    async getUser(): Promise<UserEntity> {
        try {
            const response = await Authapi.post<ApiResponse<UserEntity>>(
                `${API_CONFIG.AUTH_URL}/auth/me`,
                {},
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            console.error('Get user error:', error);
            throw new Error('Failed to get user information');
        }
    },
  
    async signup(username: string, email: string, password: string): Promise<void> {
        await Authapi.post<ApiResponse<void>>(
          `${API_CONFIG.AUTH_URL}/users/create`,
          { username, email, password },
          { withCredentials: true }
        );
    },
};