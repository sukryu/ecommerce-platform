import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceFactory } from '../../api/common/utils/service-factory';
import { UserEntity } from '../../api/types/user.type';
import { CreateUserDto } from '../../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../../api/dto/user/update-user.dto';
import { CursorPaginationDto } from '../../api/dto/user/cursor-pagination.dto';
import { PaginatedUsers } from '../../api/types/paginated-users.type';

const userService = ServiceFactory.getUserService();

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (cursorPaginationDto: CursorPaginationDto, { rejectWithValue }) => {
    try {
      const users = await userService.getUsersWithCursorPaginations(cursorPaginationDto);
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const user = await userService.getUserById(userId);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserByEmail = createAsyncThunk(
  'user/getUserByEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      const user = await userService.getUserByEmail(email);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (createUserDto: CreateUserDto, { rejectWithValue }) => {
    try {
      const newUser = await userService.createUser(createUserDto);
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, updateUserDto }: { userId: string; updateUserDto: UpdateUserDto }, { rejectWithValue }) => {
    try {
      const updatedUser = await userService.updateUser(userId, updateUserDto);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await userService.deleteUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface UserState {
  users: UserEntity[];
  selectedUser: UserEntity | null;
  paginationInfo: {
    nextCursor: string | null;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  paginationInfo: {
    nextCursor: null,
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        const paginatedUsers = action.payload as PaginatedUsers;
        state.users = [...state.users, ...paginatedUsers.users];
        state.paginationInfo.nextCursor = paginatedUsers.nextCursor;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.selectedUser && state.selectedUser.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        if (state.selectedUser && state.selectedUser.id === action.payload) {
          state.selectedUser = null;
        }
      });
  },
});

export default userSlice.reducer;