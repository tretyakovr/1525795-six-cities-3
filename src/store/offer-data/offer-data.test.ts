import { offerData, resetFeedbackState } from './offer-data';
import { resetOfferDetail } from './offer-data';
import { APIActionState } from '../../const';
import { OfferType, OfferDetail } from '../../types/offers';
import { getOffersAction, getCommentsAction, getFavoritesAction, getOfferDetailAction } from '../api-actions';
import { getNearOffersAction, sendCommentAction, markFavoriteAction } from '../api-actions';

const mockInitialState = {
  loadedOffers: [],
  offersActionState: APIActionState.Idle,
  offer: undefined,
  offerDetailActionState: APIActionState.Idle,
  comments: [],
  commentsActionState: APIActionState.Idle,
  isResetFeedback: false,
  nearOffers: [],
  nearOffersActionState: APIActionState.Idle,
  favorites: [],
  favoritesActionState: APIActionState.Idle,
  sendCommentActionState: APIActionState.Idle,
  markFavoriteActionState: APIActionState.Idle,
};

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

const mockRequestComment = {
  offerId: 'cefbdb9e-af28-4166-90ed-273428016b25',
  comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
  rating: 1,
};

const mockResponseComment = {
  comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
  rating: 1,
  id: 'c153cae4-8ad4-445c-b28d-80e14241497a',
  date: '2025-01-27T21:00:00.714Z',
  user: {
    name: 'Zak',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/3.jpg',
    isPro: false
  }
};

describe('offer-data slice', () => {
  it('check resetOfferDetail', () => {
    const initialState = {
      loadedOffers: mockLoadedOffers,
      offersActionState: APIActionState.Call,
      offer: mockOfferDetail,
      offerDetailActionState: APIActionState.Success,
      comments: [],
      commentsActionState: APIActionState.Error,
      isResetFeedback: false,
      nearOffers: [],
      nearOffersActionState: APIActionState.Call,
      favorites: [],
      favoritesActionState: APIActionState.Success,
      sendCommentActionState: APIActionState.Error,
      markFavoriteActionState: APIActionState.Call,
    };
    const expectedState = {
      loadedOffers: mockLoadedOffers,
      offersActionState: APIActionState.Call,
      offer: undefined,
      offerDetailActionState: APIActionState.Idle,
      comments: [],
      commentsActionState: APIActionState.Idle,
      isResetFeedback: false,
      nearOffers: [],
      nearOffersActionState: APIActionState.Idle,
      favorites: [],
      favoritesActionState: APIActionState.Success,
      sendCommentActionState: APIActionState.Error,
      markFavoriteActionState: APIActionState.Call,
    };
    const result = offerData.reducer(initialState, resetOfferDetail());

    expect(result).toEqual(expectedState);
  });

  it('check resetFeedbackState', () => {
    const initialState = {
      loadedOffers: mockLoadedOffers,
      offersActionState: APIActionState.Call,
      offer: mockOfferDetail,
      offerDetailActionState: APIActionState.Success,
      comments: [],
      commentsActionState: APIActionState.Error,
      isResetFeedback: false,
      nearOffers: [],
      nearOffersActionState: APIActionState.Call,
      favorites: [],
      favoritesActionState: APIActionState.Success,
      sendCommentActionState: APIActionState.Error,
      markFavoriteActionState: APIActionState.Call,
    };
    const expectedState = {
      loadedOffers: mockLoadedOffers,
      offersActionState: APIActionState.Call,
      offer: mockOfferDetail,
      offerDetailActionState: APIActionState.Success,
      comments: [],
      commentsActionState: APIActionState.Error,
      isResetFeedback: false,
      nearOffers: [],
      nearOffersActionState: APIActionState.Call,
      favorites: [],
      favoritesActionState: APIActionState.Success,
      sendCommentActionState: APIActionState.Idle,
      markFavoriteActionState: APIActionState.Call,
    };
    const result = offerData.reducer(initialState, resetFeedbackState());

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with offersActionState = APIActionState.CALL when getOffersAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, offersActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, getOffersAction.pending);

    expect(result).toEqual(expectedState);
  });


  it('should return initialState with offersActionState = APIActionState.Error when getOffersAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, offersActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, getOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with offersActionState = APIActionState.Success and loadedOffer = <Offers> when getOffersAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, offersActionState: APIActionState.Success, loadedOffers: mockLoadedOffers};
    const result = offerData.reducer(initialState, getOffersAction.fulfilled(mockLoadedOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with commentsActionState = APIActionState.CALL when getCommentsAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, commentsActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, getCommentsAction.pending);

    expect(result).toEqual(expectedState);
  });


  it('should return initialState with commentsActionState = APIActionState.ERROR when getCommentsAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, commentsActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, getCommentsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with commentsActionState = APIActionState.SUCCESS and comments = <Comments> when getCommentsAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, commentsActionState: APIActionState.Success, comments: mockComments};
    const result = offerData.reducer(initialState, getCommentsAction.fulfilled(mockComments, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with favoritesActionState = APIActionState.CALL when getFavoritesAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, favoritesActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, getFavoritesAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with favoritesActionState = APIActionState.ERROR when getFavoritesAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, favoritesActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, getFavoritesAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with favoritesActionState = APIActionState.SUCCESS and favorites = <Favorites> when getFavoritesAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, favoritesActionState: APIActionState.Success, favorites: mockFavorites};
    const result = offerData.reducer(initialState, getFavoritesAction.fulfilled(mockFavorites, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with offerDetailActionState = APIActionState.CALL when getOfferDetailAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, offerDetailActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, getOfferDetailAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with offerDetailActionState = APIActionState.ERROR when getOfferDetailAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, offerDetailActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, getOfferDetailAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with offerDetailActionState = APIActionState.SUCCESS and offer = <Offer> when getOfferDetailAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, offerDetailActionState: APIActionState.Success, offer: mockOfferDetail};
    const result = offerData.reducer(initialState, getOfferDetailAction.fulfilled(mockOfferDetail, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with nearOffersActionState = APIActionState.CALL when getNearOffersAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, nearOffersActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, getNearOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with nearOffersActionState = APIActionState.ERROR when getNearOfferAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, nearOffersActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, getNearOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with nearOffersActionState = APIActionState.SUCCESS and offer = <Offers> when getNearOffersAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, nearOffersActionState: APIActionState.Success, nearOffers: mockLoadedOffers};
    const result = offerData.reducer(initialState, getNearOffersAction.fulfilled(mockLoadedOffers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with sendCommentActionState = APIActionState.CALL when sendCommentAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, sendCommentActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, sendCommentAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with sendCommentActionState = APIActionState.ERROR when sendCommentAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, sendCommentActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, sendCommentAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with sendCommentActionState = APIActionState.SUCCESS, isResetFeedback = true and comments = <Comments> when sendCommentAction.fulfilled', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, sendCommentActionState: APIActionState.Success, comments: [mockResponseComment], isResetFeedback: true};
    const result = offerData.reducer(initialState, sendCommentAction.fulfilled(mockResponseComment, '', mockRequestComment));

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with markFavoriteActionState = APIActionState.CALL when markFavoriteAction.pending', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, markFavoriteActionState: APIActionState.Call,};
    const result = offerData.reducer(initialState, markFavoriteAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with markFavoriteActionState = APIActionState.ERROR when markFavoriteAction.rejected', () => {
    const initialState = {...mockInitialState};
    const expectedState = {...initialState, markFavoriteActionState: APIActionState.Error,};
    const result = offerData.reducer(initialState, markFavoriteAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return initialState with newFavoriteOffer when markFavoriteAction.fulfilled', () => {
    const initialState = {...mockInitialState, loadedOffers: mockLoadedOffers};
    const offerId = '4da58b5e-1a67-40f0-b998-2af668bbdfc8';
    const index = mockLoadedOffers.findIndex((item) => item.id === offerId);
    const favoriteOffer = mockOfferDetail;
    const favoriteData = {offerId: offerId, favoriteState: +!favoriteOffer.isFavorite};

    const expectedState = {
      ...initialState,
      markFavoriteActionState: APIActionState.Success,
      loadedOffers: [...mockLoadedOffers.slice(0, index), mockOfferDetail, ...mockLoadedOffers.slice(index + 1)],
      favorites: [favoriteOffer],
    };
    const result = offerData.reducer(initialState, markFavoriteAction.fulfilled(mockOfferDetail, '', favoriteData));

    expect(result).toEqual(expectedState);
  });
});
