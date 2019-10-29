import React from 'react';
import {
  MemoryRouter, Route, Switch, withRouter,
} from 'react-router-dom';

import Login from '../Login';

const SimpleRouter = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/" exact component={withRouter(Login)} />
    </Switch>
  </MemoryRouter>
);
export default SimpleRouter;
