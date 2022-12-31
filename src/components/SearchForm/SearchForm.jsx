import { useState } from 'react';
import PropTypes from 'prop-types';
//import css from "./SearchForm.module.scss";

const SearchForm = ({ setSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (!input) return;
    setSearch({ query: input });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <input
        className=""
        type="text"
        name="input"
        value={input}
        placeholder="Enter movie name..."
        onChange={event => setInput(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

SearchForm.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default SearchForm;
