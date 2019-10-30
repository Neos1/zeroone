import React from 'react';
import {
  MemoryRouter, Route, Switch, withRouter,
} from 'react-router-dom';

import Login from '../Login';
import CreateWallet from '../CreateWallet';
import InputSeed from '../InputSeed';

const SimpleRouter = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/" exact component={withRouter(Login)} />
      <Route path="/create" exact component={withRouter(CreateWallet)} />
      <Route path="/checkSeed" exact component={withRouter(InputSeed)} />
    </Switch>
  </MemoryRouter>
);
export default SimpleRouter;
