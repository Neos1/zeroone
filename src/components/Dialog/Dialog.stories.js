import React from 'react';
import { Provider } from 'mobx-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import Dialog from './Dialog';
import { VerifyIcon } from '../Icons';
import DefaultDialogFooter from './DefaultDialogFooter';
import DefinetelyAgree from './DefinetelyAgree';
import RejectMessage from './RejectMessage';
import TokenTransferSuccess from './TokenTransferSuccess';
import TransferTokenInProgress from './TransferTokenInProgress';

const defaultDialogStore = {
  remove: () => {},
  add: () => {},
  hide: () => {},
  closing: false,
  open: true,
};

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <Provider
      dialogStore={{
        remove: () => {},
        add: () => {},
        hide: () => {},
        closing: false,
        open: true,
        dialog: 'dialog-stories',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('Default', () => (
    <Dialog
      name="dialog-stories"
      header="Заголовок"
      footer={(
        <DefaultDialogFooter
          dialogStore={{
            ...defaultDialogStore,
          }}
        />
      )}
    >
      0x295856bcf02b2017607e4f61cfc1573fd05d511f
    </Dialog>
  ))
  .add('With icon', () => (
    <Dialog
      name="dialog-stories"
      header="Заголовок"
      topIcon={(<VerifyIcon />)}
      footer={(
        <DefaultDialogFooter
          dialogStore={{
            ...defaultDialogStore,
          }}
        />
      )}
    >
      0x295856bcf02b2017607e4f61cfc1573fd05d511f
    </Dialog>
  ));

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <Provider
      dialogStore={{
        ...defaultDialogStore,
        dialog: 'definetely-agree',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('Definetely Agree', () => (
    <DefinetelyAgree dialogStore={{}} />
  ));

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <Provider
      dialogStore={{
        ...defaultDialogStore,
        dialog: 'reject-message',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('RejectMessage', () => (
    <RejectMessage
      dialogStore={{
        ...defaultDialogStore,
      }}
    />
  ));

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <Provider
      dialogStore={{
        ...defaultDialogStore,
        dialog: 'token-transfer-success',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('TokenTransferSuccess', () => (
    <TokenTransferSuccess
      dialogStore={{}}
      value="0.134234 TKN"
    />
  ));

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <Provider
      dialogStore={{
        ...defaultDialogStore,
        dialog: 'transfer-token-in-progress',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('TransferTokenInProgress', () => (
    <TransferTokenInProgress dialogStore={{}} />
  ));
