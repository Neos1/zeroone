import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import rootStore from './stores/RootStore';
import Alert from './components/Alert';
// import Header from './components/Header';
import './i18n';

import './assets/styles/style.scss';

const { userStore, appStore } = rootStore;

render(
  <Provider appStore={appStore} userStore={userStore}>

    <SimpleRouter />
    <Alert />
  </Provider>,
  document.getElementById('root'),
);
