import { Offers } from './types/offers';
import { SortTypes } from './const';
// import { store } from './store';

export function getCityOffers(loadedOffers: Offers, city: string | undefined): Offers {
  return [...loadedOffers.filter((item) => item.city.name === city)];
}


export function getSortedCityOffers(cityOffers: Offers | [], sortType: SortTypes): Offers {
  switch (sortType) {
    case SortTypes.LOWTOHIGH:
      return cityOffers.sort((offer1, offer2) => offer1.price - offer2.price);

    case SortTypes.HIGHTOLOW:
      return cityOffers.sort((offer1, offer2) => offer2.price - offer1.price);

    case SortTypes.TOPRATED:
      return cityOffers.sort((offer1, offer2) => offer2.rating - offer1.rating);
  }

  return cityOffers;
}

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
