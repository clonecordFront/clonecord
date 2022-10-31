import { configureStore } from '@reduxjs/toolkit';
import members from '../modules/LoginSlice'


const store = configureStore({
  reducer: {
    members,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
