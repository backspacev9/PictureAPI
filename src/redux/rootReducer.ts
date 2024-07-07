import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { store } from '../App';
import apiSlice from './reducers/apiSlice';

import searchSlice from './reducers/searchSlice';
// export interface GlobalState {
//   api: ApiState;
//   search: string;
// }

export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

export const rootReducer = combineReducers({
  apiSlice,
  searchSlice,
});
