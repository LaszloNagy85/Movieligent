import { fireEvent, render, screen } from '@testing-library/react';
import MovieListSearch from '../components/MovieListSearch';

test("handles search input change", () => {
  const inputChange = jest.fn();
  render(<MovieListSearch search="" setSearch={inputChange} setOverrideSearch={() => {}}/>)
  const searchInputElement = screen.getByTestId('search');
  fireEvent.change(searchInputElement, { target: { value: "x" } });
  expect(inputChange).toBeCalledTimes(1);
});

test("handles search input 'Enter' keydown", () => {
  const inputEnterKeydown= jest.fn();
  render(<MovieListSearch search="" setSearch={() => {}} setOverrideSearch={inputEnterKeydown}/>)
  const searchInputElement = screen.getByTestId('search');
  fireEvent.keyDown(searchInputElement, { key: "x", keyCode: 88 });
  expect(inputEnterKeydown).toBeCalledTimes(0);
  fireEvent.keyDown(searchInputElement, { key: "Enter", keyCode: 13 });
  expect(inputEnterKeydown).toBeCalledTimes(1);
});