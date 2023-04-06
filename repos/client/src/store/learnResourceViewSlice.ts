import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LearnResourceListItem } from '../Interface/learnResource';

interface LearnResourceViewSliceState {
  learnResource: LearnResourceListItem | null;
}

const initialState: LearnResourceViewSliceState = {
  learnResource: null,
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

const learnResourceViewSlice = createSlice({
  name: 'learnResourceView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLearnResourceView.fulfilled, (state, action) => {
      state.learnResource = action.payload;
    });
  },
});

// export const {} = learnResourceViewSlice.actions;

export default learnResourceViewSlice.reducer;
