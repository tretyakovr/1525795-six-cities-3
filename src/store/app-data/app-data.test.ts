import { appData, changeLocation, changeSort, setErrorMessage, clearErrorMessage } from './app-data';
import { DEFAULT_CITY, SortType } from '../../const';


describe('app-data slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      city: DEFAULT_CITY,
      sortType: SortType.Popular,
      errorMessage: '',
    };

    const result = appData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return changed initialState with "Cologne" in city', () => {
    const initialState = {
      city: 'Dusseldorf',
      sortType: SortType.Popular,
      errorMessage: '',
    };
    const city = 'Cologne';
    const expectedState = {
      city: 'Cologne',
      sortType: SortType.Popular,
      errorMessage: '',
    };

    const result = appData.reducer(initialState, changeLocation(city));

    expect(result).toEqual(expectedState);
  });

  it('should return "Amsterdam" in state.city with undefined initialState', () => {
    const city = 'Amsterdam';
    const expectedState = {
      city: 'Amsterdam',
      sortType: SortType.Popular,
      errorMessage: '',
    };

    const result = appData.reducer(undefined, changeLocation(city));

    expect(result).toEqual(expectedState);
  });

  it('changeSort action: should return "top rated first"', () => {
    const sortType = 'Top rated first';
    const expectedState = {
      city: 'Paris',
      sortType: SortType.TopRated,
      errorMessage: '',
    };

    const result = appData.reducer(undefined, changeSort(sortType));

    expect(result).toEqual(expectedState);
  });

  it('setErrorMessage action: should return "Test error"', () => {
    const errorMessage = 'Test error';
    const expectedState = {
      city: 'Paris',
      sortType: SortType.Popular,
      errorMessage: 'Test error',
    };

    const result = appData.reducer(undefined, setErrorMessage(errorMessage));

    expect(result).toEqual(expectedState);
  });

  it('clearErrorMessage action: should return empty error message', () => {
    const initialState = {
      city: 'Paris',
      sortType: SortType.Popular,
      errorMessage: 'Test error',
    };
    const expectedState = {
      city: 'Paris',
      sortType: SortType.Popular,
      errorMessage: '',
    };

    const result = appData.reducer(initialState, clearErrorMessage());

    expect(result).toEqual(expectedState);
  });
});
