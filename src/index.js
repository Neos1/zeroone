import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import SimpleRouter from './components/Router/SimpleRouter';
import './assets/styles/style.scss';

/**
 * Represents a book.
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

render(
  <Provider>
    <SimpleRouter />
  </Provider>,
  document.getElementById('root'),
);
