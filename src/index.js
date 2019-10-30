import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import rootStore from './stores/RootStore';

import './assets/styles/style.scss';

const { stores } = rootStore;
render(
  <Provider appStore={stores.appStore} userStore={stores.userStore}>
    <SimpleRouter />
  </Provider>,
  document.getElementById('root'),
);
