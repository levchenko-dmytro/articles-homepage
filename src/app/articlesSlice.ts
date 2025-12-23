import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  keywords: string[];
};

const initialState: SearchState = { keywords: [] };

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setKeywords(state, action: PayloadAction<string[]>) {
      state.keywords = action.payload;
    },
    clearKeywords(state) {
      state.keywords = [];
    },
  },
});

export const { setKeywords, clearKeywords } = slice.actions;
export default slice.reducer;
