import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import Home from 'pages/Home/Home';

const Movies = lazy(() => import('pages/Movies/Movies'));
//import Movies from 'pages/Movies/Movies';
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
//import MovieDetails from 'pages/MovieDetails/MovieDetails';
const Cast = lazy(() => import('./Cast/Cast'));
//import Cast from './Cast/Cast';
const Review = lazy(() => import('./Review/Review'));
//import Review from './Reviews/Reviews';

const SharedLayout = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
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
