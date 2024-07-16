import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    },
    initializeAuth: (state) => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const username = localStorage.getItem('username');
      state.isLoggedIn = isLoggedIn;
      state.username = username;
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;