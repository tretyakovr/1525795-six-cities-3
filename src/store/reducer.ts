import { createReducer, current } from '@reduxjs/toolkit';
import { getCityOffers } from '../utils';
import { changeLocation, changeSort } from './action';
import { cities, SortTypes } from '../const';
import { Offers } from '../types/offers';


type InitialStateType = {
  city: string | undefined;
  offers: Offers;
  sortType: string | undefined;
}

const initialState: InitialStateType = {
  city: cities[0],
  offers: getCityOffers(cities[0]),
  sortType: SortTypes.POPULAR,
};

// type ChangeSortProps = {
//   payload: string;
//   type: 'changeSort';
// }

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, newLocation) => {
      state.city = newLocation.payload;
    })
    .addCase(changeSort, (state, sortValue) => {
      state.sortType = sortValue.payload;

      switch (sortValue.payload) {
        case SortTypes.POPULAR:
          state.offers = getCityOffers(current(state).city);
          return ;

        case SortTypes.LOWTOHIGH:
          state.offers = getCityOffers(current(state).city).sort((offer1, offer2) => offer1.price - offer2.price);
          return ;

        case SortTypes.HIGHTOLOW:
          state.offers = getCityOffers(current(state).city).sort((offer1, offer2) => offer2.price - offer1.price);
          return ;

        case SortTypes.TOPRATED:
          state.offers = getCityOffers(current(state).city).sort((offer1, offer2) => offer2.rating - offer1.rating);
      }
    });
});

export {reducer};


// Объект начального состояния: город (используется для отбора списка предложений в
//   определённом городе) и список предложений по аренде.

// Функцию-редьюсер. Она принимает в качестве параметров текущий state и действие (action).
// Результатом выполнения редьюсера станет новое состояние. Обратите внимание, для именования
// функций-редьюсеров применяются существительные.
