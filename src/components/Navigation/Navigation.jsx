import { NavLink } from 'react-router-dom';
import css from './Navigation.css';
import logo from '../../img/movie_logo.png';

const Navigation = () => {
  return (
    <nav>
      <ul className={'top-menu'}>
        <img src={logo} alt="site logo" height="24" />
        <li className={css['top-menu__item']}>
          <NavLink className="top-menu__link" to="/">
            Home
          </NavLink>
        </li>
        <li className={css['top-menu__item']}>
          <NavLink className="top-menu__link" to="/movies">
            Moves
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
