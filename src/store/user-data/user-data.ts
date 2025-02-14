import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

type UserData = {
  authStatus: AuthStatus;
  email: string;
  avatarUrl: string;
}

const initialState: UserData = {
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
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(loginAction.rejected, ((state) => {
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(checkAuthAction.fulfilled, ((state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.email = action.payload.email;
        state.avatarUrl = action.payload.avatarUrl;
      }))
      .addCase(checkAuthAction.rejected, ((state) => {
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(logoutAction.fulfilled, ((state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.email = '';
        state.avatarUrl = '';
      }));
  },
});
