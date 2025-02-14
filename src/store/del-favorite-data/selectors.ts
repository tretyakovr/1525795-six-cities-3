import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offers } from '../../types/offers';


export const getFavorites = (state: State): Offers => state[NameSpace.Favorite].favorites;
export const getFavoritesLoadingStatus = (state: State) => state[NameSpace.Favorite].isDataLoading;
export const getFavoritesErrorStatus = (state: State) => state[NameSpace.Favorite].isLoadingError;
