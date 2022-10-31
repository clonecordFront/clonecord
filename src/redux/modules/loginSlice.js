import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from '../../shared/Request';

// http://13.124.142.195/
const initialState = {
  login: {
    email: '',
    password: '',
  },
  isLoading: false,
  error: null,
};

export const memberLogin = createAsyncThunk(
  'MEMBER_LOGIN',
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await instance.post('/api/members/login', payload, config) 
        .then((token) => {
          if (token.data.success) {
            localStorage.setItem('Authorization', token.request.getResponseHeader('authorization'));
            localStorage.setItem('Refresh-Token', token.request.getResponseHeader('refresh-Token'));
            alert('로그인에 성공했습니다.')
            window.location.replace('/');
          }
        }).catch(error => {
          alert("아이디와 비밀번호를 확인하세요");
        })
    } catch (error) {
    }
  }
);


const LoginSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: {
    [memberLogin.pending]: (state) => {
      state.isLoading = true;
    },

    [memberLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.login = action.payload;
    },
    [memberLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default LoginSlice.reducer;