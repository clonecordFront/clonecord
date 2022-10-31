import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from '../../shared/Request';
import axios from "axios";

export const __memberLogin = createAsyncThunk(
  'MEMBER_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data, headers} = await axios.post('https://code99-dev.pyuri.dev/api/members/login', payload, config);
      console.log(data)
      sessionStorage.setItem('Authorization', headers.authorization)
      sessionStorage.setItem('Refresh-Token', headers['refresh-token'])
      return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        alert(error.response.data.message);
    }
  }
);

export const __memberLogout = createAsyncThunk(
  "MEMBER_LOGOUT",
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('Authorization'),
          'Refresh-Token': sessionStorage.getItem('Refresh-Token')
        },
      };
      const { data } = await axios.post("https://code99-dev.pyuri.dev/api/auth/members/logout", payload, config);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  );

const initialState = {
  user: {
    data :{},
    isLoading: false,
    error: null,
  },
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [__memberLogin.pending]: (state) => {
      state.user.isLoading = true;
    },
    [__memberLogin.fulfilled]: (state, action) => {
      state.user.isLoading = false;
      state.user.data = action.payload.data;
    },
    [__memberLogin.rejected]: (state, action) => {
      state.user.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;