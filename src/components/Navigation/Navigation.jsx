import { NavLink } from 'react-router-dom';
import css from './Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={'top-menu'}>
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
