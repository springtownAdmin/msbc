import { createSlice } from '@reduxjs/toolkit';

// Utility functions for localStorage with client-side check
const loadPermissionsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedPermissions = localStorage.getItem('permissions');
    return savedPermissions ? JSON.parse(savedPermissions) : [];
  }
  return [];
};

const savePermissionsToLocalStorage = (permissions) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }
};

// Initial state with permissions from localStorage
const initialState = {
  permissions: loadPermissionsFromLocalStorage(),
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload;
      savePermissionsToLocalStorage(action.payload); // Save to localStorage
    },
    clearPermissions: (state) => {
      state.permissions = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('permissions'); // Clear localStorage
      }
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
