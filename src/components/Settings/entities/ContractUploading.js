/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer, inject } from 'mobx-react';
import Button from '../../Button/Button';
import CreateTokenForm from '../../../stores/FormsStore/CreateToken';
import { AgreedMessage } from '../../Message';

import styles from '../Settings.scss';
import Dialog from '../../Dialog/Dialog';

@withTranslation()
@inject('appStore', 'dialogStore')
@observer
class ContractUploading extends Component {
  form = new CreateTokenForm({
    hooks: {
      onSuccess: () => {

      },
      onError: () => {

      },
    },
  })


  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape().isRequired,
  }

  constructor() {
    super();
    this.state = {
      tokenType: '',
    };
  }

  triggerModal = (tokenType) => {
    const { dialogStore } = this.props;
    this.setState({ tokenType });
    dialogStore.show('token_modal');
  }

  render() {
    const { t } = this.props;
    return (
      <div className={styles.settings__block}>
        <h2 className={styles['settings__block-heading']}>{t('headings:creatingAndUpload')}</h2>
        <div className={styles['settings__block-content']}>
          <Button theme="white" onClick={() => { this.triggerModal('ERC20'); }}>ERC20</Button>
          <Button theme="white" onClick={() => { this.triggerModal('MERC20'); }}>Custom tokens</Button>
          <Button theme="white">Project</Button>
        </div>
        <Dialog
          name="token_modal"
          size="md"
        >
          <AgreedMessage />
        </Dialog>
      </div>
    );
  }
}

export default ContractUploading;
