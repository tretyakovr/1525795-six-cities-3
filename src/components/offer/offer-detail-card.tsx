import { useParams, useNavigate } from 'react-router';
import Header from '../../components/header/header';
import Feedback from '../../components/feedback/feedback';
import Card from '../../components/card/card';
import Reviews from './reviews';
import OfferMap from './offer-map';
import { getOfferDetailAction, getCommentsAction, getNearOffersAction, markFavoriteAction } from '../../store/api-actions';
import { capitalize } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthStatus } from '../../const';
import { getComments, getOfferDetail, getNearOffers, getIsDataLoading } from '../../store/offer-data/selectors';
import { getAuthStatus } from '../../store/user-data/selectors';


function OfferDetailCard() {
  const params = useParams<string>();
  const offerId: string | undefined = params.id;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isDataLoading = useAppSelector(getIsDataLoading);
  const detailedOffer = useAppSelector(getOfferDetail);

  const offerComments = useAppSelector(getComments);
  const commentsCount = offerComments.length;

  let nearOffers = useAppSelector(getNearOffers);
  nearOffers = [...nearOffers.filter((item) => item.id !== offerId).slice(0, 3)];

  const authStatus: AuthStatus = useAppSelector(getAuthStatus);

  let comments = [...offerComments].sort((review1, review2) => +new Date(review2.date) - +new Date(review1.date));
  comments = [...comments.slice(0, 10)];

  if ((!isDataLoading && !detailedOffer) || (detailedOffer && offerId !== detailedOffer.id)) {
    dispatch(getOfferDetailAction(offerId));
    dispatch(getCommentsAction(offerId));
    dispatch(getNearOffersAction(offerId));
  }

  // if ((!isDataLoading && isLoadingError) || detailedOffer === undefined) {
  //   navigate(AppRoute.Main);
  // }

  const favoriteClickHandler = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      if (detailedOffer !== undefined) {
        dispatch(markFavoriteAction({offerId: detailedOffer.id, favoriteState: Number(!detailedOffer.isFavorite)}));
      }
    }
  };

  return (
    <div className="page">
      <Header sourcePage = 'offer' />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {detailedOffer?.images.slice(0, 6).map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              { detailedOffer?.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div> }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {detailedOffer?.title}
                </h1>
                <button className=
                  {detailedOffer && detailedOffer.isFavorite && authStatus === AuthStatus.Auth ?
                    'offer__bookmark-button button offer__bookmark-button--active' :
                    'offer__bookmark-button button'}
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
                  <span style={{width: `${detailedOffer && (Math.round(detailedOffer.rating) * 100 / 5).toString(10)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{detailedOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {detailedOffer && capitalize(detailedOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {detailedOffer?.bedrooms} Bedroom{detailedOffer && detailedOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {detailedOffer?.maxAdults} adult{detailedOffer && detailedOffer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{detailedOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {detailedOffer?.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={
                    detailedOffer?.host.isPro ?
                      'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' :
                      'offer__avatar-wrapper user__avatar-wrapper'
                  }
                  >
                    <img className="offer__avatar user__avatar" src={detailedOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {detailedOffer?.host.name}
                  </span>
                  {detailedOffer?.host.isPro ? <span className="offer__user-status">Pro</span> : ''}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {detailedOffer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">{commentsCount}</span>
                </h2>
                <Reviews comments={comments} />
                { authStatus === AuthStatus.Auth && detailedOffer ? <Feedback offerId={detailedOffer.id} /> : null}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            { detailedOffer ? <OfferMap offer={detailedOffer} nearOffers={nearOffers} /> : null }
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
