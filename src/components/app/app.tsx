import Main from '../../pages/main/main';
import MainEmpty from '../../pages/main/main-empty';
import Favorites from '../../pages/favorites/favorites';
import FavoritesEmpty from '../../pages/favorites/favorites-empty';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offers';
import OfferNotLogged from '../../pages/offer/offer-not-logged';


type AppProps = {
  offersCount: number;
}

const Pages = {
  FavoritesEmpty: FavoritesEmpty,
  Favorites: Favorites,
  Login: Login,
  Main: Main,
  MainEmpty: MainEmpty,
  Offer: Offer,
  OfferNotLogged: OfferNotLogged,
};

const currentPage = Pages.Main;

function getPage(offersCount: number) {
  switch (currentPage) {
    case Pages.Main:
      return <Main offersCount = {offersCount} />;
    case Pages.FavoritesEmpty:
      return <FavoritesEmpty />;
    case Pages.Favorites:
      return <Favorites />;
    case Pages.Login:
      return <Login />;
    case Pages.MainEmpty:
      return <MainEmpty />;
    case Pages.Offer:
      return <Offer />;
    case Pages.OfferNotLogged:
      return <OfferNotLogged />;
  }

  return null;
}


function App({offersCount} : AppProps): JSX.Element | null {
  return getPage(offersCount);
}

export default App;
