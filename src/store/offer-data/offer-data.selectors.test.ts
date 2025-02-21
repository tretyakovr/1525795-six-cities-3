import { NameSpace } from '../../const';
import {
  getLoadedOffers, getFavorites, getFavoritesActionState,
  getOfferDetail, getComments, getNearOffers, getOffersActionState,
  getOfferDetailActionState, getNearOffersActionState,
  getCommentsActionState, getSendCommentActionState } from './selectors';
import { APIActionState } from '../../const';
import { OfferType } from '../../types/offers';
import { OfferDetail } from '../../types/offers';

describe('offer-data selectors', () => {
  const mockLoadedOffers = [
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

  const mockNearOffers = [
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

  const mockOfferDetail: OfferDetail = {
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

  const mockComments = [
    {
      id: '488867ca-734b-4db4-bd5e-7edebc199cf3',
      comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
      date: '2025-01-27T21:00:00.714Z',
      rating: 3,
      user: {
        name: 'Emely',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/5.jpg',
        isPro: true
      }
    },
    {
      id: 'fdb26869-b8de-4181-a558-3d8e8a6d6d22',
      comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
      date: '2025-01-25T21:00:00.714Z',
      rating: 2,
      user: {
        name: 'Mollie',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/10.jpg',
        isPro: true
      }
    },
    {
      id: '17e2c8ee-2ad8-433f-894e-112dfc510f7a',
      comment: 'This villa is perfect in every way: the view on mountains and waterfalls, the hot tub and the villa itself. The evening here became a great continuation of our journeys over country.',
      date: '2025-01-24T21:00:00.714Z',
      rating: 2,
      user: {
        name: 'Isaac',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/3.jpg',
        isPro: true
      }
    }
  ];

  const mockFavorites = [
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
      isFavorite: true,
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
      isFavorite: true,
      isPremium: false,
      rating: 4.1
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
      isFavorite: true,
      isPremium: false,
      rating: 3.4
    }
  ];

  const state = {
    [NameSpace.Offer]: {
      loadedOffers: mockLoadedOffers,
      offersActionState: APIActionState.Call,
      offer: mockOfferDetail,
      offerDetailActionState: APIActionState.Success,
      comments: mockComments,
      commentsActionState: APIActionState.Error,
      nearOffers: mockNearOffers,
      nearOffersActionState: APIActionState.Call,
      favorites: mockFavorites,
      favoritesActionState: APIActionState.Success,
      sendCommentActionState: APIActionState.Error,
      markFavoriteActionState: APIActionState.Call,
    }
  };

  it('check getLoadedOffers', () => {
    const loadedOffers = state[NameSpace.Offer].loadedOffers;
    const result = getLoadedOffers(state);
    expect(result).toEqual(loadedOffers);
  });

  it('check getFavorites', () => {
    const favorites = state[NameSpace.Offer].favorites;
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('check getOfferDetail', () => {
    const offerDetail = state[NameSpace.Offer].offer;
    const result = getOfferDetail(state);
    expect(result).toEqual(offerDetail);
  });

  it('check getComments', () => {
    const comments = state[NameSpace.Offer].comments;
    const result = getComments(state);
    expect(result).toEqual(comments);
  });

  it('check getNearOffers', () => {
    const nearOffers = state[NameSpace.Offer].nearOffers;
    const result = getNearOffers(state);
    expect(result).toEqual(nearOffers);
  });

  it('check getFavoritesActionState', () => {
    const actionState = state[NameSpace.Offer].favoritesActionState;
    const result = getFavoritesActionState(state);
    expect(result).toBe(actionState);
  });

  it('check getOffersActionState', () => {
    const actionState = state[NameSpace.Offer].offersActionState;
    const result = getOffersActionState(state);
    expect(result).toBe(actionState);
  });

  it('check getOfferDetailActionState', () => {
    const actionState = state[NameSpace.Offer].offerDetailActionState;
    const result = getOfferDetailActionState(state);
    expect(result).toBe(actionState);
  });

  it('check getNearOffersActionState', () => {
    const actionState = state[NameSpace.Offer].nearOffersActionState;
    const result = getNearOffersActionState(state);
    expect(result).toBe(actionState);
  });

  it('check getCommentsActionState', () => {
    const actionState = state[NameSpace.Offer].commentsActionState;
    const result = getCommentsActionState(state);
    expect(result).toBe(actionState);
  });

  it('check getSendCommentActionState', () => {
    const actionState = state[NameSpace.Offer].sendCommentActionState;
    const result = getSendCommentActionState(state);
    expect(result).toBe(actionState);
  });
});
