import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootReducerType } from './redux/rootReducer';

// const idApi = 'gEWGMIEaFa1U4p2qkd-WX1MAl96X3v8b48NTf0Axj1g';
// const idApi2 = 'gEWGMIEaFa1U4p2qkd-WX1MAl96X3v8b48NTf0Axj1g';
const idApi = 'Bo0isjM8IGvEvIk7TFeRl6WeJIRvCRg3mB0aFtoD6fLLqlyAJblFwbcr';

// const baseUrl = 'https://api.unsplash.com/search/photos/';
export const baseUrl = 'https://api.pexels.com/v1/search';
export const baseUrlId = 'https://api.pexels.com/v1/photos/';

export interface ErrorApi {
  errors: [];
}
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Authorization', idApi);

export const fetchData = createAsyncThunk('api/fetchImage', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootReducerType;
  const query: string = state.apiSlice.query;

  const response = await fetch(`${query}`, {
    headers: requestHeaders,
  });
  const data = await response.json();

  return data;
});

export const fetchDataById = createAsyncThunk(
  'api/fetchImageById',
  async (id: string, thunkApi) => {
    const response = await fetch(`${baseUrlId}/${id}`, {
      headers: requestHeaders,
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return thunkApi.rejectWithValue(true);
    }
  }
);
