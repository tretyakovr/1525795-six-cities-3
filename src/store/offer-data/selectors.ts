import { State } from '../../types/state';
import { APIActionState, NameSpace } from '../../const';
import { Offers, OfferDetail } from '../../types/offers';
import { Comments } from '../../types/comments';

export const getLoadedOffers = (state: State): Offers => state[NameSpace.Offer].loadedOffers;
export const getFavorites = (state: State): Offers => state[NameSpace.Offer].favorites;
export const getOfferDetail = (state: State): OfferDetail | undefined => state[NameSpace.Offer].offer;
export const getComments = (state: State): Comments => state[NameSpace.Offer].comments;
export const getNearOffers = (state: State): Offers => state[NameSpace.Offer].nearOffers;
export const getIsResetFeedback = (state: State): boolean => state[NameSpace.Offer].isResetFeedback;

export const getOffersActionState = (state: State): APIActionState => state[NameSpace.Offer].offersActionState;
export const getOfferDetailActionState = (state: State): APIActionState =>state[NameSpace.Offer].offerDetailActionState;
export const getNearOffersActionState = (state: State): APIActionState => state[NameSpace.Offer].nearOffersActionState;
export const getCommentsActionState = (state: State): APIActionState => state[NameSpace.Offer].commentsActionState;
