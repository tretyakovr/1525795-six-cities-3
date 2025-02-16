import Card from '../card/card';
import { Offers } from '../../types/offers';

type NearOffersProps = {
  nearOffers: Offers;
}

function NearOffers({nearOffers}: NearOffersProps): JSX.Element {
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
