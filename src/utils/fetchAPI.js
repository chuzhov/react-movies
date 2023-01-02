import axios from 'axios';

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;
const KEY = 'd9a5502e7ecfc2f8fab8d65f4cbb6057';
const TIME_WINDOW = 'week';

export const getPopularMovies = async page => {
  const response = await axios.get(
    `trending/movie/${TIME_WINDOW}?api_key=${KEY}&page=${page}`
  );

  return response.data;
};

export const getMoviesByQuery = async (query, page) => {
  const response = await axios.get(
    `search/movie?api_key=${KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
  );
  return response.data;
};

export const getMovieById = async id => {
  const response = await axios.get(`movie/${id}?api_key=${KEY}&language=en-US`);
  return response.data;
};

export const getMoviesCast = async id => {
  const response = await axios.get(
    `movie/${id}/credits?api_key=${KEY}&language=en-US`
  );
  return response.data.cast;
};

export const getMoviesReviews = async id => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const response = await axios.get(
    `movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
  debugger;
  if (response.data.results.length > 0) {
    response.data.results.forEach(review => {
      if (review?.author_details?.avatar_path) {
        review?.author_details?.avatar_path?.includes('gravatar')
          ? (review.author_details.avatar_path =
              review.author_details.avatar_path.slice(1))
          : (review.author_details.avatar_path =
              BASE_URL + review.author_details.avatar_path);
      }
    });
  }

  return response.data.results;
};
