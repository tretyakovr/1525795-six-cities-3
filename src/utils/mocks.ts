import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { OfferDetail } from '../types/offers';
import { OfferType } from '../types/offers';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const mockOfferDetail: OfferDetail = {
  id: '4da58b5e-1a67-40f0-b998-2af668bbdfc8',
  title: 'Penthouse, 4-5 rooms + 5 balconies',
  description: 'This is a place for dreamers to reset, reflect, and create. Designed with a \'slow\' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.',
  type: OfferType.ROOM,
  price: 243,
  images: [
    'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/18.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/5.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/6.jpg'
  ],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.858610000000006,
    longitude: 2.330499,
    zoom: 16
  },
  goods: [
    'Coffee machine',
    'Air conditioning',
    'Breakfast'
  ],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  isPremium: false,
  isFavorite: false,
  rating: 4.1,
  bedrooms: 1,
  maxAdults: 1,
  previewImage: '',
};

export const mockOffers = [
  {
    id: 'cefbdb9e-af28-4166-90ed-273428016b25',
    title: 'Wood and stone place',
    type: OfferType.HOTEL,
    price: 202,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.1
  },
  {
    id: '4da58b5e-1a67-40f0-b998-2af668bbdfc8',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: OfferType.ROOM,
    price: 243,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/4.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1
  },
  {
    id: '9a374ac2-2af3-4c70-9f8d-a7ccbaa4de1c',
    title: 'Nice, cozy, warm big bed apartment',
    type: OfferType.HOTEL,
    price: 354,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/18.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.4
  },
  {
    id: '28c808ba-edd8-4934-b095-2cf8ca59905a',
    title: 'Amazing and Extremely Central Flat',
    type: OfferType.ROOM,
    price: 196,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.4
  },
  {
    id: '49e218cf-454f-47b0-932c-b122a170bd08',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: OfferType.APARTMENT,
    price: 321,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87561,
      longitude: 2.375499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.6
  },
  {
    id: 'b9104fc9-7a94-4d2e-8ebb-119f130cedbd',
    title: 'Loft Studio in the Central Area',
    type: OfferType.ROOM,
    price: 177,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.87961000000001,
      longitude: 2.353499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.4
  },
  {
    id: '2b554e44-ccf6-471e-b209-e1bcffeff293',
    title: 'Wood and stone place',
    type: OfferType.APARTMENT,
    price: 379,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.364499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5
  }
];
