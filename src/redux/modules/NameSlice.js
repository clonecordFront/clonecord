import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/Request';

//TODO: user key 받아오고 닉네임 저장
export const __nameLogin = createAsyncThunk(
  'NAME_LOGIN',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.post(`/api/v1/user`, {name: arg.nickname});
      data.nickname = arg.nickname;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  user: {
    data: {},
    isLogin: false,
    isLoading: false,
    error: null,
  },
};

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    restoreSession: (state) => {
      const userKey = sessionStorage.getItem('UserKey');
      const userNickname = sessionStorage.getItem('UserNickname');
      if (userKey && userNickname) {
        state.user.data = { key: userKey, nickname: userNickname };
        state.user.isLogin = true;
      }
    },
    logout: (state) => {
      sessionStorage.clear(); // 세션 저장소를 비우고
      state.user = { data: {}, isLogin: false, isLoading: false, error: null }; // 상태 초기화
    },
  },
  extraReducers: {
    /* user key 받기 */
    [__nameLogin.pending]: (state) => {
      state.user.isLoading = true;
    },
    [__nameLogin.fulfilled]: (state, action) => {
      state.user.data = action.payload;
      sessionStorage.setItem('UserKey', JSON.stringify(action.payload.key));
      sessionStorage.setItem(
        'UserNickname',
        JSON.stringify(action.payload.nickname)
      );
      state.user.isLogin = true;
      state.user.isLoading = false;
    },
    [__nameLogin.rejected]: (state, action) => {
      state.user.isLoading = false;
      state.user.error = action.payload;
    },
  },
});
export const { logout, restoreSession } = nameSlice.actions;
export default nameSlice.reducer;
