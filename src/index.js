import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import rootStore from './stores/RootStore';
import Alert from './components/Alert';
import './i18n';

import './assets/styles/style.scss';

const { userStore, appStore, dialogStore } = rootStore;

render(
  <Provider
    appStore={appStore}
    userStore={userStore}
    dialogStore={dialogStore}
  >
    <SimpleRouter />
    <Alert />
  </Provider>,
  document.getElementById('root'),
);
