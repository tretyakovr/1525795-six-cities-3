import { createReducer } from '@reduxjs/toolkit';
import { changeLocation, changeSort, setLoadingStatus, loadOffers, setAuthStatus, saveOffer } from './action';
import { SortTypes } from '../const';
import { OfferDetail, Offers } from '../types/offers';
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
    });
});

export {reducer};
