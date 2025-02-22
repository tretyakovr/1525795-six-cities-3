import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SortType } from '../../const';
import { DEFAULT_CITY } from '../../const';


type AppData = {
  city: string;
  sortType: SortType;
  errorMessage: string;
}

const initialState: AppData = {
  city: DEFAULT_CITY,
  sortType: SortType.Popular,
  errorMessage: '',
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.city = action.payload as string;
    },
    changeSort: (state, action) => {
      state.sortType = action.payload as SortType;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload as string;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = '';
    }
  },
});

export const {changeLocation, changeSort, setErrorMessage, clearErrorMessage} = appData.actions;
