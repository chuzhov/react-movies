import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesCast } from 'utils/fetchAPI';
import actorAvatarFallback from '../../img/actor_avatar_fallback.jpeg';

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (!id) return;
    getMoviesCast(id)
      .then(data => {
        if (!data) return;
        setCast(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  return (
    <div>
      {cast.length > 0 && (
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {cast.map(actor => {
            return (
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  width: '120px',
                  height: '186px',
                  padding: '10px',
                }}
                key={actor?.id}
              >
                <img
                  src={
                    actor.profile_path
                      ? `${BASE_URL}${actor.profile_path}`
                      : actorAvatarFallback
                  }
                  width="80"
                  height="120"
                  loading="lazy"
                  alt={actor?.original_name}
                />
                <p
                  style={{
                    fontSize: '14px',
                    textAlign: 'center',
                    margin: '0.2rem',
                  }}
                >
                  {actor?.original_name}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    textAlign: 'center',
                    color: 'gray',
                  }}
                >
                  as {actor?.character}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cast;
