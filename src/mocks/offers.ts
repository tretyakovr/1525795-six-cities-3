import { Offers } from '../types/offers';

export const offers: Offers = [
  {
    id: 'eb611ccb-eeac-4e0f-b62e-58beb4a514ef',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'hotel',
    price: 239,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.854557,
      longitude: 4.364697,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.6
  },
  {
    id: '3205a12c-6f86-414a-b97e-c88875c62686',
    title: 'Loft Studio in the Central Area',
    type: 'hotel',
    price: 475,
    previewImage: "https://15.design.htmlacademy.pro/static/hotel/7.jpg",
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.867557,
      longitude: 4.371696999999999,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3
  },
  {
    id: '37d70cf0-a691-4793-9d95-abbbfce19799',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 173,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.827557,
      longitude: 4.336697,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4
  },
  {
    id: '60eb68b3-b62f-4147-96c2-255a2c8b6caf',
    title: 'Tile House',
    type: 'room',
    price: 188,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.833557,
      longitude: 4.374696999999999,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.3
  },
];
