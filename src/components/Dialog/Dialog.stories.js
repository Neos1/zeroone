import React from 'react';
import { Provider } from 'mobx-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import Dialog from './Dialog';
import DefaultDialogFooter from './DefaultDialogFooter';
import {
  AgreedMessage,
  RejectMessage,
  TransferSuccessMessage,
  TokenInProgressMessage,
} from '../Message';

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
  ));

storiesOf('Dialog', module)
  .addDecorator((story) => (
    <Provider
      dialogStore={{
        ...defaultDialogStore,
        dialog: 'agreed-message',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('Agreed', () => (
    <Dialog
      name="agreed-message"
      footer={null}
    >
      <AgreedMessage
        onButtonClick={() => {}}
      />
    </Dialog>
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
  .add('Reject', () => (
    <Dialog
      name="reject-message"
      footer={null}
    >
      <RejectMessage
        onButtonClick={() => {}}
      />
    </Dialog>
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
    <Dialog
      name="token-transfer-success"
      footer={null}
      size="md"
    >
      <TransferSuccessMessage
        onButtonClick={() => {}}
        value="0.134234 TKN"
      />
    </Dialog>
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
  .add('TokenInProgress', () => (
    <Dialog
      name="transfer-token-in-progress"
      footer={null}
      closeable={false}
      size="md"
    >
      <TokenInProgressMessage
        onButtonClick={() => {}}
      />
    </Dialog>
  ));
