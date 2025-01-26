import { useState } from 'react';
import Locations from '../../components/locations/locations';
import Header from '../header/header';
import OffersList from '../offer/offers-list';
import CityMap from '../../components/city-map/city-map';
import { City } from '../../types/city';
import { store } from '../../store';
import { changeLocation } from '../../store/action';


function getCity(): City {
  const city = store.getState().city;
  // Из первого предложения в списке офферов берем координаты для отображения на карте
  const cityFromOffer = store.getState().offers.filter((item) => item.city.name === city)[0];
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
  const [activeLocation, setActiveLocation] = useState(store.getState().city);
  const [selectedOffer, setSelectedOffer] = useState('');

  const changeLocationHandler = (newLocation: string) => {
    if (newLocation) {
      store.dispatch(changeLocation(newLocation));
      setActiveLocation(newLocation);
    }
  };

  const selectOfferHandler = (offerId: string) => {
    setSelectedOffer(offerId);
  };

  return (
    <div className="page page--gray page--main">
      <Header sourcePage = 'main' />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <Locations
              changeLocationHandler={changeLocationHandler}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersList
              activeLocation={activeLocation}
              selectOfferHandler={selectOfferHandler}
            />
            <div className="cities__right-section">
              <section className="cities__map map">
                <CityMap
                  city={getCity()}
                  cityOffers={store.getState().offers}
                  selectedOffer={selectedOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
