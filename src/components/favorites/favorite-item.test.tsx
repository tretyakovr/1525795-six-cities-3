import { render, screen } from '@testing-library/react';
import Favorites from './favorites';
import { withStore } from '../../utils/mock-component';
import { NameSpace, SortType } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { APIActionState } from '../../const';
import { AuthStatus } from '../../const';
import { OfferType } from '../../types/offers';

describe('test FavoriteItem component', () => {
  const initialState = {
    [NameSpace.App]: {
      city: '',
      sortType: SortType.Popular,
      errorMessage: '',
    },
    [NameSpace.Offer]: {
      loadedOffers: [],
      offersActionState: APIActionState.Idle,
      offer: {
        id: '',
        title: '',
        description: '',
        type: OfferType.ROOM,
        price: 0,
        images: [],
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
        goods: [],
        host: {
          isPro: true,
          name: '',
          avatarUrl: ''
        },
        isPremium: false,
        isFavorite: false,
        rating: 0,
        bedrooms: 0,
        maxAdults: 0,
        previewImage: '',
      },
      offerDetailActionState: APIActionState.Idle,
      comments: [],
      commentsActionState: APIActionState.Idle,
      nearOffers: [],
      nearOffersActionState: APIActionState.Idle,
      favorites: [
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
      ],
      favoritesActionState: APIActionState.Idle,
      sendCommentActionState: APIActionState.Idle,
      markFavoriteActionState: APIActionState.Idle,
    },
    [NameSpace.User]: {
      loginActionState: APIActionState.Idle,
      checkAuthActionState: APIActionState.Idle,
      logoutActionState: APIActionState.Idle,
      authStatus: AuthStatus.Auth,
      email: 'testuser@example.com',
      avatarUrl: '',
    }
  };

  it('should contain Offer.title in offer card on Favorites page', () => {
    const preparedComponent = withHistory(withStore(<Favorites />, initialState).withStoreComponent);
    render(preparedComponent);
    initialState.OFFER.favorites.map((item) => {
      const expectedText = item.title;

      expect(screen.getByRole('link', {name: expectedText})).toBeInTheDocument();
    });
  });
});
