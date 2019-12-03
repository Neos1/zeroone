import React from 'react';
import { withTranslation } from 'react-i18next';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import { VerifyIcon } from '../Icons';
// import FinPassForm from '../../stores/FormsStore/FinPassForm';

// TODO Finalize after form universal create
@inject('dialogStore')
@withTranslation()
class DefinetelyAgree extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({}).isRequired,
  };

  // finPassForm = new FinPassForm({
  //   onSuccess(form) {
  //     return form;
  //   },
  //   onError() {
  //     console.error('error');
  //   },
  // })

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <Dialog
        name="definetely-agree"
        header={t('dialogs:definetelyAgree')}
        topIcon={(<VerifyIcon />)}
      >
        definetely agree content
      </Dialog>
    );
  }
}

export default DefinetelyAgree;
