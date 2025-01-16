import { createReducer } from '@reduxjs/toolkit';
import { getCityOffers } from '../utils';
import { initActiveCity } from './action';
import { cities } from '../const';
import { Offers } from '../types/offers';


type InitialStateType = {
  city: string;
  offers: Offers;
}

const initialState: InitialStateType = {
  city: '',
  offers: [],
};


const reducer = createReducer(initialState, (builder) => {
  builder.addCase(initActiveCity, (state) => {
    state.city = cities[0];
    state.offers = getCityOffers(cities[0]);
  });
});

export {reducer};


// Объект начального состояния: город (используется для отбора списка предложений в
//   определённом городе) и список предложений по аренде.

// Функцию-редьюсер. Она принимает в качестве параметров текущий state и действие (action).
// Результатом выполнения редьюсера станет новое состояние. Обратите внимание, для именования
// функций-редьюсеров применяются существительные.
