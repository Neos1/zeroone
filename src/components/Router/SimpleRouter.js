import React from 'react';
import {
  MemoryRouter, Route, Switch, withRouter,
} from 'react-router-dom';

import Login from '../Login';
import CreateWallet from '../CreateWallet';
import InputSeed from '../InputSeed';
import ShowSeed from '../ShowSeed';
import ProjectList from '../ProjectList';
import CreateNewProject from '../CreateNewProject';
import CreateNewProjectWithTokens from '../CreateNewProjectWithTokens';
import CreateNewProjectWithoutTokens from '../CreateNewProjectWithoutTokens';
import AddExistingProject from '../AddExisitingProject';
import AddNewProject from '../AddNewProject';
import ProjectUploading from '../ProjectUploading';

const SimpleRouter = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/" exact component={withRouter(Login)} />
      <Route path="/create" exact component={withRouter(CreateWallet)} />
      <Route path="/showSeed" exact component={withRouter(ShowSeed)} />
      <Route path="/checkSeed" exact component={withRouter(InputSeed)} />
      <Route path="/projects" exact component={withRouter(ProjectList)} />
      <Route path="/createProject" exact component={withRouter(AddNewProject)} />
      <Route path="/addExisting" exact component={withRouter(AddExistingProject)} />
      <Route path="/newProject" exact component={withRouter(CreateNewProject)} />
      <Route path="/createWithTokens" exact component={withRouter(CreateNewProjectWithTokens)} />
      <Route path="/createWithoutTokens" exact component={withRouter(CreateNewProjectWithoutTokens)} />
      <Route path="/uploading" exact component={withRouter(ProjectUploading)} />
    </Switch>
  </MemoryRouter>
);
export default SimpleRouter;
