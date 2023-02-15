import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IReply } from '../Interface/db';
import { RoadmapSetDto } from '../Interface/roadmap';

interface RoadmapViewState {
  roadmapSet: RoadmapSetDto | null;
  replies: IReply[];
  isStore?: boolean;
  isLike?: boolean;
}

const initialState: RoadmapViewState = {
  roadmapSet: null,
  replies: [],
};

export const getRoadmapView = createAsyncThunk<RoadmapSetDto, { id: string }>(
  'roadmapView/getRoadmapView',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<RoadmapSetDto>(`/api/roadmaps/${id}`, { params: { mode: 'view' } });
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const getIsBookmark = createAsyncThunk<boolean, { id: string }>(
  'roadmapView/getIsStore',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<boolean>(`/api/users/isStore/${id}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const getIsLike = createAsyncThunk<boolean, { id: string }>(
  'roadmapView/getIsLike',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<boolean>(`/api/roadmaps/${id}/isLike`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const getReplies = createAsyncThunk<IReply[], { id: string }>(
  'roadmapView/getReplies',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<IReply[]>(`/api/replies/${id}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

const roadmapViewSlice = createSlice({
  name: 'roadmapView',
  initialState,
  reducers: {
    clearState: (state) => {
      state.roadmapSet = null;
      delete state.isLike;
      delete state.isStore;
    },
    toggleBookmark: (state) => {
      state.isStore = !state.isStore;
    },
    clearBookmark: (state) => {
      state.isStore = false;
    },
    toggleLike: (state) => {
      state.isLike = !state.isLike;
      if (state.roadmapSet?.roadmap) {
        state.roadmapSet.roadmap.like = (state.roadmapSet.roadmap.like ?? 0) + (state.isLike ? 1 : -1);
      }
    },
    clearLike: (state) => {
      state.isLike = false;
    },
    clearReplies: (state) => {
      state.replies = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoadmapView.fulfilled, (state, action) => {
      const { nodes } = action.payload;
      state.roadmapSet = action.payload;
      state.roadmapSet.nodes = nodes.map((node) => {
        if (node.width) {
          node.style = node.style ?? {};
          node.style.width = node.width;
        } else {
          delete node.width;
        }
        if (node.height) {
          node.style = node.style ?? {};
          node.style.height = node.height;
        } else {
          delete node.height;
        }
        return node;
      });
    });

    builder.addCase(getIsBookmark.fulfilled, (state, action) => {
      state.isStore = action.payload;
    });
    builder.addCase(getIsLike.fulfilled, (state, action) => {
      state.isLike = action.payload;
    });

    builder.addCase(getReplies.fulfilled, (state, action) => {
      state.replies = action.payload;
    });
  },
});

export const { toggleBookmark, clearBookmark, toggleLike, clearLike, clearState, clearReplies } =
  roadmapViewSlice.actions;

export default roadmapViewSlice.reducer;
