import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comments';

const initialState: OfferData = {
  loadedOffers: [],
  isDataLoading: false,
  isLoadingError: false,
  offer: undefined,
  offerFindError: false,
  comments: [],
  nearOffers: [],
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{comment: Comment}>) => {
      state.comments.push(action.payload);
    },
    markFavorite: (state, action) => {
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

    }
  }
});

export const {addComment} = offerProcess.actions;
