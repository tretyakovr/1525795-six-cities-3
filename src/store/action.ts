import { createAction } from '@reduxjs/toolkit';
import { Offers, OfferDetail } from '../types/offers';
import { AuthStatus, AppRoute } from '../const';

export const changeLocation = createAction<string>('changeLocation');

export const changeSort = createAction<string, string>('changeSort');

export const loadOffers = createAction<Offers>('loadOffers');

export const saveOffer = createAction<OfferDetail>('saveOffer');

export const setLoadingStatus = createAction<boolean>('setLoadingStatus');

export const setAuthStatus = createAction<{authStatus: AuthStatus; email: string | undefined}>('setAuthStatus');

export const login = createAction<{authStatus: AuthStatus; email: string}>('login');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
