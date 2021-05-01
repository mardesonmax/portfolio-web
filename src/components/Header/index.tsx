import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCode, FiUser, FiSmartphone } from 'react-icons/fi';

import { Link, NavLink } from 'react-router-dom';
import { Container } from './styled';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import avatarSvg from '../../assets/avatar.svg';
import ButtonTheme from '../ButtonTheme';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
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
                <img src={avatarSvg} alt="Avatar" />
                <span>{`${user.name.split(' ')[0]}`}</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/projects">
              <FiCode />
              <span>Portfólio</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/about">
              <FiUser />
              <span>Sobre mim</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact">
              <FiSmartphone />
              <span>Contato</span>
            </NavLink>
          </li>

          <li>
            <ButtonTheme />
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Header;
