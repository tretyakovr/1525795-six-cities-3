export enum AuthStatus {
  Auth,
  NoAuth,
  Unknown,
}

export enum AppRoutes {
  FavoritesEmpty = '/favorites-empty',
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  MainEmpty = '/main-empty',
  Offer = '/offer',
  OfferNotLogged = '/offer-not-logged',
  Page404 = '/error404',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
