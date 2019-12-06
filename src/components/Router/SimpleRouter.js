import React from 'react';
import {
  MemoryRouter, Route, Switch,
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
import Header from '../Header';
import Questions from '../Questions';
import FullQuestion from '../Questions/FullQuestion';
import Members from '../Members';

const SimpleRouter = () => (
  <MemoryRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/create" exact component={CreateWallet} />
      <Route path="/showSeed" exact component={ShowSeed} />
      <Route path="/checkSeed" exact component={() => (<InputSeed recover={false} />)} />
      <Route path="/restore" exact component={() => (<InputSeed recover />)} />
      <Route path="/userInfo" exact component={() => (<DisplayUserInfo recover />)} />
      <Route path="/recoverPassword" exact component={() => (<CreateWallet recover />)} />
      <Route path="/creatingSuccess" exact component={() => (<CreationAlert success />)} />
      <Route path="/recoverSuccess" exact component={() => (<CreationAlert recover />)} />
      <Route path="/projects" exact component={ProjectList} />
      <Route path="/createProject" exact component={AddNewProject} />
      <Route path="/addExisting" exact component={AddExistingProject} />
      <Route path="/newProject" exact component={CreateNewProject} />
      <Route path="/createWithTokens" exact component={CreateNewProjectWithTokens} />
      <Route path="/createWithoutTokens" exact component={CreateNewProjectWithoutTokens} />
      <Route path="/uploadProject" exact component={() => (<ProjectUploading type="project" />)} />
      <Route path="/uploadQuestions" exact component={() => (<ProjectUploading type="question" />)} />
      <Route path="/questions" exact component={Questions} />
      <Route path="/question/:id" exact component={FullQuestion} />
      <Route path="/members" exact component={Members} />
    </Switch>
  </MemoryRouter>
);

export default SimpleRouter;
