import React from 'react';
import { storiesOf } from '@storybook/react';
import Dialog from './Dialog';
import { VerifyIcon } from '../Icons';
import DefaultDialogFooter from './DefaultDialogFooter';


storiesOf('Dialog', module)
  .add('default', () => (
    <Dialog
      dialogStore={{
        remove: () => {},
        add: () => {},
        hide: () => {},
        closing: false,
        open: true,
        dialog: 'dialog-stories',
      }}
      name="dialog-stories"
      header="Заголовок"
      footer={(
        <DefaultDialogFooter
          dialogStore={{
            hide: () => {},
          }}
        />
      )}
    >
      0x295856bcf02b2017607e4f61cfc1573fd05d511f
    </Dialog>
  ))
  .add('with icon', () => (
    <Dialog
      dialogStore={{
        remove: () => {},
        add: () => {},
        hide: () => {},
        closing: false,
        open: true,
        dialog: 'dialog-stories',
      }}
      name="dialog-stories"
      header="Заголовок"
      topIcon={(<VerifyIcon />)}
      footer={(
        <DefaultDialogFooter
          dialogStore={{
            hide: () => {},
          }}
        />
      )}
    >
      0x295856bcf02b2017607e4f61cfc1573fd05d511f
    </Dialog>
  ));
