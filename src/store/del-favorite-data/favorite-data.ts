import { createSlice } from '@reduxjs/toolkit';
import { FavoriteData } from '../../types/state';
import { NameSpace } from '../../const';
import { getFavoritesAction } from '../api-actions';

const initialState: FavoriteData = {
  favorites: [],
  isDataLoading: false,
  isLoadingError: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavoritesAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(getFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isDataLoading = false;
        state.isLoadingError = false;
      })
      .addCase(getFavoritesAction.rejected, (state) => {
        state.favorites = [];
        state.isDataLoading = false;
        state.isLoadingError = true;
      });
  }
});
