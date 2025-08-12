import { createSlice } from '@reduxjs/toolkit';
import { pathOr } from 'ramda';

// types
import { TInitialState, TAction } from '../types/types';

export const initialState: TInitialState = {
  history: [],
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    resetAll: (): TInitialState => initialState,
    resetHistory: (state: TInitialState): void => {
      state.history = [];
    },
    setHistory: (state: TInitialState, action: TAction): void => {
      const payload: string = pathOr('', ['payload'], action);
      if (!state.history.includes(payload)) {
        state.history.push(payload);
      }
    },
  },
});

export default slice.reducer;

export const setHistory = (payload: string) => ({
  type: 'app/setHistory',
  payload,
});

export const resetHistory = (payload: string) => ({
  type: 'app/resetHistory',
  payload,
});
