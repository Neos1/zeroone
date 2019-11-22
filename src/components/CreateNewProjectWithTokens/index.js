/* eslint-disable no-console */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {
  BlackWidestButton, BackButton,
} from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import LoadingBlock from '../LoadingBlock';
import Input from '../Input';
import StepIndicator from '../StepIndicator';
import Explanation from '../Explanation';
import {
  BackIcon, Address, TokenName, Password,
} from '../Icons';
import ConnectTokenForm from '../../stores/FormsStore/ConnectToken';
import CreateProjectForm from '../../stores/FormsStore/CreateProject';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class CreateNewProjectWithTokens extends Component {
  connectToken = new ConnectTokenForm({
    hooks: {
      onSuccess: (form) => {
        this.checkToken(form);
      },
      onError: () => {
      },
    },
  });

  createProject = new CreateProjectForm({
    hooks: {
      onSuccess: (form) => new Promise(() => {
        this.gotoUploading(form);
      }),
      onError: () => {
      },
    },
  });

  steps = {
    token: 0,
    check: 1,
    tokenChecked: 2,
    projectInfo: 3,
    uploading: 4,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStep: this.steps.token,
      indicatorStep: 1,
    };
  }

  returnToTokenAddress=() => {
    const { steps } = this;
    this.setState({
      currentStep: steps.token,
      indicatorStep: 1,
    });
  }

  checkToken = (form) => {
    const { steps } = this;
    const { address } = form.values();
    const { appStore } = this.props;
    this.setState({
      currentStep: steps.check,
    });
    appStore.checkErc(address).then(() => {
      this.setState({
        currentStep: steps.tokenChecked,
        indicatorStep: 2,
      });
      appStore.setDeployArgs([address]);
    });
  }

  gotoProjectInfo = () => {
    const { steps } = this;
    this.setState({
      currentStep: steps.projectInfo,
      indicatorStep: 3,
    });
  }

  gotoUploading = (form) => {
    const { steps } = this;
    const { appStore, userStore, t } = this.props;
    const { name, password } = form.values();
    appStore.setProjectName(name);
    userStore.setPassword(password);
    userStore.readWallet(password)
      .then(() => {
        userStore.checkBalance(userStore.address)
          .then((balance) => {
            if (balance > 0.05) {
              this.setState({
                currentStep: steps.uploading,
              });
            } else {
              this.setState({
                currentStep: steps.projectInfo,
                indicatorStep: 2,
              });
              appStore.displayAlert(t('errors:lowBalance'), 3000);
            }
          });
      })
      .catch(() => {
        this.setState({
          currentStep: steps.projectInfo,
          indicatorStep: 2,
        });
        appStore.displayAlert(t('errors:tryAgain'), 3000);
      });
  }

  renderSwitch(step) {
    const { t } = this.props;
    const { steps } = this;
    switch (step) {
      case steps.token:
        return <InputTokenAddress form={this.connectToken} onSubmit={this.checkToken} />;
      case steps.check:
        return (
          <LoadingBlock>
            <Heading>
              {t('headings:checkingTokens.heading')}
              {t('headings:checkingTokens.subheading')}
            </Heading>
          </LoadingBlock>
        );
      case steps.tokenChecked:
        return <ContractConfirmation onSubmit={this.gotoProjectInfo} />;
      case steps.projectInfo:
        return (
          <InputProjectData
            form={this.createProject}
            onClick={this.returnToTokenAddress}
          />
        );
      default:
        return '';
    }
  }

  render() {
    const { steps } = this;
    const { currentStep, indicatorStep } = this.state;
    if (currentStep === steps.uploading) return <Redirect to="/uploadWithExistingTokens" />;
    return (
      <Container>
        <div className={styles.form}>
          <StepIndicator currentStep={indicatorStep} stepCount={3} />
          {this.renderSwitch(currentStep)}
        </div>
      </Container>
    );
  }
}

const InputTokenAddress = withTranslation()(({ t, form }) => (
  <FormBlock>
    <Heading>
      {t('headings:existingTokens.heading')}
      {t('headings:existingTokens.subheading')}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('address')}>
        <Address />
      </Input>
      <div className={styles.form__submit}>
        <BlackWidestButton disabled={form.loading} type="submit">
          {t('buttons:continue')}
        </BlackWidestButton>
      </div>
      <NavLink to="/newProject">
        <BackButton>
          <BackIcon />
          {t('buttons:back')}
        </BackButton>
      </NavLink>
    </form>
  </FormBlock>
));

const ContractConfirmation = inject('appStore')(observer(withTranslation()(({ t, appStore: { ERC }, onSubmit }) => (
  <FormBlock>
    <Heading>
      {t('headings:checkingTokensConfirm.heading')}
      <span>
        {t('headings:checkingTokensConfirm.subheading.0')}
        <br />
        {t('headings:checkingTokensConfirm.subheading.1')}
      </span>
    </Heading>
    <div>
      <div className={styles.form__wallet}>
        <p className={styles['form__wallet-label']}>{t('other:count')}</p>
        <p className={styles['form__wallet-text']}>{`${ERC.totalSupply} ${ERC.symbol}`}</p>
      </div>
      <div className={styles.form__submit}>
        <BlackWidestButton type="button" onClick={() => { onSubmit(); }}>
          {t('buttons:continue')}
        </BlackWidestButton>
      </div>
    </div>
  </FormBlock>
))));

const InputProjectData = withTranslation()(({
  t, form, onClick,
}) => (
  <FormBlock>
    <Heading>
      {t('headings:projectCreating.heading')}
      <span>
        {t('headings:projectCreating.subheading.0')}
        <br />
        {t('headings:projectCreating.subheading.1')}
      </span>
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <Input field={form.$('password')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <BlackWidestButton disabled={form.loading} type="submit">
          {t('buttons:continue')}
        </BlackWidestButton>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            {t('explanations:project.name')}
          </p>
        </Explanation>
      </div>
      <BackButton onClick={onClick}>
        <BackIcon />
        {t('buttons:back')}
      </BackButton>
    </form>
  </FormBlock>
));


CreateNewProjectWithTokens.propTypes = {
  appStore: propTypes.shape({
    checkErc: propTypes.func.isRequired,
    deployArgs: propTypes.arrayOf(propTypes.any).isRequired,
    name: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    displayAlert: propTypes.func.isRequired,
    setDeployArgs: propTypes.func.isRequired,
    setProjectName: propTypes.func.isRequired,
  }).isRequired,
  userStore: propTypes.shape({
    readWallet: propTypes.func.isRequired,
    checkBalance: propTypes.func.isRequired,
    address: propTypes.string.isRequired,
    setPassword: propTypes.func.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
};
InputTokenAddress.propTypes = {
  form: propTypes.shape({
    $: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
  }).isRequired,
};
ContractConfirmation.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
InputProjectData.propTypes = {
  form: propTypes.shape({
    $: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
  }).isRequired,
  onClick: propTypes.func.isRequired,
};

export default CreateNewProjectWithTokens;
