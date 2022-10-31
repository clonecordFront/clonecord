import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/Request';

//TODO: 채널 아이디를 받아서 해당 채널에 기록된 채팅 기록 조회
export const __getChats = createAsyncThunk(
  'GET_CHATS',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.get(``);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __addChat = createAsyncThunk('ADD_CHAT', async (arg, thunkAPI) => {
  try {
    return thunkAPI.fulfillWithValue(arg);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

const initialState = {
  chats: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    CLEAR_CHATS: (state) => {
      state.chats = {
        data: [],
        isLoading: false,
        error: null,
      };
    },
  },
  extraReducers: {
    //? 접수받은 채팅 추가하기
    [__addChat.pending]: (state) => {
      state.chats.isLoading = true;
    },
    [__addChat.fulfilled]: (state, action) => {
      state.chats.data = state.chats.data.concat(action.payload);
      state.chats.isLoading = false;
    },
    [__addChat.rejected]: (state, action) => {
      state.chats.error = action.payload;
      state.chats.isLoading = false;
    },
  },
});

export const { CLEAR_CHATS } = chatSlice.actions;
export default chatSlice.reducer;
