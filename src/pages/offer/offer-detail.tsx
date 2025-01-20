import { useParams } from 'react-router';
import Header from '../header/header';
import { offers } from '../../mocks/offers';
import Feedback from '../../components/feedback/feedback';
import Reviews from './reviews';
import OfferMap from './offer-map';
import Card from '../card/card';


function OfferDetail(): JSX.Element | null {
  const params = useParams();
  const detailedOffer = offers.filter((item) => (item.id === params.id))[0];
  const nearOffers = offers.filter((item) =>
    (item.city.name === detailedOffer.city.name && item.id !== detailedOffer.id)).slice(1, 4);
  if (!detailedOffer) {
    return (null);
  }

  return (
    <div className="page">
      <Header sourcePage = 'offer' />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  {/* <span style={{width: `${(detailedOffer.rating * 100 / 5).toString(10)}%`}}></span> */}
                  <span style={{width: `${(Math.round(detailedOffer.rating) * 100 / 5).toString(10)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{detailedOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {detailedOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{detailedOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                    Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                    Washing machine
                  </li>
                  <li className="offer__inside-item">
                    Towels
                  </li>
                  <li className="offer__inside-item">
                    Heating
                  </li>
                  <li className="offer__inside-item">
                    Coffee machine
                  </li>
                  <li className="offer__inside-item">
                    Baby seat
                  </li>
                  <li className="offer__inside-item">
                    Kitchen
                  </li>
                  <li className="offer__inside-item">
                    Dishwasher
                  </li>
                  <li className="offer__inside-item">
                    Cabel TV
                  </li>
                  <li className="offer__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">1</span>
                </h2>
                <ul className="reviews__list">
                  <Reviews />
                </ul>
                <Feedback />
              </section>
            </div>
          </div>
          <section className="offer__map map"><OfferMap offer={detailedOffer} nearOffers={nearOffers} /></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((item) => (
                <article key={item.id} className="near-places__card place-card">
                  <Card offer={item} divClassName='near-places__image-wrapper place-card__image-wrapper'/>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default OfferDetail;
