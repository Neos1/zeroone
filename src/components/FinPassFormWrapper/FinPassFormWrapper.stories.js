import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import FinPassFormWrapper from './FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';

const form = new FinPassForm({
  hooks: {
    onSuccess() {
      return Promise.resolve();
    },
    onError() {
      /* eslint-disable-next-line */
      console.error('error');
    },
  },
});

storiesOf('FinPassFormWrapper', module)
  .add('Default', () => (
    <FinPassFormWrapper
      form={form}
    />
  ));
