import { Params, useParams, useNavigate } from 'react-router';
import Header from '../../components/header/header';
import Feedback from '../../components/feedback/feedback';
import Card from '../../components/card/card';
import Reviews from './reviews';
import OfferMap from './offer-map';
import { getOfferAction, getCommentsAction, getNearOffersAction, markFavoriteAction } from '../../store/api-actions';
import { capitalize } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { OfferDetail, Offers } from '../../types/offers';
import { Comments } from '../../types/comments';
import { AppRoute, AuthStatus } from '../../const';

function OfferDetailCard() {
  const params: Readonly<Params<string>> = useParams<string>();
  const offerId: string | undefined = params.id;

  const detailedOffer = useAppSelector((state) => state.offer) as OfferDetail;
  const offerComments: Comments = useAppSelector((state) => state.comments);
  const nearOffers: Offers = useAppSelector((state) => state.nearOffers);
  const authStatus: AuthStatus = useAppSelector((state) => state.authStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => state.offer?.isFavorite) as boolean;

  const favoriteClickHandler = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(markFavoriteAction({offerId: detailedOffer.id, favoriteState: Number(!detailedOffer.isFavorite)}));
      dispatch(getOfferAction(offerId));
    }
  };

  if (!detailedOffer || offerId !== detailedOffer.id) {
    dispatch(getOfferAction(offerId));
    dispatch(getCommentsAction(offerId));
    dispatch(getNearOffersAction(offerId));
    return (null);
  }

  return (
    <div className="page">
      <Header sourcePage = 'offer' />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {detailedOffer.images.slice(0, 6).map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              { detailedOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div> }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {detailedOffer.title}
                </h1>
                <button className=
                  {isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active button' : 'offer__bookmark-button button'}
                type="button"
                onClick={favoriteClickHandler}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(Math.round(detailedOffer.rating) * 100 / 5).toString(10)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{detailedOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalize(detailedOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {detailedOffer.bedrooms} Bedroom{detailedOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {detailedOffer.maxAdults} adult{detailedOffer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{detailedOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {detailedOffer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={detailedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {detailedOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {detailedOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {detailedOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">{offerComments.length}</span>
                </h2>
                <Reviews offerComments={offerComments} />
                { authStatus === AuthStatus.Auth ? <Feedback offerId={detailedOffer.id} /> : null}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <OfferMap offer={detailedOffer} nearOffers={nearOffers} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((item) => (
                <article id={item.id} key={item.id}
                  className="near-places__card place-card"
                >
                  <Card
                    offer={item}
                    divClassName='near-places__image-wrapper place-card__image-wrapper'
                  />
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferDetailCard;
