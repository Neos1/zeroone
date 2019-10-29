import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import './assets/styles/style.scss';
import rootStore from './stores/RootStore';

const { stores } = rootStore;
render(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Provider {...stores}>
    <SimpleRouter />
  </Provider>,
  document.getElementById('root'),
);
