export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  FavoritesEmpty = '/favorites-empty',
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  MainEmpty = '/main-empty',
  Offer = '/offer',
  OfferNotLogged = '/offer-not-logged',
  Page404 = '/error404',
}

export const URL_MARKER_DEFAULT = '/public/img/pin.svg';

export const URL_MARKER_CURRENT = '/public/img/pin-active.svg';


export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const DEFAULT_CITY = cities[0];

export enum SortTypes {
  POPULAR = 'Popular',
  LOWTOHIGH = 'Price: low to high',
  HIGHTOLOW = 'Price: high to low',
  TOPRATED = 'Top rated first',
}


export enum APIRoute {
  Main = '/',
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
}
