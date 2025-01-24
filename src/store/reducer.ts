import { createReducer } from '@reduxjs/toolkit';
import { getCityOffers } from '../utils';
import { changeLocation, changeSort, setLoadingStatus, loadOffers, setAuthStatus } from './action';
import { SortTypes } from '../const';
import { Offers } from '../types/offers';
import { AuthStatus } from '../const';


type InitialStateType = {
  cities: string[];
  city: string;
  loadedOffers: Offers;
  offers: Offers;
  sortType: SortTypes;
  isDataLoading: boolean;
  authStatus: AuthStatus;
  email: string | undefined;
  favorites: Offers;
}

const initialState: InitialStateType = {
  cities: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
  city: '',
  loadedOffers: [],
  offers: [],
  sortType: SortTypes.POPULAR,
  isDataLoading: false,
  authStatus: AuthStatus.NoAuth,
  email: '',
  favorites: [],
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      state.city = action.payload;
      state.offers = getCityOffers(state.loadedOffers, action.payload, state.sortType);
    })
    .addCase(changeSort, (state, action) => {
      state.sortType = action.payload as SortTypes;
      state.offers = getCityOffers(state.loadedOffers, state.city, action.payload as SortTypes);
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.loadedOffers = action.payload;
      state.offers = getCityOffers(state.loadedOffers, state.city, state.sortType);
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload.authStatus;
      state.email = action.payload.email;
    });
});

export {reducer};
