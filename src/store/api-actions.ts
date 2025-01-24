import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offers} from '../types/offers';
// import {loadQuestions, requireAuthorization, setQuestionsDataLoadingStatus, redirectToRoute} from './action';
import {loadOffers, setLoadingStatus, changeLocation, setAuthStatus, redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../const';
// import {AuthData} from '../types/auth-data';
// import {UserData} from '../types/user-data';
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
      dispatch(redirectToRoute(APIRoute.Main));
    } catch {
      dispatch(setAuthStatus({authStatus: AuthStatus.NoAuth, email}));
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
