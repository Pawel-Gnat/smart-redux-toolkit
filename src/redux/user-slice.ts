import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { API_URL } from '../api';

import { User, UserResponseSchema } from '../models/users';

interface UsersState {
  users: User[];
  filteredUsers: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  status: 'idle',
  error: null,
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const validationResult = UserResponseSchema.safeParse({
        users: data,
      });

      if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error.errors);
        return;
      }

      return validationResult.data.users;
    } catch (error) {
      console.log(error);
      return rejectWithValue('An error while fetching users');
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ column: keyof UsersState['filters']; value: string }>,
    ) => {
      state.filters[action.payload.column] = action.payload.value;
      state.filteredUsers = state.users.filter((user) =>
        Object.keys(state.filters).every((key) =>
          user[key as keyof User]
            .toString()
            .toLowerCase()
            .includes(state.filters[key as keyof UsersState['filters']].toLowerCase()),
        ),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<User[] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload) {
            state.users = action.payload;
            state.filteredUsers = action.payload;
          }
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch users';
        console.log(action);
      });
  },
});

export const { setFilter } = userSlice.actions;

export default userSlice.reducer;
