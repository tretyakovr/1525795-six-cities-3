import { APIActionState, AuthStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthActionState = (state: State): APIActionState => state[NameSpace.User].checkAuthActionState;
export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;
export const getUserEmail = (state: State): string => state[NameSpace.User].email;
export const getAvatarUrl = (state: State): string => state[NameSpace.User].avatarUrl;
export const getLoginActionState = (state: State): APIActionState => state[NameSpace.User].loginActionState;
