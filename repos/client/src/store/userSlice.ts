import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('users/getUser', async (_, thunkApi) => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export interface InitailStateType {
  comment: string;
  email: string;
  id: string;
  image: string;
  nickname: string;
  loading: boolean;
}

const initialState: InitailStateType = {
  comment: '',
  email: '',
  id: '',
  image: '',
  nickname: '',
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      Object.assign(state, action.payload);
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
