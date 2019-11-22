import React from 'react';
import {
  MemoryRouter, Route, Switch,
} from 'react-router-dom';

import PresentationPage from '../PresentationPage';
import PaginationPage from '../PresentationPage/PaginationPage';
import ModalsPage from '../PresentationPage/ModalsPage';
import MembersPresentationPage from '../PresentationPage/MembersPresentationPage';


const SimpleRouter = () => (
  <MemoryRouter>
    <Switch>
      <Route path="/" exact component={PresentationPage} />
      <Route path="/pagination" exact component={PaginationPage} />
      <Route path="/modals" exact component={ModalsPage} />
      <Route path="/members" exact component={MembersPresentationPage} />
    </Switch>
  </MemoryRouter>
);
export default SimpleRouter;
