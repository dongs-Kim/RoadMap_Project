import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { LearnResourceCreateDto, LearnResourceListItem } from '../Interface/learnResource';

const getInitialState = (): LearnResourceCreateDto => ({
  name: '',
  category: '',
  contents: '',
  url: '',
  mode: 'new',
});

export const getLearnResource = createAsyncThunk<LearnResourceListItem, { id: string }>(
  'learnResource/getLearnResource',
  async ({ id }, thunkApi) => {
    try {
      const { data } = await axios.get<LearnResourceListItem>(`/api/learn-resource/${id}`);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);

const learnResourceWriteSlice = createSlice({
  name: 'learnResourceWrite',
  initialState: getInitialState(),
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setContents: (state, action: PayloadAction<string>) => {
      state.contents = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    clearLearnResource: (state) => {
      _.extend(state, getInitialState());
      state.id = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLearnResource.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.category = action.payload.category;
      state.contents = action.payload.contents;
      state.url = action.payload.url;
      state.mode = 'modify';
    });
  },
});

export const { setName, setCategory, setContents, setUrl, clearLearnResource } = learnResourceWriteSlice.actions;

export default learnResourceWriteSlice.reducer;
