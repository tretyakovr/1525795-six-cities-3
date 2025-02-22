import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, Offers } from '../../types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useOfferMap from './use-offer-map';


type OfferMapProps = {
  offer: Offer;
  nearOffers: Offers;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [34, 39],
  iconAnchor: [28, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [34, 39],
  iconAnchor: [28, 39]
});

function OfferMap({offer, nearOffers}: OfferMapProps): JSX.Element {
  const mapContainer = useRef(null);
  const mapInstance = useOfferMap({mapContainer, offer});

  useEffect(() => {
    if (mapInstance) {
      const markerLayer = layerGroup().addTo(mapInstance);

      nearOffers.forEach((item) => {
        const nearOfferMarker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        const nearOfferMarkerIcon = defaultCustomIcon;
        nearOfferMarker.setIcon(nearOfferMarkerIcon).addTo(markerLayer);
      });

      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });
      const markerIcon = currentCustomIcon;

      marker.setIcon(markerIcon).addTo(markerLayer);

      return () => {
        mapInstance.removeLayer(markerLayer);
      };
    }
  }, [mapInstance, offer, nearOffers]);

  return <div style={{height: '100%'}} ref={mapContainer}></div>;
}

export default OfferMap;
