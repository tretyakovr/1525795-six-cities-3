import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {OfferDetail, Offers } from '../types/offers';
import { Comment, Comments } from '../types/comments';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../const';

type AuthData = {
  email: string | undefined;
  password: string | undefined;
}

type FavoriteData = {
  offerId: string;
  favoriteState: number;
}

type CommentData = {
  offerId: string;
  comment: string;
  rating: number;
}

type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export const sendCommentAction = createAsyncThunk<Comment, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/sendComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  },
);


export const getOfferDetailAction = createAsyncThunk<OfferDetail, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/getOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferDetail>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const getCommentsAction = createAsyncThunk<Comments, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/getComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);


export const getOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/getOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const getNearOffersAction = createAsyncThunk<Offers, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/getNearOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);


export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}: AuthData, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete<void>(APIRoute.Logout);
    dropToken();
  },
);


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);


export const markFavoriteAction = createAsyncThunk<OfferDetail, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/markFavorite',
  async ({offerId, favoriteState}, {extra: api}) => {
    const {data} = await api.post<OfferDetail>(`${APIRoute.Favorite}/${offerId}/${favoriteState}`);
    return data;
  },
);

export const getFavoritesAction = createAsyncThunk<Offers, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/getFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Favorite}`);
    return data;
  },
);
