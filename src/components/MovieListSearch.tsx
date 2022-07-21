interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOverrideSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
const MovieListSearch = ({search, setSearch, setOverrideSearch} : SearchProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
    setOverrideSearch(true);
  };
  
  return(
    <div className="col col-12 col-sm-6 col-md-4">
      <input 
        data-testid="search"
        className="form-control" 
        placeholder="Search favourites and movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        data-bs-toggle="tooltip" 
        data-bs-placement="bottom" 
        title='Search in favourites will be triggered after any change in the search box, while search in global "Movies" database will be triggered after at least 3 character entered, or by pressing enter.'
      />
    </div>
  )
  }

export default MovieListSearch;