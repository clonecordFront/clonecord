import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/Request';

//TODO: 토큰과 채널정보 {description, imageUrl, roomName} 넘겨주고 채널 생성하기
export const __createChannel = createAsyncThunk(
  'CREATE_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      instance.defaults.headers.post['Authorization'] = arg.authorization;
      instance.defaults.headers.post['Refresh-token'] = arg.refresh_token;
      const { data } = await instance.post(`/api/room`, {
        description: arg.description,
        imageUrl: arg.imageUrl,
        roomName: arg.roomName,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: 토큰을 넘겨주고 해당 유저가 가입된 채널 목록 받아오기
export const __getChannels = createAsyncThunk(
  'GET_CHANNELS',
  async (arg, thunkAPI) => {
    try {
      instance.defaults.headers.get['Authorization'] = arg.authorization;
      instance.defaults.headers.get['Refresh-token'] = arg.refresh_token;
      const { data } = await instance.get(`/api/room`);
      //console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: 토큰과  roomId를 넘겨주고 특정 채널 정보 받아오기
export const __getChannel = createAsyncThunk(
  'GET_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      instance.defaults.headers.get['Authorization'] = arg.authorization;
      instance.defaults.headers.get['Refresh-token'] = arg.refresh_token;
      const { data } = await instance.get(`/api/room/${arg.roomId}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  //? 현재 로그인 된 유저의 가입 된 채널 목록
  channels: {
    data: [],
    isLoading: false,
    error: null,
  },
  //? 현재 보고있는 채널 정보
  channel: {
    data: {},
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
      //console.log(action.payload.roomId, action.payload);
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
      // console.log(
      //   state.chats.data[action.payload.roomId][
      //     state.chats.data[action.payload.roomId].length - 2
      //   ],
      //   state.chats.data[action.payload.roomId][
      //     state.chats.data[action.payload.roomId].length - 1
      //   ]
      // );
    },
  },
  extraReducers: {
    /* 유저 가입된 채널 목록 받기 */
    [__getChannels.pending]: (state) => {
      state.channels.isLoading = true;
    },
    [__getChannels.fulfilled]: (state, action) => {
      state.channels.data = action.payload.data;
      state.channels.isLoading = false;
    },
    [__getChannels.rejected]: (state, action) => {
      state.channels.isLoading = false;
      state.channels.error = action.payload;
    },
    /* 보고있는 해당 채널 정보 받기 */
    [__getChannel.pending]: (state) => {
      state.channel.isLoading = true;
    },
    [__getChannel.fulfilled]: (state, action) => {
      state.channel.data = action.payload.data;
      state.chats.data[action.payload.data.roomId] =
        action.payload.data.chatMessageList;
      state.channel.isLoading = false;
    },
    [__getChannel.rejected]: (state, action) => {
      state.channel.isLoading = false;
      state.channel.error = action.payload;
    },
  },
});

export const { CLEAR_CHATS, ADD_CHAT } = chatSlice.actions;
export default chatSlice.reducer;
