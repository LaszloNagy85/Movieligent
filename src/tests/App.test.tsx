import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders all headers', () => {
  render(<App />);
  const mainHeader = screen.getByText(/Movieligent/);
  const favouritesHeader = screen.getByText(/Favourites/);
  const moviesHeader = screen.getByText(/Movies/);
  expect(mainHeader).toBeInTheDocument();
  expect(favouritesHeader).toBeInTheDocument();
  expect(moviesHeader).toBeInTheDocument();
});
