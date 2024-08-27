import { createSlice } from '@reduxjs/toolkit';

// Initial state with example permissions
const initialState = {
  permissions: [
    {
      menuId: 1,
      menuName: 'Enquiry',
      moduleUrl: '/enquiry',
      moduleIcon: '🔍',
      can_view: true,
      can_add: false,
      can_edit: false,
    },

    // Add more permissions as needed
  ],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
  },
});

export const { setPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
