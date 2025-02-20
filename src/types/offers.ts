type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export enum OfferType {
  APARTMENT = 'apartment',
  HOTEL = 'hotel',
  HOUSE = 'house',
  ROOM = 'room',
}

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
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

export type OfferDetail = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
  previewImage: string;
}

export type Offers = Offer[];
