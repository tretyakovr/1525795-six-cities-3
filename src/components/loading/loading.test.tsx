import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('test loading component', () => {
  it('should contain "Loading"', () => {
    const expectedText = /loading/i;

    render(<Loading />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
