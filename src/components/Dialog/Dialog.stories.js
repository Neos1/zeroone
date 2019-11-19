import React from 'react';
import { Provider } from 'mobx-react';
import { storiesOf } from '@storybook/react';
import Dialog from './Dialog';
import { VerifyIcon } from '../Icons';
import DefaultDialogFooter from './DefaultDialogFooter';
import DefinetelyAgree from './DefinetelyAgree';


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
  .add('default', () => (
    <Dialog
      name="dialog-stories"
      header="Заголовок"
      footer={(
        <DefaultDialogFooter
          dialogStore={{}}
        />
      )}
    >
      0x295856bcf02b2017607e4f61cfc1573fd05d511f
    </Dialog>
  ))
  .add('with icon', () => (
    <Dialog
      name="dialog-stories"
      header="Заголовок"
      topIcon={(<VerifyIcon />)}
      footer={(
        <DefaultDialogFooter
          dialogStore={{}}
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
        remove: () => {},
        add: () => {},
        hide: () => {},
        closing: false,
        open: true,
        dialog: 'definetely-agree',
      }}
    >
      {story()}
    </Provider>
  ))
  .add('Definetely Agree', () => (<DefinetelyAgree dialogStore={{}} />));
