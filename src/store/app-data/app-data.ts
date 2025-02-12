import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { NameSpace } from '../../const';
import { SortTypes } from '../../const';
import { DEFAULT_CITY } from '../../const';

const initialState: AppData = {
  city: DEFAULT_CITY,
  // loadedOffers: [],
  sortType: SortTypes.POPULAR,
  isDataLoading: false,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.city = action.payload;
    },
    changeSort: (state, action) => {
      state.sortType = action.payload;
    }
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(changeLocation, (state, action) => {
  //       state.city = action.payload;
  //     });
  // }
});

export const {changeLocation, changeSort} = appData.actions;
