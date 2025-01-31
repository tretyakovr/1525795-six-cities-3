import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { AuthStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { Offers } from '../../types/offers';

type HeaderProps = {
  sourcePage: string;
}

function HeaderLoggedUser(favorites: Offers): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{ store.getState().email }</span>
            <span className="header__favorite-count">{ favorites.length }</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/" onClick={(evt) => {
            evt.preventDefault();
            store.dispatch(logoutAction());
          }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function HeaderNotLoggedUser(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/login">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Header({sourcePage}: HeaderProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  const favorites = useAppSelector((state) => state.favorites);
  const logoClassName = sourcePage === 'main' ? 'header__logo-link header__logo-link--active' : 'header__logo-link';
  const headerLogo: JSX.Element = (
    <Link className={logoClassName} to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>);

  const headerNav = authStatus === AuthStatus.Auth ? HeaderLoggedUser(favorites) : HeaderNotLoggedUser();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            { headerLogo }
          </div>
          { headerNav }
        </div>
      </div>
    </header>
  );
}

export default Header;
