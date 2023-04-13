import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Watchable {
  id: string;
}

interface WatchableStatus {
  error?: boolean;
}

interface FormState {
  watchable: {
    [key: Watchable['id']]: WatchableStatus;
  };
}

const initialState: FormState = {
  watchable: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    unwatch: (state, { payload: id }: PayloadAction<Watchable['id']>) => {
      delete state.watchable[id];
    },
    errorWatchable: (
      state,
      { payload: id }: PayloadAction<Watchable['id']>,
    ) => {
      state.watchable[id] = {
        ...state.watchable[id],
        error: true,
      };
    },
    unErrorWatchable: (
      state,
      { payload: id }: PayloadAction<Watchable['id']>,
    ) => {
      state.watchable[id] = {
        ...state.watchable[id],
        error: false,
      };
    },
  },
});

export const useWatch = (id: Watchable['id']) =>
  useSelector((state: RootState) => state.form.watchable[id] || {});
export const formActions = formSlice.actions;
export const formReducer = formSlice.reducer;
export const formReducerPath = formSlice.name;
