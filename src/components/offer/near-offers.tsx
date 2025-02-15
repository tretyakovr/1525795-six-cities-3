import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getNearOffers, getOfferDetail } from '../../store/offer-data/selectors';
import Card from '../card/card';
import { AppRoute } from '../../const';

const VIEW_NEAR_OFFERS_COUNT = 3;


function NearOffers(): JSX.Element {
  const offerDetail = useAppSelector(getOfferDetail);
  let nearOffers = useAppSelector(getNearOffers);

  if (offerDetail === undefined) {
    return (<Navigate to={AppRoute.Page404} />);
  }
  const offerId = offerDetail.id;
  nearOffers = [...nearOffers.filter((item) => item.id !== offerId).slice(0, VIEW_NEAR_OFFERS_COUNT)];

  return (
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

  );
}

export default NearOffers;
