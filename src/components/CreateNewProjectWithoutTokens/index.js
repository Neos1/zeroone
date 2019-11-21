import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { BlackWidestButton, BackButton, BlackWideButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';

import Loader from '../Loader';
import Indicator from '../Indicator';
import Explanation from '../Explanation';
import Input from '../Input';
import {
  BackIcon, Password, TokenSymbol, TokenCount, TokenName,
} from '../Icons';
import CreateTokenForm from '../../stores/FormsStore/CreateToken';
import CreateProjectForm from '../../stores/FormsStore/CreateProject';

import styles from '../Login/Login.scss';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class CreateNewProjectWithoutTokens extends Component {
  form = new CreateTokenForm({
    hooks: {
      onSuccess: (form) => {
        this.createToken(form);
      },
      onError: () => {
        this.showValidationError();
      },
    },
  });

  createProject = new CreateProjectForm({
    hooks: {
      onSuccess: (form) => {
        this.gotoUploading(form);
      },
      onError: () => {
        this.showValidationError();
      },
    },
  });

  steps = {
    token: 1,
    creation: 2,
    tokenCreated: 3,
    projectInfo: 4,
  }


  constructor(props) {
    super(props);
    this.state = {
      indicatorStep: 1,
      currentStep: this.steps.token,
    };
  }


  returnToContractConnecting = () => {
    const { steps } = this;
    this.setState({
      currentStep: steps.tokenCreated,
    });
  }

  createToken = (form) => {
    const { steps } = this;
    const { appStore, userStore, t } = this.props;
    this.setState({
      currentStep: steps.creation,
    });
    const {
      name, symbol, count, password,
    } = form.values();
    const deployArgs = [name, symbol, Number(count)];
    return new Promise((resolve, reject) => {
      userStore.readWallet(password)
        .then((data) => {
          if (!(data instanceof Error)) {
            userStore.checkBalance(userStore.address).then((balance) => {
              if (balance > 0.5) {
                appStore.deployContract('ERC20', deployArgs, password).then((hash) => {
                  const interval = setInterval(() => {
                    appStore.checkReceipt(hash).then((receipt) => {
                      if (receipt) {
                        this.setState({
                          currentStep: steps.tokenCreated,
                        });
                        appStore.setDeployArgs([receipt.contractAddress]);
                        clearInterval(interval);
                      }
                    }).catch(() => { appStore.displayAlert(t('errors:hostUnreachable'), 3000); });
                  }, 5000);
                });
                resolve();
              } else {
                this.setState({
                  currentStep: steps.token,
                  indicatorStep: 1,
                });
                appStore.displayAlert(t('errors:lowBalance'), 3000);
                reject();
              }
            });
          }
        }).catch(() => {
          this.setState({
            currentStep: steps.token,
            indicatorStep: 1,
          });
          appStore.displayAlert(t('errors:wrongPassword'), 3000);
          reject();
        });
    });
  }

  showValidationError = () => {
    const { appStore, t } = this.props;
    appStore.displayAlert(t('errors:validationError'), 3000);
  }

  gotoProjectInfo = () => {
    const { steps } = this;
    this.setState({
      currentStep: steps.projectInfo,
      indicatorStep: 2,
    });
  }


  gotoUploading = (form) => {
    const { steps } = this;
    const { userStore, appStore, t } = this.props;
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
    const { steps } = this;
    switch (step) {
      case steps.token:
        return <CreateTokenData form={this.form} />;
      case steps.creation:
        return <LoadingBlock />;
      case steps.tokenCreated:
        return <TokenCreationAlert onSubmit={this.gotoProjectInfo} />;
      case steps.projectInfo:
        return (
          <InputProjectData
            form={this.createProject}
            onClick={this.returnToContractConnecting}
          />
        );
      default:
        return '';
    }
  }

  render() {
    const { currentStep, indicatorStep } = this.state;
    if (currentStep === 'uploading') return <Redirect to="/uploadWithNewTokens" />;
    return (
      <Container>
        <div className={styles.form}>
          <StepIndicator step={indicatorStep} count={2} />
          {this.renderSwitch(currentStep)}
        </div>
      </Container>
    );
  }
}

const CreateTokenData = inject('userStore', 'appStore')(observer(withTranslation()(({
  t, userStore: { address }, appStore: { balances }, form,
}) => (
  <FormBlock>
    <Heading>
      {t('headings:newTokens.heading')}
      {t('headings:newTokens.subheading')}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <div className={`${styles.form__explanation} ${styles['form__explanation--left']}`}>
        <Explanation>
          <p>
            {t('explanations:token.left.wallet.0')}
            <br />
            {t('explanations:token.left.wallet.1')}
            <span><strong>{address}</strong></span>
          </p>
          <p>
            {t('explanations:token.left.balance')}
            <span>
              <strong>
                {Number(balances[address.replace('0x', '')]).toFixed(5)}
                {' ETH'}
              </strong>
            </span>
          </p>
          <p>
            {t('explanations:token.left.tokens.0')}
            <br />
            {t('explanations:token.left.tokens.1')}
          </p>
        </Explanation>
      </div>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <div className={styles.form__group}>
        <Input field={form.$('symbol')}>
          <TokenSymbol />
        </Input>
        <Input field={form.$('count')}>
          <TokenCount />
        </Input>
      </div>
      <Input field={form.$('password')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <BlackWidestButton type="submit" disabled={form.loading}>
          {t('buttons:create')}
        </BlackWidestButton>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            {t('explanations:token.right.symbol')}
          </p>
        </Explanation>
        <Explanation>
          <p>
            {t('explanations:token.right.count')}
          </p>
        </Explanation>
      </div>
      <NavLink to="/newProject">
        <BackButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          {t('buttons:back')}
        </BackButton>
      </NavLink>
    </form>
  </FormBlock>
))));

const LoadingBlock = withTranslation()(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:tokensCreating.heading')}
      {t('headings:tokensCreating.subheading')}
    </Heading>
    <Loader />
  </FormBlock>
));

const TokenCreationAlert = withTranslation()(({ onSubmit, t }) => (
  <FormBlock>
    <Heading>
      {t('headings:tokensCreated.heading')}
      {t('headings:tokensCreated.subheading')}
    </Heading>
    <form>
      <div className={styles.form__submit}>
        <BlackWideButton type="button" onClick={onSubmit}>
          {t('buttons:continue')}
        </BlackWideButton>
      </div>
    </form>
  </FormBlock>
));

const InputProjectData = withTranslation()(({
  form, onClick, t,
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

const StepIndicator = withTranslation()(({ t, step, count }) => (
  <div className={styles['step-indicator']}>
    <p>
      {t('other:step')}
      <span>
        {` ${step} `}
      </span>
      {t('other:from')}
      <span>
        {` ${count} `}
      </span>
    </p>
    <p>
      <Indicator checked={step >= 1} />
      <Indicator checked={step >= 2} />
    </p>
  </div>
));

CreateNewProjectWithoutTokens.propTypes = {
  appStore: propTypes.shape({
    deployContract: propTypes.func.isRequired,
    checkReceipt: propTypes.func.isRequired,
    deployArgs: propTypes.arrayOf(propTypes.any).isRequired,
    displayAlert: propTypes.func.isRequired,
    setProjectName: propTypes.func.isRequired,
    password: propTypes.string.isRequired,
    setDeployArgs: propTypes.func.isRequired,
  }).isRequired,
  userStore: propTypes.shape({
    readWallet: propTypes.func.isRequired,
    checkBalance: propTypes.func.isRequired,
    address: propTypes.string.isRequired,
    setPassword: propTypes.func.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
};
CreateTokenData.propTypes = {
  form: propTypes.shape({
    onSubmit: propTypes.func.isRequired,
    $: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
  }).isRequired,
};
TokenCreationAlert.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
InputProjectData.propTypes = {
  form: propTypes.shape({
    $: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
  }).isRequired,
  onClick: propTypes.func.isRequired,
};
StepIndicator.propTypes = {
  step: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
};

export default CreateNewProjectWithoutTokens;
