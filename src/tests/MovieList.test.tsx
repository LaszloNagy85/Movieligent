import { fireEvent, render, screen } from '@testing-library/react';
import AddToFavourites from '../components/AddToFavourites';
import MovieList from '../components/MovieList';
import { Movie } from '../interfaces/movieInterfaces';
import { sampleMovies } from  './movieTestData';
import noPoster from '../images/noPoster.jpg';


test('renders MovieList component', () => {
  render(<MovieList movies={[]} FavouriteComponent={AddToFavourites} handleFavourites={() => {}}/>);
  const movieListElement = screen.getByTestId('movie-list');
  expect(movieListElement).toBeInTheDocument();
});

test('renders all movies from list', () => {
  render(<MovieList movies={sampleMovies} FavouriteComponent={AddToFavourites} handleFavourites={() => {}}/>);
  const expectedAmountOfMovieItem = sampleMovies.length;
  const movieListElement = screen.getAllByTestId('movie-item');
  expect(movieListElement).toHaveLength(expectedAmountOfMovieItem);
});

test('renders movie item image', () => {
  const testMovie: Movie = sampleMovies[0];
  const movieImgSrc = 'https://image.tmdb.org/t/p/w200' + testMovie.poster_path;
  render(<MovieList movies={[testMovie]} FavouriteComponent={AddToFavourites} handleFavourites={() => {}}/>);
  const movieImgElement = screen.getByTestId('movie-img');
  expect(movieImgElement).toBeInTheDocument();
  expect(movieImgElement).toHaveAttribute('src', movieImgSrc);
});

test('renders movie item image placeholders', () => {
  const testMovie: Movie = sampleMovies[0];
  testMovie.poster_path = null;
  render(<MovieList movies={[testMovie]} FavouriteComponent={AddToFavourites} handleFavourites={() => {}}/>);
  const movieImgElement = screen.getByTestId('movie-img');
  expect(movieImgElement).toBeInTheDocument();
  expect(movieImgElement).toHaveAttribute('src', noPoster);
  const placeholderTitleElement = screen.getByTestId('no-poster-title');
  expect(placeholderTitleElement).toBeInTheDocument()
  expect(placeholderTitleElement).toHaveTextContent(testMovie.title);
});

test('renders Favourite component and container', () => {
  const onClick = jest.fn();
  render(<MovieList movies={sampleMovies} FavouriteComponent={AddToFavourites} handleFavourites={onClick}/>);
  const favCompContainers = screen.getAllByTestId('favourite-component-container');
  expect(favCompContainers).toHaveLength(sampleMovies.length);
  const favComps = screen.getAllByTestId('add-to-fav');
  expect(favComps).toHaveLength(sampleMovies.length);

  fireEvent.click(favCompContainers[0]);
  expect(onClick).toBeCalledTimes(1);
});

test('handles Favourite component onClick', () => {
  const onClick = jest.fn();
  render(<MovieList movies={[sampleMovies[0]]} FavouriteComponent={AddToFavourites} handleFavourites={onClick}/>);
  const favCompContainer = screen.getByTestId('favourite-component-container');
  fireEvent.click(favCompContainer);
  expect(onClick).toBeCalledTimes(1);
});