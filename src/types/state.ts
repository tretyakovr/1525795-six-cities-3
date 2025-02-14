// import { AuthStatus } from '../const.js';
import {store} from '../store/index.js';
// import { Offers } from './offers.js';
// import { SortTypes } from '../const.js';
// import { OfferDetail } from './offers.js';
// import { Comments } from './comments.js';


// export type OfferData = {
//   loadedOffers: Offers;
//   isDataLoading: boolean;
//   isLoadingError: boolean;
//   offer: OfferDetail | undefined;
//   offerFindError: boolean;
//   comments: Comments;
//   nearOffers: Offers;
//   favorites: Offers;
// }

// export type AppData = {
//   city: string;
//   sortType: SortTypes;
//   isDataLoading: boolean;
// }

// export type FavoriteData = {
//   favorites: Offers;
//   isDataLoading: boolean;
//   isLoadingError: boolean;
// }

// export type UserData = {
//   authStatus: AuthStatus;
//   email: string;
// }

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
