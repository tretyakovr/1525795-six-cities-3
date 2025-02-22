import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import Header from '../../components/header/header';
import Reviews from './reviews';
import NearOffers from './near-offers';
import OfferMap from './offer-map';
import Loading from '../loading/loading';
import { getOfferDetailAction, getCommentsAction, getNearOffersAction, markFavoriteAction } from '../../store/api-actions';
import { getOfferDetail, getNearOffers } from '../../store/offer-data/selectors';
import { getOfferDetailActionState, getNearOffersActionState, getCommentsActionState } from '../../store/offer-data/selectors';
import { getAuthStatus } from '../../store/user-data/selectors';
import { setErrorMessage } from '../../store/app-data/app-data';
import { resetOfferDetail } from '../../store/offer-data/offer-data';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { APIActionState, AppRoute, AuthStatus } from '../../const';
import { capitalize, getStarsWidth } from '../../utils';


const VIEW_NEAR_OFFERS_COUNT = 3;


function OfferDetailCard(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams<string>();
  const dispatch = useAppDispatch();
  const offerId: string | undefined = params.id;

  const detailedOffer = useAppSelector(getOfferDetail);
  const authStatus = useAppSelector(getAuthStatus);
  let nearOffers = useAppSelector(getNearOffers);

  const offerDetailActionsState = [
    useAppSelector(getOfferDetailActionState),
    useAppSelector(getNearOffersActionState),
    useAppSelector(getCommentsActionState)];

  useEffect(() => {
    dispatch(getOfferDetailAction(offerId));
    dispatch(getNearOffersAction(offerId));
    dispatch(getCommentsAction(offerId));
    return () => {
      dispatch(resetOfferDetail());
    };
  }, [dispatch, offerId]);

  const favoriteClickHandler = () => {
    if (authStatus === AuthStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else {
      if (detailedOffer !== undefined) {
        dispatch(markFavoriteAction({offerId: detailedOffer.id, favoriteState: Number(!detailedOffer.isFavorite)}));
      }
    }
  };

  if (offerDetailActionsState.some((item) => item === APIActionState.Error)) {
    dispatch(setErrorMessage(`Failed api.get detailed information Offer id# ${offerId}!`));
    return (<Navigate to={AppRoute.Page404} />);
  }
  if (!offerDetailActionsState.every((item) => item === APIActionState.Success)) {
    return (<Loading />);
  }

  if (detailedOffer === undefined) {
    dispatch(setErrorMessage(`Failed api.get detailed information Offer id# ${detailedOffer}!`));
    return (<Navigate to={AppRoute.Page404} />);
  }

  nearOffers = [...nearOffers.filter((item) => item.id !== offerId).slice(0, VIEW_NEAR_OFFERS_COUNT)];

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
                  <span style={{width: getStarsWidth(detailedOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{detailedOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {detailedOffer && capitalize(detailedOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {detailedOffer.bedrooms} Bedroom{detailedOffer && detailedOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {detailedOffer.maxAdults} adult{detailedOffer && detailedOffer.maxAdults > 1 ? 's' : ''}
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
                  <div className={
                    detailedOffer.host.isPro ?
                      'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' :
                      'offer__avatar-wrapper user__avatar-wrapper'
                  }
                  >
                    <img className="offer__avatar user__avatar" src={detailedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {detailedOffer.host.name}
                  </span>
                  {detailedOffer.host.isPro ? <span className="offer__user-status">Pro</span> : ''}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {detailedOffer.description}
                  </p>
                </div>
              </div>
              <Reviews />
            </div>
          </div>
          <section className="offer__map map">
            { detailedOffer ? <OfferMap offer={detailedOffer} nearOffers={nearOffers} /> : null }
          </section>
        </section>
        <NearOffers nearOffers={nearOffers}/>
      </main>
    </div>
  );
}

export default OfferDetailCard;
