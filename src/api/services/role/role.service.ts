import Authapi from "../..";
import { CreateRoleDto } from "../../dto/role/create-role.dto";
import { UpdateRoleDto } from "../../dto/role/update-role.dto";
import { ApiResponse } from "../../response/api-response.response";
import { Role } from "../../types/role.type";
import { UserEntity } from "../../types/user.type";
import { handleResponse } from "../../common/utils/response-handler";
import { ApiError, NetworkError } from "../../common/errors/custom-error-classes";

export class RoleService {
    constructor() {}

    async getRoles(): Promise<Role[]> {
        try {
            const response = await Authapi.get<ApiResponse<Role[]>>('/auth/roles/get-all');
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Get roles error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get roles');
        }
    }

    async getRoleById(id: number): Promise<Role> {
        try {
            const response = await Authapi.get<ApiResponse<Role>>(`/auth/roles/get/${id}`);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Get role by id error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get role');
        }
    }

    async getRoleUsers(roleId: number): Promise<UserEntity[]> {
        try {
            const response = await Authapi.get<ApiResponse<UserEntity[]>>(`/auth/roles/${roleId}/users`);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Get role users error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to get users for this role');
        }
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        try {
            const response = await Authapi.post<ApiResponse<Role>>('/auth/roles/create', createRoleDto);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Create role error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to create role');
        }
    }

    async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        try {
            const response = await Authapi.patch<ApiResponse<Role>>(`/auth/roles/update/${id}`, updateRoleDto);
            return handleResponse(response.data);
        } catch (error: any) {
            console.error(`Update role error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to update role');
        }
    }

    async deleteRole(id: number): Promise<void> {
        try {
            const response = await Authapi.delete<ApiResponse<void>>(`/auth/roles/delete/${id}`);
            handleResponse(response.data);
        } catch (error: any) {
            console.error(`Delete role error: `, error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new NetworkError('Failed to delete Role');
        }
    }
}