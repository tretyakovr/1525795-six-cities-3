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
  loginActionState: APIActionState.IDLE,
  checkAuthActionState: APIActionState.IDLE,
  logoutActionState: APIActionState.IDLE,
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
        state.loginActionState = APIActionState.CALL;
      }))
      .addCase(loginAction.fulfilled, ((state, action) => {
        state.loginActionState = APIActionState.SUCCESS;
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(loginAction.rejected, ((state) => {
        toast.error('Error login!');
        state.loginActionState = APIActionState.ERROR;
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(checkAuthAction.pending, ((state) => {
        state.checkAuthActionState = APIActionState.CALL;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }))
      .addCase(checkAuthAction.fulfilled, ((state, action) => {
        state.checkAuthActionState = APIActionState.SUCCESS;
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(checkAuthAction.rejected, ((state) => {
        state.checkAuthActionState = APIActionState.ERROR;
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(logoutAction.fulfilled, ((state) => {
        state.loginActionState = APIActionState.IDLE;
        state.logoutActionState = APIActionState.SUCCESS;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }))
      .addCase(logoutAction.rejected, ((state) => {
        toast.error('Error logout!');
        state.logoutActionState = APIActionState.ERROR;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }));
  },
});
