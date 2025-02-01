import { createAction } from '@reduxjs/toolkit';
import { Offer, Offers, OfferDetail } from '../types/offers';
import { AuthStatus, AppRoute } from '../const';
import { Comment, Comments } from '../types/comments';

export const changeLocation = createAction<string>('changeLocation');

export const changeSort = createAction<string, string>('changeSort');

export const loadOffers = createAction<Offers>('loadOffers');

export const saveComments = createAction<Comments>('saveComments');

export const saveNearOffers = createAction<Offers>('saveNearOffers');

export const saveFavorites = createAction<Offers>('saveFavorites');

export const saveOffer = createAction<OfferDetail>('saveOffer');

export const setLoadingStatus = createAction<boolean>('setLoadingStatus');

export const setAuthStatus = createAction<{authStatus: AuthStatus; email: string | undefined}>('setAuthStatus');

export const login = createAction<{authStatus: AuthStatus; email: string}>('login');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const markFavorite = createAction<Offer>('markFavorite');

export const addComment = createAction<Comment>('addComment');
