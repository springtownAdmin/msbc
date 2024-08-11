import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import listReducer from './slices/list';

const store = configureStore({

  reducer: {
    auth: authReducer,
    list: listReducer
  },

});

export default store;