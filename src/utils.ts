import { Offers } from './types/offers';
import { SortTypes } from './const';


export function getCityOffers(loadedOffers: Offers, city: string | undefined, sortType: SortTypes): Offers {
  const cityOffers: Offers = loadedOffers.filter((item) => item.city.name === city);

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
