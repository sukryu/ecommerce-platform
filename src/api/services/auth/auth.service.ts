import Authapi from "../..";
import { EmailLoginDto } from "../../dto/auth/email-login.dto";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { UpdateUserDto } from "../../dto/user/update-user.dto";
import { ApiResponse } from "../../response/api-response.response";
import { UserResponse } from "../../response/user.response";
import { UserEntity } from "../../types/user.type";
import { handleResponse } from "../../common/utils/response-handler";
import { ApiError, NetworkError } from "../../common/errors/custom-error-classes";

export class AuthService {
    constructor() {}

    async signup(createUserDto: CreateUserDto): Promise<void> {
        try {
            const response = await Authapi.post<ApiResponse<void>>('/auth/register', createUserDto);
            handleResponse(response.data);
        } catch (error: any) {
            console.error(`Signup error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to sign up');
        }
    }

    async updateProfile(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {
            const response = await Authapi.patch<ApiResponse<UserEntity>>('/auth/update-profile', updateUserDto);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Update profile error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to update user');
        }
    }

    async deleteAccount(): Promise<void> {
        try {
            const response = await Authapi.delete<ApiResponse<void>>('/auth/delete-profile');
            handleResponse(response.data);
        } catch (error: any) {
            console.error(`Delete account error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to delete account');
        }
    }

    async login(emailLoginDto: EmailLoginDto): Promise<void> {
        try {
            const response = await Authapi.post<ApiResponse<void>>('/auth/login', emailLoginDto);
            handleResponse(response.data);
        } catch (error: any) {
            console.error(`Login Failed: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Login Failed');
        }
    }

    async logout(): Promise<void> {
        try {
            const response = await Authapi.post<ApiResponse<void>>('/auth/logout', {});
            handleResponse(response.data);
        } catch (error: any) {
            console.error('Logout error:', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to logout');
        }
    }

    async profile(): Promise<UserEntity> {
        try {
            const response = await Authapi.get<ApiResponse<UserResponse>>('/auth/profile');
            return handleResponse(response.data).user;
        } catch (error: any) {
            console.error(`Get user error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get user Information');
        }
    }

    async refreshToken(): Promise<void> {
        try {
            const response = await Authapi.post<ApiResponse<void>>('/auth/refresh-token', {});
            handleResponse(response.data);
        } catch (error: any) {
            console.error(`Refresh token error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to refresh token');
        }
    }
}