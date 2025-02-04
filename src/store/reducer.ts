import { createReducer } from '@reduxjs/toolkit';
import { changeLocation, changeSort, setLoadingStatus, loadOffers, setAuthStatus, saveOffer } from './action';
import { saveComments, saveNearOffers, saveFavorites, markFavorite, addComment, setAsyncOpState, setAsyncErrorState } from './action';
import { setResetFormState } from './action';
import { SortTypes } from '../const';
import { OfferDetail, Offers } from '../types/offers';
import { Comment } from '../types/comments';
import { AuthStatus } from '../const';


type InitialStateType = {
  city: string;
  loadedOffers: Offers;
  sortType: SortTypes;
  isDataLoading: boolean;
  authStatus: AuthStatus;
  email: string | undefined;
  favorites: Offers;
  offer: OfferDetail | undefined;
  comments: Comment[];
  nearOffers: Offers;
  isAsyncOp: boolean;
  isAsyncError: boolean;
  isResetForm: boolean;
}

const initialState: InitialStateType = {
  city: '',
  loadedOffers: [],
  sortType: SortTypes.POPULAR,
  isDataLoading: false,
  authStatus: AuthStatus.NoAuth,
  email: undefined,
  favorites: [],
  offer: undefined,
  comments: [],
  nearOffers: [],
  isAsyncOp: false,
  isAsyncError: false,
  isResetForm: false,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortType = action.payload as SortTypes;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.loadedOffers = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload.authStatus;
      state.email = action.payload.email;
    })
    .addCase(saveOffer, (state, action)=> {
      state.offer = action.payload;
    })
    .addCase(saveComments, (state, action)=> {
      state.comments = action.payload;
    })
    .addCase(saveNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(saveFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setAsyncOpState, (state, action) => {
      state.isAsyncOp = action.payload;
    })
    .addCase(setAsyncErrorState, (state, action) => {
      state.isAsyncError = action.payload;
    })
    .addCase(setResetFormState, (state, action) => {
      state.isResetForm = action.payload;
    })
    .addCase(markFavorite, (state, action) => {
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
    })
    .addCase(addComment, (state, action) => {
      state.comments.push(action.payload);
    });
});

export {reducer};
