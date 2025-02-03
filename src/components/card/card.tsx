import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { markFavoriteAction } from '../../store/api-actions';
import { capitalize } from '../../utils';
import { AppRoute, AuthStatus } from '../../const';

type CardProps = {
  offer: Offer;
  divClassName: string;
}

function Card({offer, divClassName}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authStatus);
  const navigate = useNavigate();
  // Значение isFavorite ищем в loadedOffers, чтобы не мудрить с
  // обновлением nearOffers, если компонент вызывается из OfferDetailCard и там меняется его значение
  const isFavorite = useAppSelector((state) => state.loadedOffers.find((item) => item.id === offer.id)?.isFavorite);

  const favoriteClickHandler = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(markFavoriteAction({offerId: offer.id, favoriteState: Number(!offer.isFavorite)}));
    }
  };

  return (
    <>
      { offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div> }
      <div className={`${divClassName}`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className=
            {isFavorite ? 'place-card__bookmark-button button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
          type="button"
          onClick={favoriteClickHandler}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(Math.round(offer.rating) * 100 / 5).toString(10)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(offer.type)}</p>
      </div>
    </>
  );
}

export default Card;
