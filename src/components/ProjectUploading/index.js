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

import styles from '../Login/Login.scss';
import ProgressBlock from './ProgressBlock';
import {
  CompilingIcon, SendingIcon, TxHashIcon, TxRecieptIcon, QuestionUploadingIcon, Login,
} from '../Icons';
import { Button, IconButton } from '../Button';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class ProjectUploading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      address: '',
      loading: true,
    };
  }

  componentDidMount() {
    const { appStore, appStore: { deployArgs, name, password }, t } = this.props;
    this.setState({
      step: 1,
    });
    appStore.deployContract('project', deployArgs, password)
      .then((txHash) => {
        this.setState({
          step: 3,
        });
        const interval = setInterval(() => {
          appStore.checkReceipt(txHash).then((receipt) => {
            if (receipt) {
              this.setState({
                step: 4,
                address: receipt.contractAddress,
              });
              appStore.addProjectToList({ name, address: receipt.contractAddress });
              clearInterval(interval);
              appStore.deployQuestions(receipt.contractAddress).then(() => {
                this.setState({
                  loading: false,
                });
              });
            }
          }).catch(() => { appStore.displayAlert(t('errors:hostUnreachable'), 3000); });
        }, 2000);
      });
  }

  render() {
    const { step, loading } = this.state;
    return (
      <Container>
        <div className={`${styles.form} ${loading ? styles['form--ultrawide'] : ''}`}>
          {
            loading ? <Progress step={step} /> : <AlertBlock />
          }
        </div>
      </Container>
    );
  }
}

const Progress = withTranslation()(inject('appStore')(observer(({ t, appStore, step }) => (
  <FormBlock>
    <Heading>
      {t('headings:uploadingProject.heading')}
      {t('headings:uploadingProject.subheading')}
    </Heading>
    <div className={styles.progress}>
      <ProgressBlock
        text={t('other:compiling')}
        index={0}
        state={step}
      >
        <CompilingIcon />
      </ProgressBlock>
      <ProgressBlock
        text={t('other:sending')}
        index={1}
        state={step}
      >
        <SendingIcon />
      </ProgressBlock>
      <ProgressBlock
        text={t('other:txHash')}
        index={2}
        state={step}
      >
        <TxHashIcon />
      </ProgressBlock>
      <ProgressBlock
        text={t('other:txReceipt')}
        index={3}
        state={step}
      >
        <TxRecieptIcon />
      </ProgressBlock>
      <ProgressBlock
        text={t('other:questionsUploading')}
        index={4}
        state={step}
        noline
      >
        <QuestionUploadingIcon />
        <span>
          {appStore.uploadedQuestion}
          {'/'}
          {appStore.countOfQuestions}
        </span>
      </ProgressBlock>
    </div>

  </FormBlock>
))));

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
    <IconButton className="btn--default btn--black btn--240" type="submit">
      {<Login />}
      {t('buttons:toCreatedProject')}
    </IconButton>
    <NavLink to="/projects">
      <Button className="btn--text btn--link" type="submit">{t('buttons:otherProject')}</Button>
    </NavLink>
  </FormBlock>
));

// //ProjectUploading.propTypes = {};
ProjectUploading.propTypes = {
  appStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};
Progress.propTypes = {
  step: propTypes.number.isRequired,
  appStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};

export default ProjectUploading;
