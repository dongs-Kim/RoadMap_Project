import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Connection, Edge, Node, addEdge as flowAddEdge } from 'reactflow';
import shortUUID from 'short-uuid';
import _ from 'lodash';
import { EdgeData, RoadmapItem, RoadmapSetDto } from '../Interface/roadmap';

interface RoadmapViewState {
  roadmapSet: RoadmapSetDto | null;
  isStore?: boolean;
}

const initialState: RoadmapViewState = {
  roadmapSet: null,
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

export const getIsStore = createAsyncThunk<boolean, { id: string }>(
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

const roadmapViewSlice = createSlice({
  name: 'roadmapView',
  initialState,
  reducers: {
    toggleBookmark: (state) => {
      state.isStore = !state.isStore;
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

    builder.addCase(getIsStore.fulfilled, (state, action) => {
      state.isStore = action.payload;
    });
  },
});

export const { toggleBookmark } = roadmapViewSlice.actions;

export default roadmapViewSlice.reducer;
