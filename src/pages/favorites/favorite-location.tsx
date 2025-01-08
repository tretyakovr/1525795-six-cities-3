import { Link } from 'react-router-dom';
import { Offer, Offers } from '../../types/offers';
import FavoriteItem from './favorite-item';

type FavoriteLocationProps = {
  favorites: Offers;
  city: string;
}

function FavoriteLocation({favorites, city}: FavoriteLocationProps): JSX.Element {
  const cityOffers: Offer[] = favorites.filter(
    (item) => item.city.name === city);

  return (
    <>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`/${city}`}>
            <span>{city}</span>
          </Link>
        </div>
      </div>

      <div className="favorites__places">
        {cityOffers.map((item) =>
          (
            <article key={item.id} className="favorites__card place-card">
              <FavoriteItem favoriteItem={item} />
            </article>
          ))}
      </div>
    </>
  );
}

export default FavoriteLocation;
