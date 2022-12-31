import { lazy } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';

// const Home = lazy(() => import('pages/Home/Home'));
//const Movies = lazy(() => import('pages/Movies/Movies'));
import Movies from 'pages/Movies/Movies';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Review from './Reviews/Reviews';
import Home from 'pages/Home/Home';
// const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
// const Review = lazy(() => import('./Review/Review'));
// const Cast = lazy(() => import('./Cast/Cast'));

const SharedLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Review />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
