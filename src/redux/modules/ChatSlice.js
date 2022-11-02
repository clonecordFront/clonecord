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

const initialState = {
  //?
  channels: {
    data: [],
    isLoading: false,
    error: null,
  },
  //! chats. data객체의 key:channel Id, value: 해당 채널 채팅기록 배열
  chats: {
    data: {},
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
        data: {},
        isLoading: false,
        error: null,
      };
    },
    ADD_CHAT: (state, action) => {
      console.log(action.payload.roomId, action.payload);
      if (state.chats.data[action.payload.roomId]) {
        state.chats.data[action.payload.roomId] = [
          ...state.chats.data[action.payload.roomId],
          action.payload,
        ];
      } else {
        //console.log('Empty! Insert first chat');
        state.chats.data[action.payload.roomId] = [action.payload];
      }
      //console.log(state.chats.data[action.payload.roomId]);
    },
  },
  extraReducers: {},
});

export const { CLEAR_CHATS, ADD_CHAT } = chatSlice.actions;
export default chatSlice.reducer;