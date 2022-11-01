import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../modules/ChatSlice';
import LoginSlice from '../modules/LoginSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: LoginSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
