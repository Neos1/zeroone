import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { DefaultMessage, AgreedMessage, RejectMessage, TransferSuccessMessage } from '.';

storiesOf('Messages', module)
  .add('With children & title', () => (
    <DefaultMessage
      title="test title"
    >
      <div>content Messages</div>
    </DefaultMessage>
  ))
  .add('With title', () => (
    <DefaultMessage
      title="test title"
    />
  ))
  .add('Agreed', () => (
    <AgreedMessage onButtonClick={() => {}} />
  ))
  .add('Reject', () => (
    <RejectMessage onButtonClick={() => {}} />
  ))
  .add('TransferSuccessMessage', () => (
    <TransferSuccessMessage value="0.123 TKN" onButtonClick={() => {}} />
  ));
