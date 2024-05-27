import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../modules/ChatSlice';
import LoginSlice from '../modules/LoginSlice';
import NameSlice from '../modules/NameSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: LoginSlice,
    name: NameSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
