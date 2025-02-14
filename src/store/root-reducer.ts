import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
// import { favoriteData } from './favorite-data/favorite-data';
import { userData } from './user-data/user-data';
import { appData } from './app-data/app-data';
import { offerData } from './offer-data/offer-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  // [NameSpace.Favorite]: favoriteData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.User]: userData.reducer,
});
