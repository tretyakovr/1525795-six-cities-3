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

export enum IconMarker {
  Default = '/public/img/pin.svg',
  Current = '/public/img/pin-active.svg',
}

export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const DEFAULT_CITY = cities[0];

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
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
  Idle = 'Idle',
  Call = 'Call',
  Success = 'Success',
  Error = 'Error',
}
