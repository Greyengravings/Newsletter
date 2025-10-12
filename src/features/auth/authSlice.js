// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  username: localStorage.getItem('username') || '',
  userId: localStorage.getItem('userId') || '',
  role: localStorage.getItem('role') || '',
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      state.userId = '';
      state.role = '';
      state.token = '';
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
