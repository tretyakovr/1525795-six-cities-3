import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { withStore } from '../../utils/mock-component';
import { NameSpace, SortType } from '../../const';


describe('test Sort component', () => {
  it('should contain <ul>', () => {
    const initialState = {
      [NameSpace.App]: {
        city: '',
        sortType: SortType.Popular,
        errorMessage: 'test404',
      }
    };

    const preparedComponent = withStore(<Sort />, initialState).withStoreComponent;

    render(preparedComponent);
    expect(screen.getByTestId('sort-ul')).toBeInTheDocument();
  });

  it('should contain SortType items in ul', () => {
    const initialState = {
      [NameSpace.App]: {
        city: '',
        sortType: SortType.Popular,
        errorMessage: 'test404',
      }
    };

    const preparedComponent = withStore(<Sort />, initialState).withStoreComponent;

    render(preparedComponent);
    Object.entries(SortType).map(([, value]) => expect(screen.getByTestId(value)));
  });
});
