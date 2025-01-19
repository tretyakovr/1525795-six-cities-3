import { Offers } from './types/offers';
import { offers } from './mocks/offers';


export function getCityOffers(city: string | undefined): Offers {
  return offers.filter((item) => item.city.name === city);
}
