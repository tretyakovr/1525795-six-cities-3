import { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { changeLocation } from '../../store/app-data/app-data';
import { loginAction } from '../../store/api-actions';
import { APIActionState, AppRoute, AuthStatus, cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRandomInteger } from '../../utils';
import { getAuthStatus, getLoginActionState } from '../../store/user-data/selectors';


function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const loginActionState = useAppSelector(getLoginActionState);

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (authStatus === AuthStatus.Auth) {
    return (<Navigate to={AppRoute.Main}/>);
  }

  const randomLocation = cities[getRandomInteger(0, cities.length - 1)];

  const handleLocationClick = (evt: React.MouseEvent<HTMLElement>):void => {
    const newLocation = evt.currentTarget.innerText;
    dispatch(changeLocation(newLocation));
  };

  const handleAuthFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (loginRef.current && passwordRef.current) {
      if (passwordRef.current.value.match(/^(?=.*[A-Za-z])(?=.*\d)/)) {
        const loginValue = loginRef.current.value ?? '';
        const passwordValue = passwordRef.current.value ?? '';
        dispatch(loginAction({email: loginValue, password: passwordValue}));
      }
    }
  };

  if (loginActionState === APIActionState.Success) {
    return (<Navigate to={AppRoute.Main} />);
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleAuthFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/" onClick={handleLocationClick}>
                <span>{randomLocation}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
