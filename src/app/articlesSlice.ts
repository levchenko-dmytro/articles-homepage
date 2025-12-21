import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  keywords: string;
  pageNum: string;
};

const initialState: SearchState = { keywords: '', pageNum: '' };

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setKeywords(state, action: PayloadAction<string>) {
      state.keywords = action.payload;
    },
    clearKeywords(state) {
      state.keywords = '';
    },
    setPageNum(state, action: PayloadAction<string>) {
      state.pageNum = action.payload
    }
  },
});

export const { setKeywords, clearKeywords, setPageNum } = slice.actions;
export default slice.reducer;
