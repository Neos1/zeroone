/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
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
      address: '',
      uploading: true,
    };
  }

  componentDidMount() {
    const { steps } = this;
    const {
      appStore, appStore: { deployArgs, name }, userStore: { password }, t,
    } = this.props;
    this.setState({
      step: steps.sending,
    });

    appStore.deployContract('project', deployArgs, password)
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
            address: receipt.contractAddress,
          });
          appStore.addProjectToList({ name, address: receipt.contractAddress });
          appStore.deployQuestions(receipt.contractAddress).then(() => {
            this.setState({
              uploading: false,
            });
          });
        }
      }).catch(() => { appStore.displayAlert(t('errors:hostUnreachable'), 3000); });
  }

  render() {
    const { step, uploading } = this.state;
    return (
      <Container>
        <div className={`${styles.form} ${uploading ? styles['form--ultrawide'] : ''}`}>
          {
            uploading ? <Progress step={step} /> : <AlertBlock />
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
          >
            {item[1]}
          </ProgressBlock>
        ))}
      </div>
    </FormBlock>
  );
})));

const AlertBlock = withTranslation()(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:projectCreated.heading')}
      <span>
        {t('headings:projectCreated.subheading.0')}
        <br />
        {t('headings:projectCreated.subheading.1')}
      </span>
    </Heading>
    <Button theme="black" width="310" icon={<Login />} type="submit">
      {t('buttons:toCreatedProject')}
    </Button>
    <NavLink to="/projects">
      <Button theme="link" type="submit">
        {t('buttons:otherProject')}
      </Button>
    </NavLink>
  </FormBlock>
));

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
  }).isRequired,
  userStore: propTypes.shape({
    password: propTypes.string.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
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
