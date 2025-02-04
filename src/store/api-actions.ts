import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {OfferDetail, Offers, Offer } from '../types/offers';
import { Comment, Comments } from '../types/comments';
import {loadOffers, setLoadingStatus, changeLocation, setAuthStatus, redirectToRoute, saveOffer, setAsyncOpState} from './action';
import { saveComments, saveNearOffers, saveFavorites, markFavorite, addComment, setResetFormState } from './action';
import {saveToken, dropToken} from '../services/token';
import {AppRoute, APIRoute} from '../const';
import { AuthStatus, DEFAULT_CITY } from '../const';

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
  id: number;
  email: string;
  token: string;
}

export const getOfferAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOffer',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferDetail>(`${APIRoute.Offers}/${offerId}`);
    dispatch(saveOffer(data));
  },
);


export const getNearOffersAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getNearOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(saveNearOffers(data.filter((item) => item.id !== offerId).slice(0, 3)));
  },
);


export const getFavoritesAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Favorite}`);
    dispatch(saveFavorites(data));
  },
);


export const getCommentsAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getComments',
  async (offerId, {dispatch, extra: api}) => {
    let {data} = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`);
    data = data.sort((review1, review2) => +new Date(review2.date) - +new Date(review1.date));
    dispatch(saveComments(data));
  },
);


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(changeLocation(DEFAULT_CITY));
    dispatch(setLoadingStatus(false));
  },
);


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(setAuthStatus({authStatus: AuthStatus.Auth, email}));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(setAuthStatus({authStatus: AuthStatus.NoAuth, email: undefined}));
    }
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthStatus({authStatus: AuthStatus.NoAuth, email: undefined}));
  },
);


export const markFavoriteAction = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'markFavorite',
  async ({offerId, favoriteState}, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${favoriteState}`);
    dispatch(markFavorite(data));
  },
);


export const sendCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'sendComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    dispatch(setAsyncOpState(true));
    await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {comment, rating})
      .then((response) => dispatch(addComment(response.data)))
      .then(() => dispatch(setAsyncOpState(false)))
      .then(() => dispatch(setResetFormState(true)))
      .catch(() => {
        throw new Error('Error send comment');
      });
  },
);
