import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, mockOffers } from '../utils/mocks';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { checkAuthAction, getOffersAction } from './api-actions';
import { configureMockStore } from '@jedmao/redux-mock-store';


describe('async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ });
  });

  describe('check authAction', () => {
    it('dispatch checkAuthAction.pending and checkAuthAction.fulfilled', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.fulfilled.type]);
    });

    it('dispatch checkAuthAction.pending and checkAuthAction.rejected', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.rejected.type]);
    });
  });


  describe('check getOffersAction', () => {
    it('dispatch getOffersAction.pending and getOffersAction.fulfilled', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(getOffersAction());
      const emittedActions = store.getActions();
      const exractedActionTypes = extractActionsTypes(emittedActions);

      expect(exractedActionTypes).toEqual([getOffersAction.pending.type, getOffersAction.fulfilled.type]);
    });

    it('dispatch getOffersAction.pending and getOffersAction.rejected', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(getOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([getOffersAction.pending.type, getOffersAction.rejected.type]);
    });
  });
});
