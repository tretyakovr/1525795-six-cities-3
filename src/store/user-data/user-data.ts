import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { APIActionState } from '../../const';
import {toast} from 'react-toastify';

type UserData = {
  loginActionState: APIActionState;
  checkAuthActionState: APIActionState;
  logoutActionState: APIActionState;
  authStatus: AuthStatus;
  email: string;
  avatarUrl: string;
}

const initialState: UserData = {
  loginActionState: APIActionState.Idle,
  checkAuthActionState: APIActionState.Idle,
  logoutActionState: APIActionState.Idle,
  authStatus: AuthStatus.NoAuth,
  email: '',
  avatarUrl: '',
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, ((state) => {
        state.loginActionState = APIActionState.Call;
      }))
      .addCase(loginAction.fulfilled, ((state, action) => {
        state.loginActionState = APIActionState.Success;
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(loginAction.rejected, ((state) => {
        toast.error('Error login!');
        state.loginActionState = APIActionState.Error;
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(checkAuthAction.pending, ((state) => {
        state.checkAuthActionState = APIActionState.Call;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }))
      .addCase(checkAuthAction.fulfilled, ((state, action) => {
        state.checkAuthActionState = APIActionState.Success;
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(checkAuthAction.rejected, ((state) => {
        state.checkAuthActionState = APIActionState.Error;
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(logoutAction.fulfilled, ((state) => {
        state.loginActionState = APIActionState.Idle;
        state.logoutActionState = APIActionState.Success;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }))
      .addCase(logoutAction.rejected, ((state) => {
        toast.error('Error logout!');
        state.logoutActionState = APIActionState.Error;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }));
  },
});
