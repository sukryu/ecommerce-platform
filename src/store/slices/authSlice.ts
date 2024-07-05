import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceFactory } from '../../api/common/utils/service-factory';
import { UserEntity } from '../../api/types/user.type';
import { CreateUserDto } from '../../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../../api/dto/user/update-user.dto';

const authService = ServiceFactory.getAuthService();

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      await authService.login({ email, password });
      const user = await authService.profile();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (createUserDto: CreateUserDto, { rejectWithValue }) => {
    try {
      await authService.signup(createUserDto);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updateUserDto: UpdateUserDto, { rejectWithValue }) => {
    try {
      const updatedUser = await authService.updateProfile(updateUserDto);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      await authService.deleteAccount();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      await authService.refreshToken();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.profile();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  user: UserEntity | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;