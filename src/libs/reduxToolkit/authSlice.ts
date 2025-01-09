import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  user: {
    username: string;
  } | null;
  encryptedPrivateKey: string | null; // Add this field
}

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')),
  user: localStorage.getItem('username') 
    ? { username: localStorage.getItem('username')! }
    : null,
    encryptedPrivateKey: localStorage.getItem('encryptedPrivateKey') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = { username: action.payload.username };
      // state.user = action.payload;
      state.encryptedPrivateKey = action.payload.encryptedPrivateKey;
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('encryptedPrivateKey', action.payload.encryptedPrivateKey);
      
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      localStorage.setItem('isAuthenticated', action.payload.toString());
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.encryptedPrivateKey = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('encryptedPrivateKey');
    },
  },
});

export const { setCredentials, setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;
