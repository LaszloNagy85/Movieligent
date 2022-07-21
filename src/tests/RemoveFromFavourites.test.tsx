import { render, screen } from '@testing-library/react';
import RemoveFromFavourites from '../components/RemoveFromFavourites';

test('renders component', () => {
  render(<RemoveFromFavourites />);
  const removeFromComponent = screen.getByTestId('remove-from-fav');
  expect(removeFromComponent).toBeInTheDocument();
});

test('contains "Remove from favourites" text', () => {
  render(<RemoveFromFavourites />);
  const removeFromComponent = screen.getByTestId('title');
  expect(removeFromComponent).toHaveTextContent('Remove from favourites');
});

test('contains the right icon element', () => {
  render(<RemoveFromFavourites />);
  const iconElement = screen.getByRole('img');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveAttribute('class', 'bi bi-heart');
  expect(iconElement).toHaveAttribute('fill', 'white');
});