import { createSlice } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
// import { Offers } from '../../types/offers';
import { NameSpace } from '../../const';
import { getOffersAction } from '../api-actions';


const initialState: OfferData = {
  loadedOffers: [],
  isDataLoading: false,
  isLoadingError: false,
  offer: undefined,
  offerFindError: false,
  comments: [],
  nearOffers: [],
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isDataLoading = true;
        state.isLoadingError = false;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.isLoadingError = false;
        state.loadedOffers = action.payload;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isLoadingError = true;
        state.loadedOffers = [];
      });
  },
});
