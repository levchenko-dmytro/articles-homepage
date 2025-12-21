import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './api';
import searchReducer from './articlesSlice';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    app: searchReducer,
  },
  middleware: (getDefault) => getDefault().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
