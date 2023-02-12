import { configureStore } from '@reduxjs/toolkit';
import roadmapViewSlice from './roadmapViewSlice';
import roadmapWriteSlice from './roadmapWriteSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    roadmapWrite: roadmapWriteSlice,
    roadmapView: roadmapViewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
