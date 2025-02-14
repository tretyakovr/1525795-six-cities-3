import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userData } from './user-data/user-data';
import { appData } from './app-data/app-data';
import { offerData } from './offer-data/offer-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.User]: userData.reducer,
});
