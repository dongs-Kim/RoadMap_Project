import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
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
  userData: object;
  loading: boolean;
}

const initialState: InitailStateType = {
  userData: {},
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {   
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
