import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city';
import { Offers } from '../../types/offers';
import {IconMarker} from '../../const';
import useMap from './use-map';


type CityMapProps = {
  city: City;
  cityOffers: Offers;
  selectedOffer: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: IconMarker.Default,
  iconSize: [28, 39],
  iconAnchor: [14, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: IconMarker.Current,
  iconSize: [28, 39],
  iconAnchor: [14, 39]
});

function CityMap({city, cityOffers, selectedOffer}: CityMapProps): JSX.Element {
  const mapContainer = useRef(null);
  const mapInstance = useMap({mapContainer, city});

  useEffect(() => {
    if (mapInstance) {
      mapInstance.flyTo({
        lat: city.latitude,
        lng: city.longitude
      }, city.zoom);

      const markerLayer = layerGroup().addTo(mapInstance);
      cityOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        const markerIcon = (selectedOffer !== undefined && offer.id === selectedOffer) ? currentCustomIcon : defaultCustomIcon;
        marker.setIcon(markerIcon).addTo(markerLayer);
      });

      return () => {
        mapInstance.removeLayer(markerLayer);
      };
    }
  }, [mapInstance, cityOffers, city, selectedOffer]);

  return <div style={{height: '100%'}} ref={mapContainer}></div>;
}

export default CityMap;
