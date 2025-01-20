import { createAction } from '@reduxjs/toolkit';
// import { SortTypes } from '../const';

export const changeLocation = createAction<string, string>('changeLocation');
export const changeSort = createAction<string, string>('changeSort');
