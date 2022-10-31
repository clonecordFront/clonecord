import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../modules/ChatSlice';

const store = configureStore({
  reducer: { chat: chatReducer, members },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
