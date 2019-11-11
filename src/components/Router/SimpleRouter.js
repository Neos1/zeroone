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
import CreationAlert from '../CreationAlert';
import DisplayUserInfo from '../DisplayUserInfo';


const SimpleRouter = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/" exact component={withRouter(Login)} />
      <Route path="/create" exact component={withRouter(CreateWallet)} />
      <Route path="/showSeed" exact component={withRouter(ShowSeed)} />
      <Route path="/checkSeed" exact component={withRouter(() => (<InputSeed recover={false} />))} />
      <Route path="/restore" exact component={withRouter(() => (<InputSeed recover />))} />
      <Route path="/userInfo" exact component={withRouter(() => (<DisplayUserInfo recover />))} />
      <Route path="/recoverPassword" exact component={withRouter(() => (<CreateWallet recover />))} />
      <Route path="/creatingSuccess" exact component={withRouter(() => (<CreationAlert success />))} />
      <Route path="/recoverSuccess" exact component={withRouter(() => (<CreationAlert recover />))} />
      <Route path="/projects" exact component={withRouter(ProjectList)} />
      <Route path="/createProject" exact component={withRouter(AddNewProject)} />
      <Route path="/addExisting" exact component={withRouter(AddExistingProject)} />
      <Route path="/newProject" exact component={withRouter(CreateNewProject)} />
      <Route path="/createWithTokens" exact component={withRouter(CreateNewProjectWithTokens)} />
      <Route path="/createWithoutTokens" exact component={withRouter(CreateNewProjectWithoutTokens)} />
      <Route path="/uploadWithExistingTokens" exact component={withRouter(() => (<ProjectUploading newTokens={false} />))} />
      <Route path="/uploadWithNewTokens" exact component={withRouter(() => (<ProjectUploading newTokens />))} />
    </Switch>
  </MemoryRouter>
);
export default SimpleRouter;
