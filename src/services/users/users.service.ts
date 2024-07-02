import Authapi from '../api';
import { API_CONFIG } from '../../common/constants/api-url.config';

export interface Role {
  id: number;
  name: string;
  created_At: string;
  updated_At: string;
  deleted_At: string | null;
  created_By: string | null;
  updated_By: string | null;
  deleted_By: string | null;
}
export interface UserEntity {
  id: string;
  email: string;
  username: string;
  roles: string[];
  created_At: string;
  updated_At: string;
  deleted_At: string | null;
}

interface UserResponse {
  user: UserEntity;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface PaginatedUsers {
  users: UserEntity[];
  nextCursor: string | null;
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
          const response = await Authapi.get<ApiResponse<UserResponse>>(
            `${API_CONFIG.AUTH_URL}/auth/profile`,
            { withCredentials: true }
          );
          return response.data.data.user;  // Make sure this includes the roles
        } catch (error) {
          console.error('Get user error:', error);
          throw new Error('Failed to get user information');
        }
      },

      async getUsers(cursor?: string, limit?: number): Promise<PaginatedUsers> {
        try {
          const response = await Authapi.get<ApiResponse<PaginatedUsers>>(
            `${API_CONFIG.AUTH_URL}/users/pagination`,
            { 
              params: { cursor, limit },
              withCredentials: true 
            }
          );
          return response.data.data;
        } catch (error) {
          console.error('Get users error:', error);
          throw new Error('Failed to get users');
        }
      },
    
      async getUserById(userId: string): Promise<UserEntity> {
        try {
          const response = await Authapi.get<ApiResponse<UserEntity>>(
            `${API_CONFIG.AUTH_URL}/users/${userId}`,
            { withCredentials: true }
          );
          return response.data.data;
        } catch (error) {
          console.error('Get user by ID error:', error);
          throw new Error('Failed to get user');
        }
      },
    
      async getUserByEmail(email: string): Promise<UserEntity> {
        try {
          const response = await Authapi.post<ApiResponse<UserEntity>>(
            `${API_CONFIG.AUTH_URL}/users/email`,
            { email },
            { withCredentials: true }
          );
          return response.data.data;
        } catch (error) {
          console.error('Get user by email error:', error);
          throw new Error('Failed to get user');
        }
      },
    
      async createUser(userData: { email: string, password: string, username: string}): Promise<UserEntity> {
        try {
          const response = await Authapi.post<ApiResponse<UserEntity>>(
            `${API_CONFIG.AUTH_URL}/users/create`,
            userData,
            { withCredentials: true }
          );
          return response.data.data;
        } catch (error) {
          console.error('Create user error:', error);
          throw new Error('Failed to create user');
        }
      },
    
      async updateUser(userId: string, userData: { email?: string, username?: string}): Promise<UserEntity> {
        try {
          const response = await Authapi.patch<ApiResponse<UserEntity>>(
            `${API_CONFIG.AUTH_URL}/users/${userId}`,
            userData,
            { withCredentials: true }
          );
          return response.data.data;
        } catch (error) {
          console.error('Update user error:', error);
          throw new Error('Failed to update user');
        }
      },
    
      async deleteUser(userId: string): Promise<void> {
        try {
          await Authapi.delete(
            `${API_CONFIG.AUTH_URL}/users/${userId}`,
            { withCredentials: true }
          );
        } catch (error) {
          console.error('Delete user error:', error);
          throw new Error('Failed to delete user');
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
          `${API_CONFIG.AUTH_URL}/auth/roles/get-all`,
          { withCredentials: true }
        );
        return response.data.data;
      } catch (error) {
        console.error('Get roles error:', error);
        throw new Error('Failed to get roles');
      }
    },
  
    async createRole(name: string): Promise<Role> {
      try {
        const response = await Authapi.post<ApiResponse<Role>>(
          `${API_CONFIG.AUTH_URL}/auth/roles/create`,
          { name },
          { withCredentials: true }
        );
        return response.data.data;
      } catch (error) {
        console.error('Create role error:', error);
        throw new Error('Failed to create role');
      }
    },
  
    async updateRole(id: number, name: string): Promise<Role> {
      try {
        const response = await Authapi.patch<ApiResponse<Role>>(
          `${API_CONFIG.AUTH_URL}/auth/roles/update/${id}`,
          { name },
          { withCredentials: true }
        );
        return response.data.data;
      } catch (error) {
        console.error('Update role error:', error);
        throw new Error('Failed to update role');
      }
    },
  
    async deleteRole(id: number): Promise<void> {
      try {
        await Authapi.delete<ApiResponse<void>>(
          `${API_CONFIG.AUTH_URL}/auth/roles/delete/${id}`,
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Delete role error:', error);
        throw new Error('Failed to delete role');
      }
    },
  
    async getRoleById(id: number): Promise<Role> {
      try {
        const response = await Authapi.get<ApiResponse<Role>>(
          `${API_CONFIG.AUTH_URL}/auth/roles/get/${id}`,
          { withCredentials: true }
        );
        return response.data.data;
      } catch (error) {
        console.error('Get role by id error:', error);
        throw new Error('Failed to get role');
      }
    },
  
    // If you have an endpoint to get users for a specific role, you can add it here
    async getRoleUsers(roleId: number): Promise<UserEntity[]> {
      try {
        const response = await Authapi.get<ApiResponse<UserEntity[]>>(
          `${API_CONFIG.AUTH_URL}/auth/roles/${roleId}/users`,
          { withCredentials: true }
        );
        return response.data.data;
      } catch (error) {
        console.error('Get role users error:', error);
        throw new Error('Failed to get users for this role');
      }
    }
};