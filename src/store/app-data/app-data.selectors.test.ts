import { getCity, getSortType, getErrorMessage } from './selectors';
import { NameSpace, SortType } from '../../const';

describe('app-data selectors', () => {
  const state = {
    [NameSpace.App]: {
      city: 'Paris',
      sortType: SortType.TopRated,
      errorMessage: 'test error message',
    }
  };

  it('check getCity', () => {
    const { city } = state[NameSpace.App];
    const result = getCity(state);
    expect(result).toBe(city);
  });

  it('check getSortType', () => {
    const { sortType } = state[NameSpace.App];
    const result = getSortType(state);
    expect(result).toBe(sortType);
  });

  it('check getErrorMessage', () => {
    const { errorMessage } = state[NameSpace.App];
    const result = getErrorMessage(state);
    expect(result).toBe(errorMessage);
  });

});
