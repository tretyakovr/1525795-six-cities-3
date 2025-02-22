import { APIActionState, AuthStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthActionState = (state: Pick<State, NameSpace.User>): APIActionState => state[NameSpace.User].checkAuthActionState;
export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthStatus => state[NameSpace.User].authStatus;
export const getUserEmail = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].email;
export const getAvatarUrl = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].avatarUrl;
export const getLoginActionState = (state: Pick<State, NameSpace.User>): APIActionState => state[NameSpace.User].loginActionState;
