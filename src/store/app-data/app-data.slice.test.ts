import { appData } from './app-data';
import { DEFAULT_CITY } from '../../const';
import { SortType } from '../../const';

describe('app-data slice', () => {
  it('should return initial state call with empty action', () => {
    const emptyAction = {type: '', };
    const expectedState = {
      city: DEFAULT_CITY,
      sortType: SortType.Popular,
      errorMessage: '',
    };

    const result = appData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return expected state call with state and empty action', () => {
    const emptyAction = {type: '', };
    const expectedState = {
      city: 'Dusseldorf',
      sortType: SortType.TopRated,
      errorMessage: 'test message',
    };

    const result = appData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
