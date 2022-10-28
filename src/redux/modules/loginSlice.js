import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from '../../shared/request';
import axios from 'axios';

// 다시 확인
const initialState = {
  login: {
    nickname: '',
    password: '',
    passwordConfirm: ''
  },
  isLoading: false,
  error: null,
};

export const memberLogin = createAsyncThunk(
  'MEMBER_LOGIN',
  async (payload, thunkAPI) => {

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },

      };

      const { data } = await instance.post('주소', payload, config) // 주소 넣어줘야함

        .then((token) => {
          if (token.data.success) {
            localStorage.setItem('Authorization', token.request.getResponseHeader('authorization'));
            localStorage.setItem('Refresh-Token', token.request.getResponseHeader('refresh-Token'));
            alert('로그인에 성공하였습니다!')
            window.location.replace('/');
          }
        }).catch(error => {
          alert("아이디와 비밀번호를 확인해주세요!");
        })
    } catch (error) {
    }
  }
);


const loginSlice = createSlice({
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

export default loginSlice.reducer;