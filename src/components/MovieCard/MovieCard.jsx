import Ribbon from 'components/Ribbon/Ribbon';
import { Link } from 'react-router-dom';
import css from './MovieCard.module.css';

const MovieCard = ({ movieData, location }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';
  return (
    <li className={css['movie-card']}>
      <Ribbon id={movieData.id} />
      <Link to={`/movies/${movieData.id}`} state={{ from: location }}>
        {movieData?.poster_path && (
          <img
            style={{ display: 'block' }}
            src={`${BASE_URL}${movieData?.poster_path}`}
            alt=""
            width="185"
            height="274"
          />
        )}
        <p className={css['movie-rating']}>
          {movieData?.vote_average
            ? Number(movieData?.vote_average).toFixed(1) +
              ' / ' +
              movieData?.vote_count +
              ' '
            : 'not rated yet'}
        </p>
        <p className={css['movie-title']}>
          {movieData.title}
          <span
            style={{
              marginLeft: '0.5rem',
              color: 'grey',
            }}
          >
            (
            {parseInt(movieData?.release_date || movieData?.first_air_date) ||
              'Once apone a time'}
            )
          </span>
        </p>
      </Link>
    </li>
  );
};

export default MovieCard;
