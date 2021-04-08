import React from 'react';
import {
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  isLogged?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isLogged = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={() => {
        if (isLogged && !!user) {
          return <Redirect to={{ pathname: '/projects' }} />;
        }

        if (isPrivate === !!user) {
          return <Component />;
        }

        if (!isPrivate && !!user) {
          return <Component />;
        }

        return <Redirect to={{ pathname: '/projects' }} />;
      }}
    />
  );
};

export default Route;
