import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comments';
import { markFavoriteAction } from '../api-actions';
import { OfferDetail } from '../../types/offers';
import { Offer } from '../../types/offers';
import { toast } from 'react-toastify';

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
      // const {offerId, favoriteStatus} = action.payload;
      try {
        const response = markFavoriteAction(action.payload);

        // // Заменить оффер в state.loadedOffers
        // let index: number = state.loadedOffers.findIndex((item) => item.id === response.data.id);
        // if (index !== -1) {
        //   state.loadedOffers = [...state.loadedOffers.slice(0, index), result, ...state.loadedOffers.slice(index + 1)];
        // }

        // // Привести в актуальное состояние state.favorites
        // index = state.favorites.findIndex((item) => item.id === action.payload.id);
        // if (index === -1) {
        //   state.favorites.push(result);
        // } else {
        //   state.favorites = [...state.favorites.slice(0, index), ...state.favorites.slice(index + 1)];
        // }
      } catch (err) {
        //
      }

    }
  }
});

export const {addComment, markFavorite} = offerProcess.actions;
