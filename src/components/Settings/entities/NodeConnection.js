import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Web3 from 'web3';
import Input from '../../Input';
import { Address } from '../../Icons';
import NodeChangeForm from '../../../stores/FormsStore/NodeChangeForm';
import Button from '../../Button/Button';

import styles from '../Settings.scss';


@withTranslation()
@inject('appStore')
@observer
class NodeConnection extends Component {
  nodeChange = new NodeChangeForm({
    hooks: {
      onSuccess: (form) => {
        // eslint-disable-next-line no-unused-vars
        const { appStore } = this.props;
        const { url } = form.values();
        const web3 = new Web3(url);
        return web3.eth.getNodeInfo()
          .then(() => {
            this.setState({ success: true });
            return appStore.nodeChange(url);
          })
          // eslint-disable-next-line consistent-return
          .catch(() => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Node is unreachable, continue anyway?')) {
              this.setState({ success: true });
              return appStore.nodeChange(url);
            }
          });
      },
      onError: () => {},
    },
  });

  static propTypes = {
    appStore: PropTypes.shape().isRequired,
    t: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      success: false,
    };
  }


  render() {
    const { nodeChange, state, props } = this;
    const { t } = props;
    const { success } = state;
    return (
      <div className={styles.settings__block}>
        <h2 className={styles['settings__block-heading']}>{t('headings:nodeConnection')}</h2>
        <div className={styles['settings__block-content']}>
          <form
            className={styles['settings__block-form']}
            form={this.nodeChange}
            onSubmit={this.nodeChange.onSubmit}
          >
            <Input field={nodeChange.$('url')}>
              <Address />
            </Input>
            <Button theme="black" size="block" type="submit">{success ? t('buttons:success') : t('buttons:continue')}</Button>
          </form>
        </div>
      </div>
    );
  }
}


export default NodeConnection;
