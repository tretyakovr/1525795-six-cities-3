import { createAction } from '@reduxjs/toolkit';

export const changeLocation = createAction<string>('changeLocation');
export const changeSort = createAction<string>('changeSort');
