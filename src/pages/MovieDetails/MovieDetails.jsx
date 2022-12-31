import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieById } from 'utils/fetchAPI';

const MovieDetails = () => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const { id } = useParams();
  const location = useLocation();
  const [movieData, setMovieData] = useState({ genres: [] });

  useEffect(() => {
    const setUpMoviesDetails = () => {
      if (!id) return;
      getMovieById(id)
        .then(data => {
          if (!data || data.id === id) return;
          setMovieData(data);
          console.dir(data);
        })
        .catch(error => console.log(error));
    };
    setUpMoviesDetails();
  }, [id]);

  return (
    <div>
      <Link to={location.state?.from ?? '/'}>Go back</Link>

      {movieData?.poster_path && (
        <img src={`${BASE_URL}${movieData?.poster_path}`} alt="" width="180" />
      )}
      <h2>
        {movieData?.title}
        <span style={{ marginLeft: '0.5em', fontWeight: '400' }}>
          (
          {parseInt(
            movieData?.release_date ||
              movieData?.first_air_date ||
              'Once apone a time'
          )}
          )
        </span>
      </h2>
      <p>
        User score:{' '}
        {movieData?.vote_average
          ? Number(movieData?.vote_average).toFixed(1)
          : 'Not rated yet'}
      </p>
      <h3>Overview</h3>
      <p>{movieData?.overview ?? 'There is no overview yet'}</p>
      <h3>Genres</h3>
      <p>{movieData?.genres.map(genre => genre.name).join(', ')}</p>

      <Link to="cast" state={location.state}>
        Cast
      </Link>

      <Link to="reviews" state={location.state}>
        Reviews
      </Link>

      <Outlet />
    </div>
  );
};
export default MovieDetails;
