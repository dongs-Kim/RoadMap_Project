import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IReply } from '../Interface/db';
import { LearnResourceListItem } from '../Interface/learnResource';

interface LearnResourceViewSliceState {
  learnResource: LearnResourceListItem | null;
  replies: IReply[];
  isLike?: boolean;
}

const initialState: LearnResourceViewSliceState = {
  learnResource: null,
  replies: [],
};

export const getLearnResourceView = createAsyncThunk<LearnResourceListItem, { id: string }>(
  'learnResourceView/getLearnResourceView',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<LearnResourceListItem>(`/api/learn-resource/${id}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const getIsLike = createAsyncThunk<boolean, { id: string }>(
  'learnResourceView/getIsLike',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<boolean>(`/api/learn-resource/${id}/isLike`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const getLearnResourceReplies = createAsyncThunk<IReply[], { id: string }>(
  'learnResourceView/getLearnResourceReplies',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<IReply[]>(`/api/learn-resource-replies/${id}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

const learnResourceViewSlice = createSlice({
  name: 'learnResourceView',
  initialState,
  reducers: {
    clearState: (state) => {
      state.learnResource = null;
      delete state.isLike;
    },
    toggleLike: (state) => {
      state.isLike = !state.isLike;
      if (state.learnResource) {
        state.learnResource.like = (state.learnResource.like ?? 0) + (state.isLike ? 1 : -1);
      }
    },
    clearLike: (state) => {
      state.isLike = false;
    },
    clearLearnResourceReplies: (state) => {
      state.replies = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLearnResourceView.fulfilled, (state, action) => {
      state.learnResource = action.payload;
    });
    builder.addCase(getIsLike.fulfilled, (state, action) => {
      state.isLike = action.payload;
    });
    builder.addCase(getLearnResourceReplies.fulfilled, (state, action) => {
      state.replies = action.payload;
    });
  },
});

export const { clearState, toggleLike, clearLike, clearLearnResourceReplies } = learnResourceViewSlice.actions;

export default learnResourceViewSlice.reducer;
