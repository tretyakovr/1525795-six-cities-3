import { useState } from 'react';
import { Offers } from '../../types/offers';
import Locations from './locations';
import Header from '../header/header';
import OffersList from '../offer/offers-list';
import CityMap from '../../components/city-map/city-map';
import { City } from '../../types/city';

type MainProps = {
  offers: Offers;
}

function getCity(city: string, offers: Offers): City {
  const cityFromOffer = offers.filter((item) => item.city.name === city)[0];

  return {
    name: cityFromOffer.city.name,
    latitude: cityFromOffer.city.location.latitude,
    longitude: cityFromOffer.city.location.longitude,
    zoom: cityFromOffer.city.location.zoom
  };
}

function getCityOffers(city: string, offers: Offers): Offers {
  const cityOffers: Offers = offers.filter((item) => item.city.name === city);

  return cityOffers;
}

function Main({offers}: MainProps): JSX.Element {
  const locations: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const city = locations[0];
  const [activeLocation, setActiveLocation] = useState(city);
  const cityOffers: Offers = getCityOffers(activeLocation, offers);
  const [selectedOffer, setSelectedOffer] = useState('');

  const changeLocationHandler = (newLocation: string) => {
    setActiveLocation(newLocation);
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
              locations={locations}
              activeLocation={activeLocation}
              changeLocationHandler={changeLocationHandler}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersList
              cityOffers={cityOffers}
              activeLocation={activeLocation}
              selectOfferHandler={selectOfferHandler}
            />
            <div className="cities__right-section">
              <section className="cities__map map">
                <CityMap
                  city={getCity(activeLocation, offers)}
                  cityOffers={cityOffers}
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
