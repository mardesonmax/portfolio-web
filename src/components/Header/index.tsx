import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FiCode,
  FiHome,
  FiLogOut,
  FiToggleRight,
  FiToggleLeft,
  FiUser,
} from 'react-icons/fi';

import { Link, NavLink } from 'react-router-dom';
import { Container } from './styled';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import { InitialState } from '../../App';

interface StateType {
  StateProps: {
    theme: InitialState;
    setTheme: Dispatch<SetStateAction<InitialState>>;
  };
}

const Header: React.FC<StateType> = ({ StateProps }) => {
  const { user, signOut } = useAuth();
  const [scrollTop, setScrollTop] = useState(0);
  const { theme, setTheme } = StateProps;
  const userName = user?.name.split(' ');

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollTop(position);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return user ? (
    <Container scrollTop={scrollTop}>
      <nav>
        <Link className="logo" to="/dashboard">
          <img src={logo} alt="MAXPB7" />
        </Link>

        <ul>
          <li className="user">
            <FiUser />
            {`Olá, ${userName}`}
          </li>
          <li>
            <NavLink to="/dashboard">
              <FiHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/project">
              <FiCode />
              Projetos
            </NavLink>
          </li>
          <li>
            <button
              className="theme"
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              Light
              {theme === 'light' ? <FiToggleLeft /> : <FiToggleRight />}
              Dark
            </button>
          </li>
          <li>
            <button type="button" onClick={() => signOut()}>
              <FiLogOut />
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  ) : null;
};

export default Header;
