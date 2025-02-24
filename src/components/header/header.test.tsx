import { render, screen } from '@testing-library/react';
import Header from './header';
import { withStore } from '../../utils/mock-component';
import { NameSpace, SortType } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { APIActionState } from '../../const';
import { AuthStatus } from '../../const';
import { OfferType } from '../../types/offers';

describe('test Header component', () => {
  it('should contain "Sign in" in header when no authenticated user', () => {
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
        favorites: [],
        favoritesActionState: APIActionState.Idle,
        sendCommentActionState: APIActionState.Idle,
        markFavoriteActionState: APIActionState.Idle,
      },
      [NameSpace.User]: {
        loginActionState: APIActionState.Idle,
        checkAuthActionState: APIActionState.Idle,
        logoutActionState: APIActionState.Idle,
        authStatus: AuthStatus.NoAuth,
        email: '',
        avatarUrl: '',
      }
    };

    const expectedText = 'Sign in';
    const preparedComponent = withHistory(withStore(<Header sourcePage='main'/>, initialState).withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });


  it('should contain user email in header when Authenticated user', () => {
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
        favorites: [],
        favoritesActionState: APIActionState.Idle,
        sendCommentActionState: APIActionState.Idle,
        markFavoriteActionState: APIActionState.Idle,
      },
      [NameSpace.User]: {
        loginActionState: APIActionState.Idle,
        checkAuthActionState: APIActionState.Idle,
        logoutActionState: APIActionState.Idle,
        authStatus: AuthStatus.Auth,
        email: 'test@example.com',
        avatarUrl: '',
      }
    };

    const expectedText = 'test@example.com';
    const preparedComponent = withHistory(withStore(<Header sourcePage='main'/>, initialState).withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
