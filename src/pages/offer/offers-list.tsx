// import { useEffect } from 'react';
import Card from '../card/card';
import { Offer, Offers } from '../../types/offers';
import Sort from '../../components/sort/sort';
// import { store } from '../../store';

type OffersListProps = {
  cityOffers: Offers;
  activeLocation: string;
  selectOfferHandler(offerId: string | null): void;
}

function OffersList({cityOffers, activeLocation, selectOfferHandler}: OffersListProps): JSX.Element {
  function handleMouseOver(evt: React.MouseEvent<HTMLElement>): void {
    const nodeName: React.MouseEvent<HTMLElement> | string = evt.currentTarget.nodeName;
    if (nodeName === 'ARTICLE') {
      selectOfferHandler(evt.currentTarget.getAttribute('id'));
    }
  }

  // const sortType = store.getState().sortType;

  // useEffect(() => { }, [sortType]);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{cityOffers.length} places to stay in {activeLocation}</b>
      <form className="places__sorting" action="#" method="get">
        <Sort />
      </form>
      <div className="cities__places-list places__list tabs__content">
        {cityOffers.map((item: Offer) => (
          <article key={item.id} id={item.id}
            className="cities__card place-card"
            onMouseOver={handleMouseOver}
          >
            <Card offer={item} divClassName='cities__image-wrapper place-card__image-wrapper'/>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OffersList;
