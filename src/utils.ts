import { Offers } from './types/offers';
import { offers } from './mocks/offers';


export function getCityOffers(city: string): Offers {
  return offers.filter((item) => item.city.name === city);
}
