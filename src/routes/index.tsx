import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Project from '../pages/Project';
import Error404 from '../pages/Error404';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/project" isPrivate component={Project} />
      <Route path="*" isPrivate component={Error404} />
    </Switch>
  );
};

export default Routes;
