import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import listReducer from './slices/list';
import permissionsReducer from './slices/permissionSlice';


const store = configureStore({

  reducer: {
    auth: authReducer,
    list: listReducer,
    permissions:permissionsReducer
  },

});

export default store;