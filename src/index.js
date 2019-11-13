import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import rootStore from './stores/RootStore';
import Alert from './components/Alert';
import './i18n';

import './assets/styles/style.scss';
import Header from './components/Header';

const { stores } = rootStore;
render(
  <Provider appStore={stores.appStore} userStore={stores.userStore}>
    <Header />
    <SimpleRouter />
    <Alert visible={stores.appStore.alertVisible}>
      {stores.appStore.alertText}
    </Alert>
  </Provider>,
  document.getElementById('root'),
);
