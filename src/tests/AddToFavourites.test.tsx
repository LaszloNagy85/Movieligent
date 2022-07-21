import { render, screen } from '@testing-library/react';
import AddToFavourites from '../components/AddToFavourites';

test('renders component', () => {
  render(<AddToFavourites />);
  const addToFavouritesComponent = screen.getByTestId('add-to-fav');
  expect(addToFavouritesComponent).toBeInTheDocument();
});

test('contains "Add to favourites" text', () => {
  render(<AddToFavourites />);
  const addToFavouritesComponent = screen.getByTestId('title');
  expect(addToFavouritesComponent).toHaveTextContent('Add to favourites');
});

test('contains the right icon element', () => {
  render(<AddToFavourites />);
  const iconElement = screen.getByRole('img');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveAttribute('class', 'bi bi-heart-fill');
  expect(iconElement).toHaveAttribute('fill', 'red');

});