import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMoviesCast } from 'utils/fetchAPI';

const Cast = () => {
  const { id } = useParams();
  //  const location = useLocation();
  const [cast, setCast] = useState([]);
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (!id) return;
    getMoviesCast(id)
      .then(data => {
        if (!data) return;
        setCast(data);
        console.dir(data);
      })
      .catch(error => console.log(error));
  }, []);

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
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '120px',
                  padding: '10px',
                }}
                key={actor?.id}
              >
                <img src={`${BASE_URL}${actor.profile_path}`} width="80" />
                <p style={{ fontSize: '14px' }}>{actor?.original_name}</p>
                <p style={{ fontSize: '12px', color: 'gray' }}>
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
