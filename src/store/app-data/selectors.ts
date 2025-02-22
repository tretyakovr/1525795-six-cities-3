import { State } from '../../types/state';
import { NameSpace, SortType } from '../../const';

export const getCity = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].city;
export const getSortType = (state: Pick<State, NameSpace.App>): SortType => state[NameSpace.App].sortType;
export const getErrorMessage = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].errorMessage;
