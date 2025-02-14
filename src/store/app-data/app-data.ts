import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SortTypes } from '../../const';
import { DEFAULT_CITY } from '../../const';


type AppData = {
  city: string;
  sortType: SortTypes;
  isDataLoading: boolean;
}

const initialState: AppData = {
  city: DEFAULT_CITY,
  sortType: SortTypes.POPULAR,
  isDataLoading: false,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.city = action.payload as string;
    },
    changeSort: (state, action) => {
      state.sortType = action.payload as SortTypes;
    },
    changeLoadingStatus: (state, action) => {
      state.isDataLoading = action.payload as boolean;
    }
  },
});

export const {changeLocation, changeSort, changeLoadingStatus} = appData.actions;
