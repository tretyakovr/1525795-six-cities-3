import { State } from '../../types/state';
import { NameSpace, SortTypes } from '../../const';

export const getCity = (state: State): string => state[NameSpace.App].city;
export const getSortType = (state: State): SortTypes => state[NameSpace.App].sortType;
export const getErrorMessage = (state: State): string => state[NameSpace.App].errorMessage;
