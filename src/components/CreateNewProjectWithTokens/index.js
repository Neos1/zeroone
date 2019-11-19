/* eslint-disable no-console */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button, IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Loader from '../Loader';
import Indicator from '../Indicator';
import Explanation from '../Explanation';
import {
  BackIcon, Address, TokenName, Password,
} from '../Icons';
import ConnectTokenForm from '../../stores/FormsStore/ConnectToken';
import CreateProjectForm from '../../stores/FormsStore/CreateProject';


import styles from '../Login/Login.scss';
import Input from '../Input';

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
      step: 1,
      disabled: false,
    };
  }

  returnToTokenAddress=() => {
    const { steps } = this;
    this.setState({
      currentStep: steps.token,
      step: 1,
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
        step: 2,
      });
      appStore.deployArgs = [address];
    });
  }

  gotoProjectInfo = () => {
    const { steps } = this;
    this.setState({
      currentStep: steps.projectInfo,
      step: 3,
    });
  }

  gotoUploading = (form) => {
    const { steps } = this;
    const { appStore, userStore, t } = this.props;
    const { name, password } = form.values();
    this.setState({ disabled: true });
    appStore.name = name;
    appStore.password = password;
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
                step: 2,
                disabled: false,
              });
              appStore.displayAlert(t('errors:lowBalance'), 3000);
            }
          });
      })
      .catch(() => {
        this.setState({
          currentStep: steps.projectInfo,
          step: 2,
          disabled: false,
        });
        appStore.displayAlert(t('errors:tryAgain'), 3000);
      });
  }

  renderSwitch(step) {
    const { disabled } = this.state;
    switch (step) {
      case 0:
        return <InputTokenAddress form={this.connectToken} onSubmit={this.checkToken} />;
      case 1:
        return <LoadingBlock />;
      case 2:
        return <ContractConfirmation onSubmit={this.gotoProjectInfo} />;
      case 3:
        return (
          <InputProjectData
            form={this.createProject}
            disabled={disabled}
            onClick={this.returnToTokenAddress}
          />
        );
      default:
        return '';
    }
  }

  render() {
    const { currentStep, step } = this.state;
    if (currentStep === 4) return <Redirect to="/uploadWithExistingTokens" />;
    return (
      <Container>
        <div className={styles.form}>
          <StepIndicator step={step} count={3} />
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
        <Button className="btn--default btn--black btn--310" disabled={form.loading} type="submit">
          {t('buttons:continue')}
        </Button>
      </div>
      <NavLink to="/newProject">
        <IconButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          {t('buttons:back')}
        </IconButton>
      </NavLink>
    </form>
  </FormBlock>
));

const LoadingBlock = withTranslation()(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:checkingTokens.heading')}
      {t('headings:checkingTokens.subheading')}
    </Heading>
    <Loader />
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
    <form>
      <div className={styles.form__wallet}>
        <p className={styles['form__wallet-label']}>{t('other:count')}</p>
        <p className={styles['form__wallet-text']}>{`${ERC.totalSupply} ${ERC.symbol}`}</p>
      </div>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black btn--310" type="button" onClick={() => { onSubmit(); }}>
          {t('buttons:continue')}
        </Button>
      </div>
    </form>
  </FormBlock>
))));

const InputProjectData = withTranslation()(({
  t, form, onClick, disabled,
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
        <Button className="btn--default btn--black btn--310" disabled={disabled} type="submit">
          {t('buttons:continue')}
        </Button>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            {t('explanations:project.name')}
          </p>
        </Explanation>
      </div>
      <IconButton className="btn--link btn--noborder btn--back" onClick={() => { onClick(); }}>
        <BackIcon />
        {t('buttons:back')}
      </IconButton>
    </form>
  </FormBlock>
));

const StepIndicator = withTranslation()(({ t, step, count }) => (
  <div className={styles['step-indicator']}>
    <p>
      {t('other:step')}
      <span>
        {' '}
        {step}
        {' '}
      </span>
      {t('other:from')}
      <span>
        {' '}
        {count}
        {' '}
      </span>
    </p>
    <p>
      <Indicator checked={step >= 1} />
      <Indicator checked={step >= 2} />
      <Indicator checked={step >= 3} />
    </p>
  </div>
));

CreateNewProjectWithTokens.propTypes = {
  appStore: propTypes.shape({
    checkErc: propTypes.func.isRequired,
    deployArgs: propTypes.arrayOf(propTypes.any).isRequired,
    name: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
    displayAlert: propTypes.func.isRequired,
  }).isRequired,
  userStore: propTypes.shape({
    readWallet: propTypes.func.isRequired,
    checkBalance: propTypes.func.isRequired,
    address: propTypes.string.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
};
InputTokenAddress.propTypes = {
  form: propTypes.func.isRequired,
};
ContractConfirmation.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
InputProjectData.propTypes = {
  form: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
};
StepIndicator.propTypes = {
  step: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
};

export default CreateNewProjectWithTokens;
