import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '../../shared/Request';

//TODO: 채널 생성하기
export const __createChannel = createAsyncThunk(
  'CREATE_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.post(`/api/v1/room`, {
        name: arg,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: 채널 수정하기
export const __updateChannel = createAsyncThunk(
  'UPDATE_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.put(`/api/v1/room/${arg.id}`, {
        name: arg.name,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: 채널 삭제하기
export const __deleteChannel = createAsyncThunk(
  'DELETE_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/api/v1/room/${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: 채널 목록 받아오기
export const __getChannels = createAsyncThunk(
  'GET_CHANNELS',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/v1/room`);
      //console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: roomId를 넘겨주고 특정 채널 정보 받아오기
export const __getChannel = createAsyncThunk(
  'GET_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/v1/room/${arg}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

//TODO: 토큰과 roomId를 넘겨주고 채널 가입하기
export const __inviteChannel = createAsyncThunk(
  'INVITE_CHANNEL',
  async (arg, thunkAPI) => {
    try {
      instance.defaults.headers.post['Authorization'] = arg.authorization;
      instance.defaults.headers.post['Refresh-token'] = arg.refresh_token;
      const { data } = await instance.post(`/api/invite/${arg.roomId}`);
      console.log(data);
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
    data: [],
    isLoading: false,
    error: null,
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    CLEAR_CHANNELS: (state) => {
      state.channels = {
        data: [],
        isLoading: false,
        error: null,
      };
    },
    CLEAR_CHANNEL: (state) => {
      state.channel = {
        data: {},
        isLoading: false,
        error: null,
      };
    },
    CLEAR_CHATS: (state) => {
      state.chats = {
        data: [],
        isLoading: false,
        error: null,
      };
    },
    ADD_CHAT: (state, action) => {
      if (state.chats.data) {
        state.chats.data = [...state.chats.data, action.payload];
      } else {
        state.chats.data = [action.payload];
      }
    },
    /* 소켓으로부터 받은 채널 컨트롤 : 채널 추가 */
    ADD_CHANNEL: (state, action) => {
      if(state.channels.data){
        state.channels.data = [...state.channels.data, action.payload];
      }else{
        state.channels.data = [action.payload];
      }
    },
    /* 소켓으로부터 받은 채널 컨트롤 : 채널 삭제 */
    DELETE_CHANNEL: (state, action) => {
      state.channels.data.filter(chn => {chn.id !== action.payload.id});
    },
    /* 소켓으로부터 받은 채널 컨트롤 : 채널 이름 변경 */
    UPDATE_CHANNEL: (state, action) => {
      state.channels.data.forEach(chn => {
        if(chn.id === action.payload.id){
          chn.name = action.payload.name;
        }
      })
    }
  },
  extraReducers: {
    /* 채널 생성 */
    [__createChannel.pending]: (state) => {
      state.channels.isLoading = true;
    },
    [__createChannel.fulfilled]: (state, action) => {
      state.channels.data.push(action.payload);
      state.channels.isLoading = false;
    },
    [__createChannel.rejected]: (state, action) => {
      state.channels.isLoading = false;
      state.channels.error = action.payload;
    },
    /* 채널 수정 */
    [__updateChannel.pending]: (state) => {
      state.channels.isLoading = true;
    },
    [__updateChannel.fulfilled]: (state, action) => {
      const index = state.channels.data.findIndex(
        (channel) => channel.id === action.payload.id
      );
      if (index !== -1) {
        // 채널 정보 업데이트 (불변성 유지)
        state.channels.data[index] = {
          ...state.channels.data[index],
          name: action.payload.name,
        };
      }
      state.channel.data.name = action.payload.name;
      state.channels.isLoading = false;
    },
    [__updateChannel.rejected]: (state, action) => {
      state.channels.isLoading = false;
      state.channels.error = action.payload;
    },
    /* 채널 삭제 */
    [__deleteChannel.pending]: (state) => {
      state.channels.isLoading = true;
    },
    [__deleteChannel.fulfilled]: (state, action) => {
      state.channels.data = state.channels.data.filter(
        (channel) => channel.id !== action.payload.id
      );
      state.channels.isLoading = false;
    },
    [__deleteChannel.rejected]: (state, action) => {
      state.channels.isLoading = false;
      state.channels.error = action.payload;
    },
    /* 채널 목록 받기 */
    [__getChannels.pending]: (state) => {
      state.channels.isLoading = true;
    },
    [__getChannels.fulfilled]: (state, action) => {
      state.channels.data = action.payload;
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
      state.channel.data = { id: action.payload.id, name: action.payload.name };
      state.chats.data = action.payload.chats;
      state.channel.isLoading = false;
    },
    [__getChannel.rejected]: (state, action) => {
      state.channel.isLoading = false;
      state.channel.error = action.payload;
    },
  },
});

export const { CLEAR_CHANNELS, CLEAR_CHANNEL, CLEAR_CHATS, ADD_CHAT, ADD_CHANNEL, DELETE_CHANNEL, UPDATE_CHANNEL } =
  chatSlice.actions;
export default chatSlice.reducer;
