export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  Offer = '/offer',
  Page404 = '/error404',
}

export const URL_MARKER_DEFAULT = '/public/img/pin.svg';

export const URL_MARKER_CURRENT = '/public/img/pin-active.svg';


export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const DEFAULT_CITY = CITIES[0];

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
  Comments = '/comments',
}

export enum NameSpace {
  App = 'APP',
  Favorite = 'FAVORITES',
  Offer = 'OFFER',
  User = 'USER',
}

export enum APIActionState {
  IDLE = 'Idle',
  CALL = 'Call',
  SUCCESS = 'Success',
  ERROR = 'Error',
}
