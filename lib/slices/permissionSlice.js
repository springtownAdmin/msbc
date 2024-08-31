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

const initialState = {
  permissions: loadPermissionsFromLocalStorage(),
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      savePermissionsToLocalStorage(action.payload);
    },
    clearPermissions: (state) => {
      state.permissions = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('permissions'); // Clear localStorage
      }
    }
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;