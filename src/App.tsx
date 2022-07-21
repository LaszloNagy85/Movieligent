import { useCallback, useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Movie, MoviesData } from './interfaces/movieInterfaces';
import MovieList from './components/MovieList';
import MovieListHeader from './components/MovieListHeader';
import MovieListSearch from './components/MovieListSearch';
import AddToFavourites from './components/AddToFavourites';
import RemoveFromFavourites from './components/RemoveFromFavourites';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  const [movies, setMovies] = useState<MoviesData>();
  const [search, setSearch] = useState<string>('');
  const [overrideSearch, setOverrideSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<Movie[]>([]);
  
  const url = `https://api.themoviedb.org/3${search !== '' ? '/search' : ''}/movie${search === '' ? '/now_playing' : ''}?api_key=f8c148ed712ce576d7c3d640b9d0d3ab${ search !== '' ? '&query=' + search : '' }`
  
  const fetchAndSetMovies = useCallback( async (page?: number) => {
    if (search === '' || search.length > 2 || overrideSearch || page) {
      setIsLoading(true);
      const resp = (await fetch(url + (page ? `&page=${page}` : ''))).json();
      setMovies(await resp);
      setOverrideSearch(false);
      setIsLoading(false);
    }
  },[search, overrideSearch, url]);
  
  useEffect(() => {
    fetchAndSetMovies();
  }, [fetchAndSetMovies]);

  useEffect(() => {
    const localStorageSavedFavourites = localStorage.getItem('movieligent-favourite-movies');
    setFavourites(localStorageSavedFavourites ? JSON.parse(localStorageSavedFavourites) : []);
  }, [])

  const addMovieToFavourites = (movie: Movie) => {
    const newState = favourites.find(favMovie => { return favMovie.id === movie.id }) ? favourites : [...favourites, movie]
    saveFavourites(newState);
  };
  const removeMovieFromFavourites = (movie: Movie) => {
    const newState = favourites.filter(favMovie => { return favMovie.id !== movie.id });
    saveFavourites(newState);
  };

  const saveFavourites = (favouritesToSave: Movie[]) => {
    setFavourites(favouritesToSave);
    saveFavouritesToLocalStorage(favouritesToSave);
  }

  const saveFavouritesToLocalStorage = (movies: Movie[]) => {
    localStorage.setItem('movieligent-favourite-movies', JSON.stringify(movies));
  }

  // Basic filter for favourites too, based on search. It works on every search change.
  const filteredFavourites = useMemo(() => {
    if (favourites) {
      if (search !== '') {
        const searchInLowerCase = search.toLowerCase();
        return favourites.filter(function(favMovie){
          return favMovie.title.toLowerCase().includes(searchInLowerCase) || favMovie.original_title.toLowerCase().includes(searchInLowerCase);
        });
      }
      return favourites;
    }
    return [];
  },[favourites, search]);

  return (
    <>
      <div className="container-fluid app-container" data-testid="app-container">
        <div className="row d-flex align-items-center justify-content-between my-3 mx-5">
          <MovieListHeader headerText="Movieligent" mainHeader={true} />
          <MovieListSearch search={search} setSearch={setSearch} setOverrideSearch={setOverrideSearch}/>
        </div>
        <div className="row d-flex align-items-center justify-content-between my-3 mr-5">
          <MovieListHeader headerText="Favourites" />
        </div>
        {favourites.length ? 
          filteredFavourites.length ?
            <MovieList 
              movies={filteredFavourites} 
              FavouriteComponent={RemoveFromFavourites} 
              handleFavourites={removeMovieFromFavourites}
            />
            :
            <h5 className="m-3">No favourites matching search...</h5>
          :
          <h5 className="m-3">No favourites added yet...</h5>
        }
        <div className="row my-3 d-flex align-items-center justify-content-sm-between">
          <MovieListHeader headerText="Movies" />
          { movies && movies.total_pages > 1 &&
              <div className="col col-12 col-sm-8 text-center text-sm-end mx-sm-5">
                <button className="btn btn-text text-white btn-lg mb-1" onClick={() => fetchAndSetMovies(movies.page -1)} disabled={movies.page === 1}>{'<<'}</button>
                <span>Showing movies page {movies.page} from {movies.total_pages}</span>
                <button className="btn btn-text text-white btn-lg mb-1" onClick={() => fetchAndSetMovies(movies.page + 1)} disabled={movies.page === movies.total_pages}>{'>>'}</button>
              </div>
          }
        </div>
        {isLoading ? <LoadingSpinner /> :
          movies && movies.total_results !== 0 ?
            <MovieList 
              movies={movies ? movies.results : []} 
              FavouriteComponent={AddToFavourites} 
              handleFavourites={addMovieToFavourites}
            />
            :
            <h5 className="m-3">No results found...</h5>
        }
      </div>
    </>
  );
};