/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import rootStore from './stores/RootStore';
import Alert from './components/Alert';
import { TransactionProgress } from './components/Progress';
import './i18n';

import './assets/styles/style.scss';

const { ipcRenderer } = window.require('electron');
window.ipcRenderer = ipcRenderer;

const {
  userStore,
  appStore,
  dialogStore,
  membersStore,
  projectStore,
  notificationStore,
  configStore,
} = rootStore;

render(
  <Provider
    appStore={appStore}
    userStore={userStore}
    dialogStore={dialogStore}
    membersStore={membersStore}
    projectStore={projectStore}
    notificationStore={notificationStore}
    configStore={configStore}
  >
    <SimpleRouter />
    <Alert />
  </Provider>,
  document.getElementById('root'),
);
