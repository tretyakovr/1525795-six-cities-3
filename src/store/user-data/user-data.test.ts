import { APIActionState } from '../../const';
import { AuthStatus } from '../../const';
import { userData } from './user-data';
import { loginAction, checkAuthAction, logoutAction } from '../api-actions';

const mockInitialState = {
  loginActionState: APIActionState.IDLE,
  checkAuthActionState: APIActionState.IDLE,
  logoutActionState: APIActionState.IDLE,
  authStatus: AuthStatus.NoAuth,
  email: '',
  avatarUrl: '',
};

describe('user-data slice', () => {
  it('should return initialState with loginActionState = APIActionState.CALL when loginAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, loginActionState: APIActionState.CALL,};
    const result = userData.reducer(initialState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with loginActionState = APIActionState.ERROR when loginAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, loginActionState: APIActionState.ERROR,};
    const result = userData.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with user data logged in when loginAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const loginData = {email: 'user@example.com', password: '1q'};
    const userResponseData = {
      name: 'test user',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false,
      email: 'user@example.com',
      token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
    };
    const expectedState = {
      ...initialState,
      loginActionState: APIActionState.SUCCESS,
      authStatus: AuthStatus.Auth,
      email: 'user@example.com',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
    };
    const result = userData.reducer(initialState, loginAction.fulfilled(userResponseData, '', loginData));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with chackAuthActionState = APIActionState.CALL when checkAuthAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, checkAuthActionState: APIActionState.CALL, authStatus: AuthStatus.NoAuth, email: '', avatarUrl: ''};
    const result = userData.reducer(initialState, checkAuthAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with checkAuthActionState = APIActionState.ERROR when checkAuthAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, checkAuthActionState: APIActionState.ERROR, authStatus: AuthStatus.NoAuth};
    const result = userData.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with user data checked in when checkAuthAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const userResponseData = {
      name: 'test user',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false,
      email: 'user@example.com',
      token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
    };
    const expectedState = {
      ...initialState,
      checkAuthActionState: APIActionState.SUCCESS,
      authStatus: AuthStatus.Auth,
      email: 'user@example.com',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
    };
    const result = userData.reducer(initialState, checkAuthAction.fulfilled(userResponseData, '', undefined));

    expect(result).toEqual(expectedState);
  });




  it('should return initialState with logoutActionState = APIActionState.ERROR when logoutAction.rejected', () => {
    const initialState = {...mockInitialState, authStatus: AuthStatus.Auth, email: 'user@example.com', avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg'};
    const expectedState = {...initialState, logoutActionState: APIActionState.ERROR, authStatus: AuthStatus.NoAuth, email: '', avatarUrl: ''};
    const result = userData.reducer(initialState, logoutAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with no user logged in when logoutAction.fulfilled', () => {
    const initialState = {...mockInitialState, authStatus: AuthStatus.Auth, email: 'user@example.com', avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg'};
    const expectedState = {...initialState, logoutActionState: APIActionState.SUCCESS, authStatus: AuthStatus.NoAuth, email: '', avatarUrl: '',};
    const result = userData.reducer(initialState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });


});
