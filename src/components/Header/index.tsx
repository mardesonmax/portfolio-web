import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FiCode,
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
        <Link className="logo" to="/projects">
          <img src={logo} alt="MAXPB7" />
        </Link>

        <ul>
          <li>
            <NavLink to="/profile">
              <FiUser />
              <span>{`Olá, ${userName}`}</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/projects">
              <FiCode />
              <span>Projetos</span>
            </NavLink>
          </li>
          <li>
            <button
              className="theme"
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <span>Light</span>
              {theme === 'light' ? <FiToggleLeft /> : <FiToggleRight />}
              <span>Dark</span>
            </button>
          </li>
          <li>
            <button type="button" onClick={() => signOut()}>
              <FiLogOut />
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  ) : null;
};

export default Header;
