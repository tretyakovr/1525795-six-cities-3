import { render, screen } from '@testing-library/react';
import Page404 from './page404';
import { withStore } from '../../utils/mock-component';
import { NameSpace, SortType } from '../../const';
import { withHistory } from '../../utils/mock-component';


describe('test Page404 component', () => {
  it('should contain "test404" in error message', () => {
    const initialState = {
      [NameSpace.App]: {
        city: '',
        sortType: SortType.Popular,
        errorMessage: 'test404',
      }
    };

    const expectedText = /test404/i;
    const preparedComponent = withHistory(withStore(<Page404 />, initialState).withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
