import Card from '../card/card';
import { Offer, Offers } from '../../types/offers';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks';
import { getSortedCityOffers } from '../../utils';

type OffersListProps = {
  activeLocation: string | undefined;
  selectOfferHandler(offerId: string | null): void;
}

function OffersList({activeLocation, selectOfferHandler}: OffersListProps): JSX.Element {
  const sortType = useAppSelector((state) => state.sortType);

  function handleMouseOver(evt: React.MouseEvent<HTMLElement>): void {
    const nodeName: React.MouseEvent<HTMLElement> | string = evt.currentTarget.nodeName;
    if (nodeName === 'ARTICLE') {
      selectOfferHandler(evt.currentTarget.getAttribute('id'));
    }
  }

  const city = activeLocation;
  // const cityOffers = getCityOffers(store.getState().loadedOffers, city);
  const cityOffers = useAppSelector((state) => state.loadedOffers);
  const offers: Offers = getSortedCityOffers(cityOffers, sortType);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city}</b>
      <form className="places__sorting" action="#" method="get">
        <Sort />
      </form>
      <div className="cities__places-list places__list tabs__content">
        {offers.map((item: Offer) => (
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
