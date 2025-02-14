import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers, OfferDetail } from '../../types/offers';
import { Comments } from '../../types/comments';
// import { OfferData } from '../../types/state';
// import { Offers } from '../../types/offers';
import { NameSpace } from '../../const';
import { getOffersAction, getFavoritesAction, getOfferDetailAction, getCommentsAction, getNearOffersAction, sendCommentAction, markFavoriteAction } from '../api-actions';
import { Comment } from '../../types/comments';


type OfferData = {
  isOffersLoading: boolean;
  loadedOffers: Offers;
  isDataLoading: boolean;
  isLoadingError: boolean;
  offer: OfferDetail | undefined;
  offerSearchError: boolean;
  comments: Comments;
  nearOffers: Offers;
  favorites: Offers;
}


const initialState: OfferData = {
  isOffersLoading: false,
  loadedOffers: [],
  isDataLoading: false,
  isLoadingError: false,
  offer: undefined,
  offerSearchError: false,
  comments: [],
  nearOffers: [],
  favorites: [],
};

// const markFavoriteAction = (state, action) => {
//   // Заменить оффер в state.loadedOffers
//   let index: number = state.loadedOffers.findIndex((item) => item.id === action.payload.id);
//   if (index !== -1) {
//     state.loadedOffers = [...state.loadedOffers.slice(0, index), action.payload, ...state.loadedOffers.slice(index + 1)];
//   }

//   // Привести в актуальное состояние state.favorites
//   index = state.favorites.findIndex((item) => item.id === action.payload.id);
//   if (index === -1) {
//     state.favorites.push(action.payload);
//   } else {
//     state.favorites = [...state.favorites.slice(0, index), ...state.favorites.slice(index + 1)];
//   }
// };


export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    // addComment: (state, action: PayloadAction<{comment: Comment}>) => {
    //   state.comments.push(action.payload);
    // },
    // markFavorite: markFavoriteAction,

  },
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.isLoadingError = false;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.isLoadingError = false;
        state.loadedOffers = action.payload;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.isLoadingError = true;
        state.loadedOffers = [];
      })
      .addCase(getCommentsAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.isLoadingError = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isLoadingError = true;
        state.comments = [];
      })
      .addCase(getFavoritesAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(getFavoritesAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.isLoadingError = false;

        state.favorites = action.payload;
        // state.favorites = response.data;
      })
      .addCase(getFavoritesAction.rejected, (state) => {
        state.favorites = [];
        state.isDataLoading = false;
        state.isLoadingError = true;
      })
      .addCase(getOfferDetailAction.pending, (state) => {
        state.isDataLoading = true;
        state.offerSearchError = false;
      })
      .addCase(getOfferDetailAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.offerSearchError = false;
        state.offer = action.payload;
      })
      .addCase(getOfferDetailAction.rejected, (state) => {
        state.isDataLoading = false;
        state.offerSearchError = true;
        state.offer = undefined;
      })
      .addCase(getNearOffersAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(getNearOffersAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.isLoadingError = false;
        state.nearOffers = action.payload;
      })
      .addCase(getNearOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isLoadingError = true;
        state.nearOffers = [];
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.isLoadingError = false;
        state.comments.push(action.payload);
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isLoadingError = true;
        state.nearOffers = [];
      })

      .addCase(markFavoriteAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(markFavoriteAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.isLoadingError = false;
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

        // Если изменили признак у оффера, котр
        // Обновить state.offer, если он совпадает
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer = action.payload;
        }
      })
      .addCase(markFavoriteAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isLoadingError = true;
      });

  },
});
