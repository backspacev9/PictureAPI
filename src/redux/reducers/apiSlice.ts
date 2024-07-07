import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchData, fetchDataById } from '../../api';
import { cardInterface } from '../../components/card/card';
import { ISortingInteface } from '../../interfaces';

export interface AppState {
  cards: Array<cardInterface>;
  currentCard: cardInterface | null;
  page: number;
  total_result: number;
  per_page: number;
  pagination_pages: Array<number>;
  sorting: ISortingInteface;
  selectedCard: cardInterface | undefined;
  query: string;
  isLoading: boolean;
  isScrolled: boolean;
  nextUrlPage: string;
  prevUrlPage: string;
  errorApi: boolean;
  tags: string[];
}
export const InitStateApi: AppState = {
  cards: [],
  currentCard: null,
  page: 1,
  total_result: 0,
  per_page: 10,
  pagination_pages: [],
  sorting: {
    orientation: '',
    color: '',
  },
  selectedCard: undefined,
  query: '?page=1&query=random',
  isLoading: false,
  isScrolled: false,
  nextUrlPage: '',
  prevUrlPage: '',
  errorApi: false,
  tags: [],
};
export interface ApiInterface {
  page: number;
  per_page: number;
  photos: Array<cardInterface>;
  total_results: number;
  next_page: string;
  prev_page: string;
}
///-----------Actions

///-- reducer
export const apiSlice = createSlice({
  name: 'api/fetchImage',
  initialState: InitStateApi,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.per_page = action.payload;
    },

    setOrientation(state, action: PayloadAction<string>) {
      state.sorting.orientation = action.payload;
    },
    setColor(state, action: PayloadAction<string>) {
      state.sorting.color = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload ? action.payload : state.query;
    },
    setIsScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
    setCurrentCard(state, action: PayloadAction<cardInterface | null>) {
      state.currentCard = action.payload;
    },
    resetSelectedCard(state) {
      state.selectedCard = undefined;
    },
    setTags(state, action: PayloadAction<Array<string>>) {
      state.tags = action.payload;
    },
  },
  extraReducers: {
    [fetchData.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchData.fulfilled.type]: (state, action: PayloadAction<ApiInterface>) => {
      state.cards = action.payload.photos;
      state.total_result = action.payload.total_results;
      state.page = action.payload.page;
      state.per_page = action.payload.per_page;
      state.nextUrlPage = action.payload.next_page;
      console.log('next page payload', action.payload.next_page);

      state.prevUrlPage = action.payload.prev_page
        ? action.payload.prev_page
        : action.payload.next_page;
      state.isLoading = false;
    },

    [fetchData.rejected.type]: (state, action: PayloadAction) => {
      state.errorApi = true;
      state.isLoading = false;
    },

    [fetchDataById.pending.type]: (state, action: PayloadAction<cardInterface>) => {
      console.log('pending');
      state.isLoading = true;
    },
    [fetchDataById.fulfilled.type]: (state, action: PayloadAction<cardInterface>) => {
      state.selectedCard = action.payload;
      state.isLoading = false;
    },
    [fetchDataById.rejected.type]: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.errorApi = action.payload;
      state.isLoading = false;
    },
  },
});
export const {
  setPage,
  setPerPage,
  setCurrentCard,
  setOrientation,
  setColor,
  setQuery,
  setIsScrolled,
  resetSelectedCard,
  setTags,
} = apiSlice.actions;
export default apiSlice.reducer;
