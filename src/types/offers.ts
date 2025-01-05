type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

// enum OfferType {
//   Apartment = 'apartment',
//   Hotel = 'hotel',
//   House = 'house',
//   Room = 'room',
// }

export type Offer = {
  id: string;
  title: string;
  type: 'apartment' | 'hotel' | 'house' | 'room';
  price: number;
  previewImage: string;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type Offers = Offer[];
