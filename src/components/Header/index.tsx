import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FiCode,
  FiToggleRight,
  FiToggleLeft,
  FiUser,
  FiSmartphone,
} from 'react-icons/fi';

import { Link, NavLink } from 'react-router-dom';
import { Container } from './styled';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import { InitialState } from '../../App';

import ProfileJpg from '../../assets/profile.jpeg';

interface StateType {
  StateProps: {
    theme: InitialState;
    setTheme: Dispatch<SetStateAction<InitialState>>;
  };
}

const Header: React.FC<StateType> = ({ StateProps }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { theme, setTheme } = StateProps;
  const [scrollTop, setScrollTop] = useState(0);
  const [height, setHeight] = useState(0);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollTop(position);
  }, []);

  useEffect(() => {
    setHeight(headerRef.current?.offsetHeight || 50);
  }, [headerRef.current?.offsetHeight]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Container scrollTop={scrollTop} ref={headerRef} height={height}>
      <nav>
        <Link className="logo" to="/projects">
          <img src={logo} alt="MAXPB7" />
        </Link>

        <ul>
          {user && (
            <li>
              <NavLink to="/profile">
                <img src={ProfileJpg} alt={user.name.split(' ')[0]} />
                <span>{`${user.name.split(' ')[0]}`}</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/projects">
              <FiCode />
              <span>Projetos</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/about">
              <FiUser />
              <span>Sobre min</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact">
              <FiSmartphone />
              <span>Contato</span>
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
        </ul>
      </nav>
    </Container>
  );
};

export default Header;
