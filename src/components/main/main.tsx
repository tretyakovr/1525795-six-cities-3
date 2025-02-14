import { useState } from 'react';
import Locations from '../../components/locations/locations';
import Header from '../../components/header/header';
import OffersList from '../../components/offer/offers-list';
import CityMap from '../../components/city-map/city-map';
import { City } from '../../types/city';
import { Offers } from '../../types/offers';
import { changeLocation } from '../../store/app-data/app-data';
import { getCityOffers, getSortedCityOffers } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortType, getCity } from '../../store/app-data/selectors';
import { getLoadedOffers } from '../../store/offer-data/selectors';


function getCityParams(city: string, cityOffers: Offers): City {
  // Из первого предложения в списке офферов берем координаты для отображения на карте
  const cityFromOffer = cityOffers.filter((item) => item.city.name === city)[0];
  if (cityFromOffer) {
    return {
      name: cityFromOffer.city.name,
      latitude: cityFromOffer.city.location.latitude,
      longitude: cityFromOffer.city.location.longitude,
      zoom: cityFromOffer.city.location.zoom
    };
  }

  return {
    name: '',
    latitude: 0,
    longitude: 0,
    zoom: 0
  };
}

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);

  const [activeLocation, setActiveLocation] = useState(city);
  const [selectedOffer, setSelectedOffer] = useState('');

  const loadedOffers = useAppSelector(getLoadedOffers);
  const sortType = useAppSelector(getSortType);

  let cityOffers = getCityOffers(loadedOffers, activeLocation);
  cityOffers = getSortedCityOffers(cityOffers, sortType);

  const changeLocationHandler = (newLocation: string) => {
    if (newLocation) {
      dispatch(changeLocation(newLocation));
      setActiveLocation(newLocation);
      cityOffers = getCityOffers(loadedOffers, newLocation);
      cityOffers = getSortedCityOffers(cityOffers, sortType);
    }
  };

  const selectOfferHandler = (offerId: string) => {
    setSelectedOffer(offerId);
  };

  return (
    <div className="page page--gray page--main">
      <Header sourcePage = 'main' />

      <main className={cityOffers.length === 0 ?
        'page__main page__main--index page__main--index-empty' :
        'page__main page__main--index'}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Locations
              changeLocationHandler={changeLocationHandler}
            />
          </section>
        </div>
        <div className="cities">
          { cityOffers.length === 0
            ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available
                    at the moment in {activeLocation}
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
            :
            <div className="cities__places-container container">
              <OffersList
                activeLocation={activeLocation}
                selectOfferHandler={selectOfferHandler}
              />
              <div className="cities__right-section">
                <section className="cities__map map">
                  <CityMap
                    city={getCityParams(city, cityOffers)}
                    cityOffers={cityOffers}
                    selectedOffer={selectedOffer}
                  />
                </section>
              </div>
            </div> }
        </div>
      </main>
    </div>
  );
}

export default Main;
