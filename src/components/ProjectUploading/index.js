import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import ProgressBlock from './ProgressBlock';
import {
  CompilingIcon, SendingIcon, TxHashIcon, TxRecieptIcon, QuestionUploadingIcon, Login,
} from '../Icons';
import Button from '../Button/Button';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class ProjectUploading extends Component {
  steps = {
    compiling: 0,
    sending: 1,
    hash: 2,
    receipt: 3,
    questions: 4,
  }

  constructor(props) {
    super(props);
    this.state = {
      step: this.steps.compiling,
      uploading: true,
      contractAddress: '',
      projectName: '',
    };
  }

  componentDidMount() {
    const { steps } = this;
    const {
      appStore, appStore: { deployArgs, projectAddress }, userStore: { password }, type,
    } = this.props;

    switch (type) {
      case ('project'):
        this.setState({
          step: steps.sending,
        });
        this.deployProject(deployArgs, password);
        break;
      case ('question'):
        this.setState({
          step: steps.questions,
        });
        appStore.deployQuestions(projectAddress).then(() => {
          this.setState({
            uploading: false,
          });
        });
        break;
      default:
        break;
    }
  }

  deployProject(deployArgs, password) {
    const { steps } = this;
    const { appStore, appStore: { name }, t } = this.props;

    appStore.deployContract('ZeroOne', deployArgs, password)
      .then((txHash) => {
        this.setState({
          step: steps.receipt,
        });
        return appStore.checkReceipt(txHash);
      })
      .then((receipt) => {
        if (receipt) {
          this.setState({
            step: steps.questions,
          });
          appStore.setProjectAddress(receipt.contractAddress);
          appStore.addProjectToList({ name, address: receipt.contractAddress });
          appStore.deployQuestions(receipt.contractAddress).then(() => {
            this.setState({
              uploading: false,
              contractAddress: receipt.contractAddress,
              projectName: name,
            });
          });
        }
      }).catch((err) => {
        alert(err);
        appStore.displayAlert(t('errors:hostUnreachable'), 3000);
      });
  }

  render() {
    const {
      step, uploading, contractAddress, projectName,
    } = this.state;
    return (
      <Container>
        <div className={`${styles.form} ${uploading ? styles['form--ultrawide'] : ''}`}>
          {
            uploading
              ? <Progress step={step} />
              : <AlertBlock address={contractAddress} name={projectName} />
          }
        </div>
      </Container>
    );
  }
}

const Progress = withTranslation()(inject('appStore')(observer(({ t, appStore, step }) => {
  const steps = [
    [t('other:compiling'), <CompilingIcon />],
    [t('other:sending'), <SendingIcon />],
    [t('other:txHash'), <TxHashIcon />],
    [t('other:txReceipt'), <TxRecieptIcon />],
    [t('other:questionsUploading'), [
      <QuestionUploadingIcon />,
      <span>
        {appStore.uploadedQuestion}
        {'/'}
        {appStore.countOfQuestions}
      </span>],
    ]];

  return (
    <FormBlock>
      <Heading>
        {t('headings:uploadingProject.heading')}
        {t('headings:uploadingProject.subheading')}
      </Heading>
      <div className={styles.progress}>
        {steps.map((item, index) => (
          <ProgressBlock
            text={item[0]}
            index={index}
            state={step}
            noline={index === 0}
          >
            {item[1]}
          </ProgressBlock>
        ))}
      </div>
    </FormBlock>
  );
})));

const AlertBlock = withTranslation()(inject('appStore')(observer(({
  t, appStore, address, name,
}) => (
  <FormBlock>
    <Heading>
      {t('headings:projectCreated.heading')}
      <span>
        {t('headings:projectCreated.subheading.0')}
        <br />
        {t('headings:projectCreated.subheading.1')}
      </span>
    </Heading>
    <NavLink to="/questions">
      <Button
        theme="black"
        width="310"
        icon={<Login />}
        type="button"
        onClick={() => { appStore.gotoProject({ address, name }); }}
      >
        {t('buttons:toCreatedProject')}
      </Button>
    </NavLink>
    <NavLink to="/projects">
      <Button theme="link" type="button">
        {t('buttons:otherProject')}
      </Button>
    </NavLink>
  </FormBlock>
))));

ProjectUploading.propTypes = {
  appStore: propTypes.shape({
    deployContract: propTypes.func.isRequired,
    checkReceipt: propTypes.func.isRequired,
    deployArgs: propTypes.array.isRequired,
    name: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    addProjectToList: propTypes.func.isRequired,
    deployQuestions: propTypes.func.isRequired,
    displayAlert: propTypes.func.isRequired,
    projectAddress: propTypes.func.isRequired,
    setProjectAddress: propTypes.func.isRequired,
  }).isRequired,
  userStore: propTypes.shape({
    password: propTypes.string.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
};

Progress.propTypes = {
  step: propTypes.number.isRequired,
  appStore: propTypes.shape({
    uploadedQuestion: propTypes.number.isRequired,
    countOfQuestions: propTypes.number.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
};

export default ProjectUploading;
