import Authapi from "../..";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { CursorPaginationDto } from "../../dto/user/cursor-pagination.dto";
import { UpdateUserDto } from "../../dto/user/update-user.dto";
import { ApiResponse } from "../../response/api-response.response";
import { PaginatedUsers } from "../../types/paginated-users.type";
import { UserEntity } from "../../types/user.type";
import { handleResponse } from "../../common/utils/response-handler";
import { ApiError, NetworkError } from "../../common/errors/custom-error-classes";

export class UserService {
    constructor() {}

    async getUsersWithCursorPaginations(cursorPaginationDto: CursorPaginationDto): Promise<PaginatedUsers> {
        try {
            const response = await Authapi.get<ApiResponse<PaginatedUsers>>('/users/pagination', {
                params: cursorPaginationDto
            });
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Get users error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get users');
        }
    }

    async getUserById(userId: string): Promise<UserEntity> {
        try {
            const response = await Authapi.get<ApiResponse<UserEntity>>(`/users/${userId}`);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Get user by ID error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get user');
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        try {
            const response = await Authapi.post<ApiResponse<UserEntity>>('/users/email', { email });
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Get user by email error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get user');
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const response = await Authapi.post<ApiResponse<UserEntity>>('/users/create', createUserDto);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Create user error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to create user');
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {
            const response = await Authapi.patch<ApiResponse<UserEntity>>(`/users/${userId}`, updateUserDto);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Update user error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to update user');
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const response = await Authapi.delete<ApiResponse<void>>(`/users/${userId}`);
            handleResponse(response.data);
        } catch (error: any) {
            console.error('Delete user error:', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to delete user');
        }
    }
}