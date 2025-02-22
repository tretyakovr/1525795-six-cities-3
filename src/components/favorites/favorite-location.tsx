import { Link } from 'react-router-dom';
import { Offer, Offers } from '../../types/offers';
import FavoriteItem from './favorite-item';
import { changeLocation } from '../../store/app-data/app-data';
import { useDispatch } from 'react-redux';

type FavoriteLocationProps = {
  favorites: Offers;
  city: string;
}

function FavoriteLocation({favorites, city}: FavoriteLocationProps): JSX.Element {
  const dispatch = useDispatch();

  const cityOffers: Offer[] = favorites.filter(
    (item) => item.city.name === city);

  const locationClickHandler = (evt: React.MouseEvent<HTMLElement>):void => {
    dispatch(changeLocation(evt.currentTarget.innerText));
  };

  return (
    <>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/" onClick={locationClickHandler}>
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
