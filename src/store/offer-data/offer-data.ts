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
  offersActionState: APIActionState.IDLE,
  offer: undefined,
  offerDetailActionState: APIActionState.IDLE,
  comments: [],
  commentsActionState: APIActionState.IDLE,
  isResetFeedback: false,
  nearOffers: [],
  nearOffersActionState: APIActionState.IDLE,
  favorites: [],
  favoritesActionState: APIActionState.IDLE,
  sendCommentActionState: APIActionState.IDLE,
  markFavoriteActionState: APIActionState.IDLE,
};


export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    resetOfferDetail: (state) => {
      state.offer = undefined;
      state.offerDetailActionState = APIActionState.IDLE;
      state.comments = [];
      state.commentsActionState = APIActionState.IDLE;
      state.nearOffers = [];
      state.nearOffersActionState = APIActionState.IDLE;
    },
    resetFeedbackState: (state) => {
      state.sendCommentActionState = APIActionState.IDLE;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offersActionState = APIActionState.SUCCESS;
        state.loadedOffers = action.payload;
      })
      .addCase(getOffersAction.rejected, (state) => {
        toast.error('Error get offers!');
        state.offersActionState = APIActionState.ERROR;
        state.loadedOffers = [];
      })
      .addCase(getCommentsAction.pending, (state) => {
        state.commentsActionState = APIActionState.CALL;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.commentsActionState = APIActionState.SUCCESS;
        state.comments = action.payload;
      })
      .addCase(getCommentsAction.rejected, (state) => {
        toast.error('Error get comments!');
        state.commentsActionState = APIActionState.ERROR;
        state.comments = [];
      })
      .addCase(getFavoritesAction.pending, (state) => {
        state.favoritesActionState = APIActionState.CALL;
      })
      .addCase(getFavoritesAction.fulfilled, (state, action) => {
        state.favoritesActionState = APIActionState.SUCCESS;
        state.favorites = action.payload;
      })
      .addCase(getFavoritesAction.rejected, (state) => {
        toast.error('Error get favorites!');
        state.favoritesActionState = APIActionState.ERROR;
        state.favorites = [];
      })
      .addCase(getOfferDetailAction.pending, (state) => {
        state.offerDetailActionState = APIActionState.CALL;
      })
      .addCase(getOfferDetailAction.fulfilled, (state, action) => {
        state.offerDetailActionState = APIActionState.SUCCESS;
        state.offer = action.payload;
      })
      .addCase(getOfferDetailAction.rejected, (state) => {
        toast.error('Error get offer detail!');
        state.offerDetailActionState = APIActionState.ERROR;
        state.offer = undefined;
      })
      .addCase(getNearOffersAction.pending, (state) => {
        state.nearOffersActionState = APIActionState.CALL;
      })
      .addCase(getNearOffersAction.fulfilled, (state, action) => {
        state.nearOffersActionState = APIActionState.SUCCESS;
        state.nearOffers = action.payload;
      })
      .addCase(getNearOffersAction.rejected, (state) => {
        toast.error('Error get near offers!');
        state.nearOffersActionState = APIActionState.ERROR;
        state.nearOffers = [];
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.sendCommentActionState = APIActionState.IDLE;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.sendCommentActionState = APIActionState.SUCCESS;
        state.comments.push(action.payload);
        state.isResetFeedback = true;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        toast.error('Error send comment!');
        state.sendCommentActionState = APIActionState.ERROR;
      })

      .addCase(markFavoriteAction.pending, (state) => {
        state.markFavoriteActionState = APIActionState.CALL;
      })
      .addCase(markFavoriteAction.fulfilled, (state, action) => {
        state.markFavoriteActionState = APIActionState.SUCCESS;
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
        state.markFavoriteActionState = APIActionState.ERROR;
      });

  },
});

export const {resetOfferDetail, resetFeedbackState} = offerData.actions;
