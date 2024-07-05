import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceFactory } from '../../api/common/utils/service-factory';
import { Role } from '../../api/types/role.type';
import { CreateRoleDto } from '../../api/dto/role/create-role.dto';
import { UpdateRoleDto } from '../../api/dto/role/update-role.dto';
import { UserEntity } from '../../api/types/user.type';

const roleService = ServiceFactory.getRoleService();

export const getRoles = createAsyncThunk(
  'role/getRoles',
  async (_, { rejectWithValue }) => {
    try {
      const roles = await roleService.getRoles();
      return roles;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRoleById = createAsyncThunk(
  'role/getRoleById',
  async (id: number, { rejectWithValue }) => {
    try {
      const role = await roleService.getRoleById(id);
      return role;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRoleUsers = createAsyncThunk(
  'role/getRoleUsers',
  async (roleId: number, { rejectWithValue }) => {
    try {
      const users = await roleService.getRoleUsers(roleId);
      return { roleId, users };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRole = createAsyncThunk(
  'role/createRole',
  async (createRoleDto: CreateRoleDto, { rejectWithValue }) => {
    try {
      const newRole = await roleService.createRole(createRoleDto);
      return newRole;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRole = createAsyncThunk(
  'role/updateRole',
  async ({ id, updateRoleDto }: { id: number; updateRoleDto: UpdateRoleDto }, { rejectWithValue }) => {
    try {
      const updatedRole = await roleService.updateRole(id, updateRoleDto);
      return updatedRole;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRole = createAsyncThunk(
  'role/deleteRole',
  async (id: number, { rejectWithValue }) => {
    try {
      await roleService.deleteRole(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface RoleState {
  roles: Role[];
  selectedRole: Role | null;
  roleUsers: Record<number, UserEntity[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  roleUsers: {},
  isLoading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.selectedRole = action.payload;
      })
      .addCase(getRoleUsers.fulfilled, (state, action) => {
        state.roleUsers[action.payload.roleId] = action.payload.users;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(role => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
        if (state.selectedRole && state.selectedRole.id === action.payload.id) {
          state.selectedRole = action.payload;
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(role => role.id !== action.payload);
        if (state.selectedRole && state.selectedRole.id === action.payload) {
          state.selectedRole = null;
        }
        delete state.roleUsers[action.payload];
      });
  },
});

export default roleSlice.reducer;