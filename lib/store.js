import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import listReducer from './slices/list';
import permissionSlice from './slices/permissionSlice';

const store = configureStore({

  reducer: {
    auth: authReducer,
    list: listReducer,
    permissions: permissionSlice
  },

});

export default store;