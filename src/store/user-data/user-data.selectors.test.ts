import { NameSpace } from '../../const';
import {
  getAuthActionState, getAuthStatus, getUserEmail, getAvatarUrl,
  getLoginActionState} from './selectors';
import { APIActionState } from '../../const';
import { AuthStatus } from '../../const';

describe('user-data selectors', () => {
  const state = {
    [NameSpace.User]: {
      loginActionState: APIActionState.Idle,
      checkAuthActionState: APIActionState.Idle,
      logoutActionState: APIActionState.Idle,
      authStatus: AuthStatus.NoAuth,
      email: '',
      avatarUrl: '',
    }
  };

  it('check getAuthActionState', () => {
    const authActionState = state[NameSpace.User].checkAuthActionState;
    const result = getAuthActionState(state);
    expect(result).toEqual(authActionState);
  });

  it('check getAuthStatus', () => {
    const authStatus = state[NameSpace.User].authStatus;
    const result = getAuthStatus(state);
    expect(result).toEqual(authStatus);
  });

  it('check getUserEmail', () => {
    const email = state[NameSpace.User].email;
    const result = getUserEmail(state);
    expect(result).toEqual(email);
  });

  it('check getAvatarUrl', () => {
    const avatarUrl = state[NameSpace.User].avatarUrl;
    const result = getAvatarUrl(state);
    expect(result).toEqual(avatarUrl);
  });

  it('check getLoginActionState', () => {
    const loginActionState = state[NameSpace.User].loginActionState;
    const result = getLoginActionState(state);
    expect(result).toEqual(loginActionState);
  });
});
