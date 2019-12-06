import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import TokenTransfer from './TokenTransfer';

storiesOf('TokenTransfer', module)
  .add('Without wallet', () => (
    <TokenTransfer />
  ))
  .add('With wallet', () => (
    <TokenTransfer wallet="0x1D76FA8765AFD6F658" />
  ));
