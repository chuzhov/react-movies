import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import NewsList from '../NewsList/NewsList';
import { getMoviesByQuery } from 'utils/fetchAPI';
import { Link, useLocation } from 'react-router-dom';

const MoviesGallery = ({ search, setSearch }) => {
  const query = search.get('query');
  //  const page = Number(search.get("page"));

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1); //getting page from state nor from search
  const [isLoading, setIsLoading] = useState(false);

  const updatePage = () => {
    //  setSearch({ query, page: page + 1 });
    setSearch({ query });
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (!query) return;
    const updateSearch = () => {
      setIsLoading(true);
      getMoviesByQuery(query, page)
        .then(data => {
          setMovies(movies =>
            page === 1 ? data.results : [...movies, ...data.results]
          );
          page === 1 && setTotalResults(data.total_results);
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    };

    updateSearch();
  }, [page, query]);

  const location = useLocation();

  return (
    <>
      {/* <NewsList movies={movies} page={page} /> */}
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      {isLoading && <h1>Loading...</h1>}
      {movies.length > 0 && movies.length < totalResults && (
        <Button onClick={updatePage} />
      )}
    </>
  );
};

//MoviesGallery.propTypes = {
// searchInput: PropTypes.func.isRequired,
//};

export default MoviesGallery;
