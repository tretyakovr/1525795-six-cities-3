import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { capitalize, getStarsWidth } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { markFavoriteAction } from '../../store/api-actions';
import { AppRoute, AuthStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getAuthStatus } from '../../store/user-data/selectors';
import { getFavorites } from '../../store/offer-data/selectors';

type FavoriteItemProps = {
  favoriteItem: Offer;
};

function FavoriteItem({favoriteItem}: FavoriteItemProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);
  const favorites = useAppSelector(getFavorites);
  const isFavorite = favorites.find((item) => item.id === favoriteItem.id)?.isFavorite;

  const handleFavoriteClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(markFavoriteAction({offerId: favoriteItem.id, favoriteState: Number(!favoriteItem.isFavorite)}));
    }
  };

  return (
    <>
      { favoriteItem.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div> }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${favoriteItem.id}`}>
          <img className="place-card__image" src={favoriteItem.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favoriteItem.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className=
              {isFavorite ? 'place-card__bookmark-button button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getStarsWidth(favoriteItem.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${favoriteItem.id}`} >{favoriteItem.title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(favoriteItem.type)}</p>
      </div>
    </>
  );
}

export default FavoriteItem;
