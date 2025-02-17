import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import FavoriteLocation from './favorite-location';
import FavoritesEmpty from './favorites-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesActionState } from '../../store/offer-data/selectors';
import { getAuthStatus } from '../../store/user-data/selectors';
import { APIActionState, AuthStatus } from '../../const';
import { getFavoritesAction } from '../../store/api-actions';
import Loading from '../loading/loading';


function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const favorites = useAppSelector(getFavorites);
  const favoritesActionState = useAppSelector(getFavoritesActionState);

  const favoriteCities: string[] = Array.from(
    new Set<string>(favorites.map((item) => item.city.name))
  );

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(getFavoritesAction());
    }
  }, [dispatch, authStatus]);

  if (favoritesActionState === APIActionState.CALL) {
    return (<Loading />);
  }

  if (!favorites.length) {
    return (<FavoritesEmpty />);
  }

  return (
    <div className="page">
      <Header sourcePage = 'favorites' />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteCities.map((item) => (
                <li key={item} className="favorites__locations-items">
                  <FavoriteLocation favorites={favorites} city={item} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
