import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../Interface/db';

export type UserState = IUser;

// export type PostWithoutId = Omit<Post, 'id'>;

const initialState: UserState = {} as IUser;

const postsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    user: (state, action: PayloadAction<UserState>) => {
      state = { ...action.payload };
    },
  },
});

export const { user } = postsSlice.actions;

export default postsSlice.reducer;
