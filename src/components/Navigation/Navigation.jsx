import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '0.5rem',
          height: '2rem',
        }}
      >
        <li className="top-menu__item">
          <NavLink className="top-menu__nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="top-menu__item">
          <NavLink className="top-menu__nav-link" to="/movies">
            Moves
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
