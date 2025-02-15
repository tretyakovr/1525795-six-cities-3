import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { APIActionState } from '../../const';

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
      .addCase(loginAction.fulfilled, ((state, action) => {
        state.loginActionState = APIActionState.SUCCESS;
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(loginAction.rejected, ((state) => {
        state.loginActionState = APIActionState.ERROR;
        state.authStatus = AuthStatus.NoAuth;
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
        state.logoutActionState = APIActionState.SUCCESS;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }))
      .addCase(logoutAction.rejected, ((state) => {
        state.logoutActionState = APIActionState.ERROR;
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }));
  },
});
