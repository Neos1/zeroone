import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import rootStore from './stores/RootStore';
import Alert from './components/Alert';
import './i18n';

import './assets/styles/style.scss';

const { stores } = rootStore;
render(
  <Provider appStore={stores.appStore} userStore={stores.userStore}>
    <SimpleRouter />
    <Alert visible={stores.appStore.alertVisible}>
      {stores.appStore.alertText}
    </Alert>
  </Provider>,
  document.getElementById('root'),
);
