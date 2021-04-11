import React from 'react';
import { FiInfo, FiPower, FiTablet, FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container } from './styled';

const ProfileMenu: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <ul>
        <li>
          <NavLink to="/profile" exact>
            <FiUser /> <span>Perfil</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile/contact">
            <FiTablet /> <span>Contatos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile/about">
            <FiInfo /> <span>Sobre mim</span>
          </NavLink>
        </li>
      </ul>

      <button type="button" onClick={() => signOut()}>
        <FiPower /> <span>Sair</span>
      </button>
    </Container>
  );
};

export default ProfileMenu;
