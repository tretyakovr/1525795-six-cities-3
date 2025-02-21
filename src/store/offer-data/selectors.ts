import { State } from '../../types/state';
import { APIActionState, NameSpace } from '../../const';
import { Offers, OfferDetail } from '../../types/offers';
import { Comments } from '../../types/comments';

export const getLoadedOffers = (state: Pick<State, NameSpace.Offer>): Offers => state[NameSpace.Offer].loadedOffers;
export const getFavorites = (state: Pick<State, NameSpace.Offer>): Offers => state[NameSpace.Offer].favorites;
export const getOfferDetail = (state: Pick<State, NameSpace.Offer>): OfferDetail | undefined => state[NameSpace.Offer].offer;
export const getComments = (state: Pick<State, NameSpace.Offer>): Comments => state[NameSpace.Offer].comments;
export const getNearOffers = (state: Pick<State, NameSpace.Offer>): Offers => state[NameSpace.Offer].nearOffers;

export const getFavoritesActionState = (state: Pick<State, NameSpace.Offer>): APIActionState => state[NameSpace.Offer].favoritesActionState;
export const getOffersActionState = (state: Pick<State, NameSpace.Offer>): APIActionState => state[NameSpace.Offer].offersActionState;
export const getOfferDetailActionState = (state: Pick<State, NameSpace.Offer>): APIActionState =>state[NameSpace.Offer].offerDetailActionState;
export const getNearOffersActionState = (state: Pick<State, NameSpace.Offer>): APIActionState => state[NameSpace.Offer].nearOffersActionState;
export const getCommentsActionState = (state: Pick<State, NameSpace.Offer>): APIActionState => state[NameSpace.Offer].commentsActionState;
export const getSendCommentActionState = (state: Pick<State, NameSpace.Offer>): APIActionState => state[NameSpace.Offer].sendCommentActionState;
