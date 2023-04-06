import { configureStore } from '@reduxjs/toolkit';
import learnResourceViewSlice from './learnResourceViewSlice';
import roadmapViewSlice from './roadmapViewSlice';
import roadmapWriteSlice from './roadmapWriteSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    roadmapWrite: roadmapWriteSlice,
    roadmapView: roadmapViewSlice,
    learnResource: learnResourceViewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
