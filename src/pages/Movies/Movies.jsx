import { useSearchParams } from 'react-router-dom';
import SearchForm from 'components/SearchForm/SearchForm';
import MoviesGallery from 'components/MoviesGallery/MoviesGallery';

const Movies = () => {
  const [search, setSearchParams] = useSearchParams();
  return (
    <div className="movies-page">
      <SearchForm setSearch={setSearchParams} />
      <MoviesGallery search={search} setSearch={setSearchParams} />
    </div>
  );
};

export default Movies;
