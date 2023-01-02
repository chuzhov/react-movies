import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import { getPopularMovies } from 'utils/fetchAPI';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1); //getting page from state nor from search
  const [isLoading, setIsLoading] = useState(false);

  const updatePage = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    const updateTrendings = () => {
      setIsLoading(true);
      getPopularMovies(page)
        .then(data => {
          //Removing repetitive movies the backend returns sometimes
          if (data.results.length > 0 && movies.length > 0) {
            for (let i = 0; i < movies.length; i++) {
              for (let j = 0; j < data.results.length; j++) {
                if (data.results[j].id === movies[i].id) {
                  data.results.splice(j, 1);
                }
              }
            }
          }

          setMovies(movies =>
            page === 1 ? data.results : [...movies, ...data.results]
          );

          page === 1 && setTotalResults(data.total_results);
        })

        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    };

    updateTrendings();
  }, [page]);

  const location = useLocation();

  return (
    <>
      <h2>Tranding this week:</h2>
      <ul style={{ marginBottom: '1rem' }}>
        {movies.map(movie => (
          <li key={movie.id} style={{ marginBottom: '0.4rem' }}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <p>
                {movie.title}
                <span style={{ marginLeft: '0.5rem', color: 'blueviolet' }}>
                  (
                  {parseInt(movie?.release_date || movie?.first_air_date) ??
                    'Once apone a time'}
                  )
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* {isLoading && <h1>Loading...</h1>} */}
      {movies.length > 0 && movies.length < totalResults && (
        <Button onClick={updatePage} />
      )}
    </>
  );
};

export default Home;
