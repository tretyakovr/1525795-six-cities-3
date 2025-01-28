import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {OfferDetail, Offers} from '../types/offers';
import {loadOffers, setLoadingStatus, changeLocation, setAuthStatus, redirectToRoute, saveOffer} from './action';
import {saveToken, dropToken} from '../services/token';
import {AppRoute, APIRoute} from '../const';
import { AuthStatus, DEFAULT_CITY } from '../const';


type AuthData = {
  email: string | undefined;
  password: string | undefined;
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
