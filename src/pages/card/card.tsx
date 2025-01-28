import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../hooks';
// import { getOfferAction } from '../../store/api-actions';
// import { AppRoute } from '../../const';
// import { store } from '../../store';

type CardProps = {
  offer: Offer;
  divClassName: string;
}

function Card({offer, divClassName}: CardProps): JSX.Element {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const cardClickHandler = ((evt) => {
  //   evt.preventDefault();
  //   dispatch(getOfferAction(offer.id));
  //   console.log(store.getState());
  //   console.log('card click handler', current(store.getState().offer.id);
  //   navigate(`${AppRoute.Offer}/${offer.id}`);
  // });

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
          <button className="place-card__bookmark-button button" type="button">
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
          {/* <Link to={`/offer/${offer.id}`} onClick={cardClickHandler}>{offer.title}</Link> */}
          {/* <Link to="#" onClick={cardClickHandler}>{offer.title}</Link> */}
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </>
  );
}

export default Card;
