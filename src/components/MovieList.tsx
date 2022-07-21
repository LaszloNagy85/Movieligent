import { Movie } from "../interfaces/movieInterfaces";
import noPoster from "../images/noPoster.jpg"
import React from "react";

interface MovieListProps {
  movies: Movie[];
  FavouriteComponent: React.FC;
  handleFavourites: (movie: Movie) => void;
}

const MovieList = ({ movies, FavouriteComponent, handleFavourites }: MovieListProps) => {
  return (
    <div className="row overflow-hidden" data-testid="movie-list">
      {movies.map((movie: Movie, index: number) => (
        <div data-testid="movie-item" key={index} className="image-container d-flex justify-content-start m-3 p-0" style={{ maxWidth: '200px'}} >
          <img data-testid="movie-img" src={ movie.poster_path ? 'https://image.tmdb.org/t/p/w200' + movie.poster_path : noPoster} alt="poster" />
          { !movie.poster_path && 
            <div data-testid="no-poster-title" className="overlay-top d-flex justify-content-start align-items-center">{movie.title}</div>
          }
          <div 
            className="overlay d-flex justify-content-start align-items-center"
            onClick={() => handleFavourites(movie)}
            data-testid="favourite-component-container"
          >
            <FavouriteComponent />
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default MovieList;