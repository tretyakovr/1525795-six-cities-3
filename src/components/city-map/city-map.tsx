import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city';
import { Offers } from '../../types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useMap from './use-map';


type CityMapProps = {
  city: City;
  cityOffers: Offers;
  selectedOffer: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
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
