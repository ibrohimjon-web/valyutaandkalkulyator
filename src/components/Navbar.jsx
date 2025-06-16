import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className='navbar'>
      <div className='navbar-wrapper'>
        <NavLink to='/' className='logo'>
          💱 KursApp
        </NavLink>
        <ul className='links'>
          <li className='link'>
            <NavLink to='/' className='linka'>
              Home
            </NavLink>
          </li>
          <li className='link'>
            <NavLink to='/kalkulyator' className='linka'>
              Kalkulyator
            </NavLink>
          </li>
          <li className='link'>
            <NavLink to='/valyuta' className='linka'>
              Valyuta kurs
            </NavLink>
          </li>
        </ul>
        <button className='theme-toggle' onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
