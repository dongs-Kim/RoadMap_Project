import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import axios from 'axios';


export const getUser = createAsyncThunk('users/getUser', async (_, thunkApi) => {
  try {
    const response = await axios.get('/api/users');    
    console.log(response.data)
    return response.data;
  } catch (err) {    
    return thunkApi.rejectWithValue(err);
  }
});


export interface InitailStateType {
  comment : string,  
  email : string,
  id : string,
  image : string,
  nickname : string,
  loading: boolean;
}

const initialState: InitailStateType = {
  comment : "",  
  email : "",  
  id : "",  
  image : "",  
  nickname : "",  
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
      console.log("pending");
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state = action.payload;
      console.log("fulfilled")
      console.log(action);
      console.log(state);
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      console.log('rejected');
    });
  },
  
});

export default userSlice.reducer;
