import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { Offer } from '../../types/offers';


type UseOfferMapProps = {
  mapContainer: MutableRefObject<HTMLElement | null>;
  offer: Offer;
}

function useOfferMap({mapContainer, offer}: UseOfferMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapContainer.current !== null && !isRenderedRef.current) {
      const mapInstance = new Map(mapContainer.current, {
        center: {
          lat: offer.location.latitude,
          lng: offer.location.longitude
        }, zoom: offer.city.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      mapInstance.addLayer(layer);

      setMap(mapInstance);
      isRenderedRef.current = true;
    }
  }, [mapContainer, offer]);

  return map;
}

export default useOfferMap;
