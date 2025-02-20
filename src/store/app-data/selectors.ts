import { State } from '../../types/state';
import { NameSpace, SortType } from '../../const';

export const getCity = (state: State): string => state[NameSpace.App].city;
export const getSortType = (state: State): SortType => state[NameSpace.App].sortType;
export const getErrorMessage = (state: State): string => state[NameSpace.App].errorMessage;
