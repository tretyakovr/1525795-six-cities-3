import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { FavoriteData } from '../../types/state';


const initialState: FavoriteData = {
  favorites: [];
  isDataLoading: false;
  isLoadingError: false;
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {

    saveFavorites: (state, action: PayloadAction<{offers: Offer[]}>) => {
      state.favorites = action.payload;
    },
    markFavorite: (state, action: PayloadAction<{offer: Offer}>) => {
      // Заменить оффер в state.loadedOffers
      let index: number = state.loadedOffers.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.loadedOffers = [...state.loadedOffers.slice(0, index), action.payload, ...state.loadedOffers.slice(index + 1)];
      }

      // Привести в актуальное состояние state.favorites
      index = state.favorites.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = [...state.favorites.slice(0, index), ...state.favorites.slice(index + 1)];
      }
    },
  },
});

export const {saveFavorites, markFavorite} = favoriteProcess.actions;
