import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMoviesByQuery } from 'utils/fetchAPI';
import MovieCard from 'components/MovieCard/MovieCard';
import Button from '../Button/Button';
import css from './MoviesGallery.module.css';

const MoviesGallery = ({ search, setSearch }) => {
  const query = search.get('query');

  //  const page = Number(search.get("page"));

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1); //getting page from state nor from search
  // const [isLoading, setIsLoading] = useState(false);

  const updatePage = () => {
    //  setSearch({ query, page: page + 1 });
    setSearch({ query });
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (!query) return;
    const updateSearch = () => {
      //    setIsLoading(true);
      getMoviesByQuery(query, page)
        .then(data => {
          setMovies(movies =>
            page === 1 ? data.results : [...movies, ...data.results]
          );
          page === 1 && setTotalResults(data.total_results);
        })
        .catch(err => console.log(err));
      //       .finally(() => setIsLoading(false));
    };

    updateSearch();
  }, [page, query]);

  const location = useLocation();

  return (
    <div className={css['container']}>
      <ul className={css['movie-gallery']}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movieData={movie} location={location} />
        ))}
      </ul>

      {movies.length > 0 && movies.length < totalResults && (
        <Button onClick={updatePage} />
      )}
    </div>
  );
};

MoviesGallery.propTypes = {
  search: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default MoviesGallery;
