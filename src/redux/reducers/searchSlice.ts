import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchAction {
  type: string;
  payload: string;
}
export interface searchReducer {
  text: string;
}
const initSearch: searchReducer = {
  text: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initSearch,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
  extraReducers: {},
});

export default searchSlice.reducer;
