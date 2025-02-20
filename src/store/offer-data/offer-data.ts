import { createSlice } from '@reduxjs/toolkit';
import { Offers, OfferDetail } from '../../types/offers';
import { Comments } from '../../types/comments';
import { APIActionState, NameSpace } from '../../const';
import { getOffersAction, getFavoritesAction, getOfferDetailAction, getCommentsAction, getNearOffersAction, sendCommentAction, markFavoriteAction } from '../api-actions';
import {toast} from 'react-toastify';


type OfferData = {
  loadedOffers: Offers;
  offersActionState: APIActionState;
  offer: OfferDetail | undefined;
  offerDetailActionState: APIActionState;
  comments: Comments;
  commentsActionState: APIActionState;
  isResetFeedback: boolean;
  nearOffers: Offers;
  nearOffersActionState: APIActionState;
  favorites: Offers;
  favoritesActionState: APIActionState;
  sendCommentActionState: APIActionState;
  markFavoriteActionState: APIActionState;
}

const initialState: OfferData = {
  loadedOffers: [],
  offersActionState: APIActionState.Idle,
  offer: undefined,
  offerDetailActionState: APIActionState.Idle,
  comments: [],
  commentsActionState: APIActionState.Idle,
  isResetFeedback: false,
  nearOffers: [],
  nearOffersActionState: APIActionState.Idle,
  favorites: [],
  favoritesActionState: APIActionState.Idle,
  sendCommentActionState: APIActionState.Idle,
  markFavoriteActionState: APIActionState.Idle,
};


export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    resetOfferDetail: (state) => {
      state.offer = undefined;
      state.offerDetailActionState = APIActionState.Idle;
      state.comments = [];
      state.commentsActionState = APIActionState.Idle;
      state.nearOffers = [];
      state.nearOffersActionState = APIActionState.Idle;
    },
    resetFeedbackState: (state) => {
      state.sendCommentActionState = APIActionState.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.offersActionState = APIActionState.Call;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offersActionState = APIActionState.Success;
        state.loadedOffers = action.payload;
      })
      .addCase(getOffersAction.rejected, (state) => {
        toast.error('Error get offers!');
        state.offersActionState = APIActionState.Error;
        state.loadedOffers = [];
      })
      .addCase(getCommentsAction.pending, (state) => {
        state.commentsActionState = APIActionState.Call;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.commentsActionState = APIActionState.Success;
        state.comments = action.payload;
      })
      .addCase(getCommentsAction.rejected, (state) => {
        toast.error('Error get comments!');
        state.commentsActionState = APIActionState.Error;
        state.comments = [];
      })
      .addCase(getFavoritesAction.pending, (state) => {
        state.favoritesActionState = APIActionState.Call;
      })
      .addCase(getFavoritesAction.fulfilled, (state, action) => {
        state.favoritesActionState = APIActionState.Success;
        state.favorites = action.payload;
      })
      .addCase(getFavoritesAction.rejected, (state) => {
        toast.error('Error get favorites!');
        state.favoritesActionState = APIActionState.Error;
        state.favorites = [];
      })
      .addCase(getOfferDetailAction.pending, (state) => {
        state.offerDetailActionState = APIActionState.Call;
      })
      .addCase(getOfferDetailAction.fulfilled, (state, action) => {
        state.offerDetailActionState = APIActionState.Success;
        state.offer = action.payload;
      })
      .addCase(getOfferDetailAction.rejected, (state) => {
        toast.error('Error get offer detail!');
        state.offerDetailActionState = APIActionState.Error;
        state.offer = undefined;
      })
      .addCase(getNearOffersAction.pending, (state) => {
        state.nearOffersActionState = APIActionState.Call;
      })
      .addCase(getNearOffersAction.fulfilled, (state, action) => {
        state.nearOffersActionState = APIActionState.Success;
        state.nearOffers = action.payload;
      })
      .addCase(getNearOffersAction.rejected, (state) => {
        toast.error('Error get near offers!');
        state.nearOffersActionState = APIActionState.Error;
        state.nearOffers = [];
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.sendCommentActionState = APIActionState.Call;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.sendCommentActionState = APIActionState.Success;
        state.comments.push(action.payload);
        state.isResetFeedback = true;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        toast.error('Error send comment!');
        state.sendCommentActionState = APIActionState.Error;
      })

      .addCase(markFavoriteAction.pending, (state) => {
        state.markFavoriteActionState = APIActionState.Call;
      })
      .addCase(markFavoriteAction.fulfilled, (state, action) => {
        state.markFavoriteActionState = APIActionState.Success;
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

        // Если изменили признак у оффера...
        // Обновить state.offer, если он совпадает
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer = action.payload;
        }
      })
      .addCase(markFavoriteAction.rejected, (state) => {
        toast.warn('Error toggle favorite!');
        state.markFavoriteActionState = APIActionState.Error;
      });

  },
});

export const {resetOfferDetail, resetFeedbackState} = offerData.actions;
