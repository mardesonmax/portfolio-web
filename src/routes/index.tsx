import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AboutView from '../pages/AboutView';
import Projects from '../pages/Projects';
import ProjectCreate from '../pages/ProjectCreate';
import ProjectUpdate from '../pages/ProjectUpdate';
import ProjectView from '../pages/ProjectView';
import Error404 from '../pages/Error404';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Projects} />
      <Route path="/profile" exact isPrivate component={Profile} />
      <Route path="/profile/contact" isPrivate component={Contact} />
      <Route path="/profile/about" exact isPrivate component={About} />
      <Route path="/about" component={AboutView} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/projects/create" isPrivate component={ProjectCreate} />
      <Route path="/projects/view/:base_url" component={ProjectView} />
      <Route
        path="/projects/edit/:base_url"
        isPrivate
        component={ProjectUpdate}
      />
      <Route
        path={process.env.REACT_APP_ROUTER_LOGIN}
        isLogged
        component={SignIn}
      />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default Routes;
