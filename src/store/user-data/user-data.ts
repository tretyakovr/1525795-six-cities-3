import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/state';
import { AuthStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserData = {
  authStatus: AuthStatus.NoAuth,
  email: '',
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, ((state) => {
        state.authStatus = AuthStatus.Auth;
      }))
      .addCase(loginAction.rejected, ((state) => {
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(checkAuthAction.fulfilled, ((state) => {
        state.authStatus = AuthStatus.Auth;
      }))
      .addCase(checkAuthAction.rejected, ((state) => {
        state.authStatus = AuthStatus.NoAuth;
      }))
      .addCase(logoutAction.fulfilled, ((state) => {
        state.authStatus = AuthStatus.NoAuth;
      }));
  },
});
