import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';

export const isDataLoading = (state: State): boolean => state[NameSpace.Offer].isDataLoading;
export const isLoadingError = (state: State): boolean => state[NameSpace.Offer].isLoadingError;
export const getLoadedOffers = (state: State): Offers => state[NameSpace.Offer].loadedOffers;
