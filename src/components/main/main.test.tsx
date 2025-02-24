import { render, screen } from '@testing-library/react';
import Main from './main';
import { withStore } from '../../utils/mock-component';
import { NameSpace, SortType } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { APIActionState } from '../../const';
import { AuthStatus } from '../../const';
import { OfferType } from '../../types/offers';


describe('test Main component', () => {
  it('should contain "No places to stay available" in page with no offers', () => {
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

    const expectedText = 'No places to stay available';
    const preparedComponent = withHistory(withStore(<Main />, initialState).withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });


  it('should contain test offer in page with offers from Paris in loadedOffers', () => {
    const initialState = {
      [NameSpace.App]: {
        city: 'Paris',
        sortType: SortType.Popular,
        errorMessage: '',
      },
      [NameSpace.Offer]: {
        loadedOffers: [
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
        ],
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

    const expectedText = 'Wood and stone place';
    const preparedComponent = withHistory(withStore(<Main />, initialState).withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
