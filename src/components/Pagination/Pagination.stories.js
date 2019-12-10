import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import Pagination from '.';

storiesOf('Pagination', module)
  .add('Default', () => (
    <Pagination
      activePage={1}
      lastPage={10}
      handlePageChange={() => {}}
      itemsCountPerPage={10}
      totalItemsCount={100}
      pageRangeDisplayed={5}
    />
  ))
  .add('Short', () => (
    <Pagination
      activePage={1}
      lastPage={3}
      handlePageChange={() => {}}
      itemsCountPerPage={10}
      totalItemsCount={21}
      pageRangeDisplayed={5}
    />
  ));
