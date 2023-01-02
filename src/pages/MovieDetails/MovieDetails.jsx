import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieById } from 'utils/fetchAPI';
import './MovieDetails.css';

const MovieDetails = () => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const { id } = useParams();
  const location = useLocation();
  const [movieData, setMovieData] = useState({ genres: [] });

  useEffect(() => {
    const setUpMoviesDetails = () => {
      //     if (movieData.genres.length > 0) return;
      getMovieById(id)
        .then(data => {
          if (!data || data.id === id) return;
          setMovieData(data);
        })
        .catch(error => console.log(error));
    };
    setUpMoviesDetails();
  }, [id]);

  return (
    <div>
      <NavLink to={location.state?.from ?? '/'} className="go-back">
        Go back
      </NavLink>

      {movieData?.poster_path && (
        <img
          style={{ display: 'block' }}
          src={`${BASE_URL}${movieData?.poster_path}`}
          alt=""
          width="180"
        />
      )}
      <h2>
        {movieData?.title ?? 'Movie'}
        <span style={{ marginLeft: '0.5em', fontWeight: '400' }}>
          (
          {parseInt(movieData?.release_date || movieData?.first_air_date) ||
            'Once apone a time...'}
          )
        </span>
      </h2>
      <p>
        User score:{' '}
        {movieData?.vote_average
          ? Number(movieData?.vote_average).toFixed(1) +
            ' based on ' +
            movieData?.vote_count +
            ' votes'
          : 'not rated yet'}
      </p>
      <h3>Overview</h3>
      <p>{movieData?.overview ?? 'There is no overview yet'}</p>
      <h3>Genres</h3>
      <p>{movieData?.genres.map(genre => genre.name).join(', ')}</p>

      <div className="movie-details__nav-wrapper">
        <NavLink to="cast" state={location.state} className="movie-menu__link">
          Cast
        </NavLink>

        <NavLink
          to="reviews"
          state={location.state}
          className="movie-menu__link"
        >
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MovieDetails;
