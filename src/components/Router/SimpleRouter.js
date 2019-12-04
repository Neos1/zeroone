import React from 'react';
import {
  MemoryRouter, Route, Switch,
} from 'react-router-dom';
import Header from '../Header';
import TestPage from '../Test';

const SimpleRouter = () => (
  <MemoryRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={TestPage} />
    </Switch>
  </MemoryRouter>
);

export default SimpleRouter;
