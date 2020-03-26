/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer, inject } from 'mobx-react';
import Button from '../../Button/Button';
import CreateTokenForm from '../../../stores/FormsStore/CreateToken';
import Dialog from '../../Dialog/Dialog';
import TokenInputForm from '../../Forms/TokenInputForm';
import TransactionProgress from '../../Message/TransactionProgress';
import SuccessMessage from '../../Message/SuccessMessage';
import ErrorMessage from '../../Message/ErrorMessage';
import CreateProjectInSettings from '../../../stores/FormsStore/CreateProjectInSettings';
import ProjectInputForm from '../../Forms/ProjectInputForm';

import styles from '../Settings.scss';

@withTranslation()
@inject('appStore', 'userStore', 'dialogStore')
@observer
class ContractUploading extends Component {
  tokenForm = new CreateTokenForm({
    hooks: {
      onSuccess: (form) => {
        const { contractType } = this.state;
        const {
          appStore, userStore, dialogStore, appStore: { rootStore: { Web3Service } },
        } = this.props;
        const {
          name, count, password, symbol,
        } = form.values();
        userStore.setPassword(password);
        const deployArgs = [name, symbol, Number(count)];
        dialogStore.toggle('progress_modal_contract_uploading');
        return appStore.deployContract(contractType, deployArgs, password)
          .then((txHash) => {
            appStore.setTransactionStep('txReceipt');
            return Web3Service.subscribeTxReceipt(txHash);
          })
          .then((receipt) => {
            appStore.setTransactionStep('success');
            dialogStore.toggle('success_modal_contract_uploading');
            this.setState({ address: receipt.contractAddress });
            form.clear();
          })
          .catch(() => {
            dialogStore.toggle('error_modal_contract_uploading');
          });
      },
      onError: () => {},
    },
  })

  projectForm = new CreateProjectInSettings({
    hooks: {
      onSuccess: (form) => {
        const {
          appStore, userStore, dialogStore, appStore: { rootStore: { Web3Service } },
        } = this.props;
        const {
          name, address, password,
        } = form.values();
        userStore.setPassword(password);
        const deployArgs = [address];
        dialogStore.toggle('progress_modal_contract_uploading');
        return appStore.deployContract('ZeroOne', deployArgs, password)
          .then((txHash) => {
            appStore.setTransactionStep('txReceipt');
            return Web3Service.subscribeTxReceipt(txHash);
          })
          .then((receipt) => {
            appStore.setTransactionStep('success');
            dialogStore.toggle('success_modal_contract_uploading');
            appStore.addProjectToList({ name, address: receipt.contractAddress });
            this.setState({ address: receipt.contractAddress });
            form.clear();
          })
          .catch(() => {
            dialogStore.toggle('error_modal_contract_uploading');
          });
      },
      onError: () => {},
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape().isRequired,
    appStore: PropTypes.shape().isRequired,
    userStore: PropTypes.shape().isRequired,
  }

  constructor() {
    super();
    this.state = {
      contractType: '',
      address: '',
    };
  }

  componentDidMount() {
    const { dialogStore } = this.props;
    this.setState({ contractType: 'token' });
    dialogStore.toggle('progress_modal_contract_uploading');
  }


  triggerModal = async (contractType) => {
    const { dialogStore } = this.props;
    this.setState({ contractType });
    // eslint-disable-next-line react/destructuring-assignment
    dialogStore.show('token_modal_contract_uploading');
  }

  triggerProjectModal = () => {
    const { dialogStore } = this.props;
    this.setState({ contractType: 'ZeroOne' });
    dialogStore.show('project_modal_contract_uploading');
  }

  changeFormLang =() => {
    this.projectForm.fireHook('onLangChangeHook');
  }

  render() {
    const { address, contractType } = this.state;
    const { t, dialogStore } = this.props;
    return (
      <div className={`${styles.settings__block} ${styles['settings__block--contracts']}`}>
        <h2 className={styles['settings__block-heading']}>{t('headings:creatingAndUpload')}</h2>
        <div className={styles['settings__block-content']}>
          <Button theme="white" onClick={() => { this.triggerModal('ERC20'); }}>ERC20</Button>
          <Button theme="white" onClick={() => { this.triggerModal('CustomToken'); }}>Custom tokens</Button>
          <Button theme="white" onClick={() => { this.triggerProjectModal('ZeroOne'); }}>Project</Button>
        </div>
        <Dialog
          name="token_modal_contract_uploading"
          size="md"
          footer={null}
          header={t('headings:newTokens.heading')}
        >
          <TokenInputForm form={this.tokenForm} />
        </Dialog>

        <Dialog
          name="project_modal_contract_uploading"
          size="md"
          footer={null}
          header={t('headings:projectCreating.heading')}
        >
          <ProjectInputForm form={this.projectForm} />
        </Dialog>
        <Dialog
          name="progress_modal_contract_uploading"
          size="xlg"
          footer={null}
          header={t('headings:uploadingProject.heading')}
          closeable={false}
        >
          <TransactionProgress deploy type={contractType} />
        </Dialog>
        <Dialog
          name="success_modal_contract_uploading"
          size="md"
          footer={null}
          closeable
        >
          <SuccessMessage onButtonClick={() => { dialogStore.hide(); }}>
            {`Contract address = ${address}`}
          </SuccessMessage>
        </Dialog>
        <Dialog
          name="error_modal_contract_uploading"
          size="md"
          footer={null}
          closeable
        >
          <ErrorMessage
            onButtonClick={() => { dialogStore.back(3); }}
            buttonText={t('buttons:retry')}
          />
        </Dialog>
      </div>
    );
  }
}

export default ContractUploading;
