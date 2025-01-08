import { useState } from 'react';
import { useParams } from 'react-router';
import { Offers } from '../../types/offers';
import Locations from './locations';
import Header from '../header/header';
import OffersList from '../offer/offers-list';

type MainProps = {
  offers: Offers;
}

function Main({offers}: MainProps): JSX.Element {
  const locations: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const params = useParams();
  const city = (params.city ? params.city : locations[0]);

  const [activeLocation, setActiveLocation] = useState(city);

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
              setActiveLocation={setActiveLocation}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersList offers={offers} activeLocation={activeLocation}/>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
