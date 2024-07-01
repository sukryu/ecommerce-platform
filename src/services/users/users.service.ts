import Authapi from '../api';
import { API_CONFIG } from '../../common/constants/api-url.config';
import { Role } from '../../components/pages/admin/RoleManagementPage';

interface UserEntity {
  id: string;
  email: string;
  username: string;
  roles: { name: string }[];
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
          const response = await Authapi.get<ApiResponse<UserEntity>>(
            `${API_CONFIG.AUTH_URL}/auth/profile`,
            { withCredentials: true }
          );
          return response.data.data;  // Make sure this includes the roles
        } catch (error) {
          console.error('Get user error:', error);
          throw new Error('Failed to get user information');
        }
      },
  
    async signup(username: string, email: string, password: string): Promise<void> {
        try {
            await Authapi.post<ApiResponse<void>>(
              `${API_CONFIG.AUTH_URL}/auth/register`,
              { username, email, password },
              { withCredentials: true }
            );
        } catch (error: any) {
            console.error('Signup error:', error);
            throw new Error(error.response?.data?.message || 'Failed to sign up');
        }
    },

    async updateProfile(updateData: Partial<UserEntity>): Promise<UserEntity> {
        try {
            const response = await Authapi.patch<ApiResponse<UserEntity>>(
                `${API_CONFIG.AUTH_URL}/auth/update-profile`,
                updateData,
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw new Error(error.response?.data?.message || 'Failed to update profile');
        }
    },

    async deleteAccount(): Promise<void> {
        try {
            await Authapi.delete(
                `${API_CONFIG.AUTH_URL}/auth/delete-account`,
                { withCredentials: true }
            );
        } catch (error: any) {
            console.error('Delete account error:', error);
            throw new Error(error.response?.data?.message || 'Failed to delete account');
        }
    },

    async refreshToken(): Promise<void> {
        try {
            await Authapi.post(
                `${API_CONFIG.AUTH_URL}/auth/refresh-token`,
                {},
                { withCredentials: true }
            );
        } catch (error: any) {
            console.error('Refresh token error:', error);
            throw new Error(error.response?.data?.message || 'Failed to refresh token');
        }
    },

    async getRoles(): Promise<Role[]> {
        try {
          const response = await Authapi.get<ApiResponse<Role[]>>(
            `${API_CONFIG.AUTH_URL}/roles`,
            { withCredentials: true }
          );
          return response.data.data;
        } catch (error) {
          console.error('Get roles error:', error);
          throw new Error('Failed to get roles');
        }
      },
    
      async createRole(name: string): Promise<void> {
        try {
          await Authapi.post<ApiResponse<void>>(
            `${API_CONFIG.AUTH_URL}/roles`,
            { name },
            { withCredentials: true }
          );
        } catch (error) {
          console.error('Create role error:', error);
          throw new Error('Failed to create role');
        }
      },
    
      async deleteRole(id: number): Promise<void> {
        try {
          await Authapi.delete<ApiResponse<void>>(
            `${API_CONFIG.AUTH_URL}/roles/${id}`,
            { withCredentials: true }
          );
        } catch (error) {
          console.error('Delete role error:', error);
          throw new Error('Failed to delete role');
        }
    },
};