import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import Contact from '../pages/Contact';
import About from '../pages/About';
import CreateProject from '../pages/CreateProject';
import UpdateProject from '../pages/UpdateProject';
import Projects from '../pages/Projects';
import Error404 from '../pages/Error404';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/profile" exact isPrivate component={Profile} />
      <Route path="/profile/contact" isPrivate component={Contact} />
      <Route path="/profile/about" isPrivate component={About} />
      <Route path="/projects" exact isPrivate component={Projects} />
      <Route path="/projects/create" isPrivate component={CreateProject} />
      <Route
        path="/projects/:base_url/edit"
        isPrivate
        component={UpdateProject}
      />
      <Route path="*" isPrivate component={Error404} />
    </Switch>
  );
};

export default Routes;
