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
  constructor(props) {
    super(props);
    this.state = {
      position: 'token',
      step: 1,
    };
  }

  returnToTokenAddress=() => {
    this.setState({
      position: 'token',
      step: 1,
    });
  }

  checkToken = (form) => {
    const { address } = form.values();
    const { appStore } = this.props;
    this.setState({
      position: 'check',
    });
    appStore.checkErc(address).then(() => {
      this.setState({
        position: 'tokenChecked',
        step: 2,
      });
      appStore.deployArgs = [address];
    });
  }

  gotoProjectInfo = () => {
    this.setState({
      position: 'projectInfo',
      step: 3,
    });
  }

  gotoUploading = (form) => {
    const { appStore, userStore, t } = this.props;
    const { name, password } = form.values();
    appStore.name = name;
    appStore.password = password;
    userStore.readWallet(password)
      .then(() => {
        userStore.checkBalance(userStore.address)
          .then((balance) => {
            if (balance > 0.05) {
              this.setState({
                position: 'uploading',
              });
            } else {
              this.setState({
                position: 'projectInfo',
                step: 2,
              });
              appStore.displayAlert(t('errors:lowBalance'), 3000);
            }
          });
      })
      .catch(() => {
        this.setState({
          position: 'projectInfo',
          step: 2,
        });
        appStore.displayAlert(t('errors:tryAgain'), 3000);
      });
  }

  render() {
    const { position, step } = this.state;
    if (position === 'uploading') return <Redirect to="/uploadWithExistingTokens" />;
    const { gotoUploading, checkToken } = this;
    const connectToken = new ConnectTokenForm({
      hooks: {
        onSuccess(form) {
          checkToken(form);
        },
        onError() {
        },
      },
    });

    const createProject = new CreateProjectForm({
      hooks: {
        onSuccess(form) {
          gotoUploading(form);
        },
        onError() {
        },
      },
    });
    return (
      <Container>
        <div className={styles.form}>
          <StepIndicator step={step} count={3} />
          {position === 'token' ? <InputTokenAddress form={connectToken} onSubmit={this.checkToken} /> : ''}
          {position === 'check' ? <LoadingBlock /> : ''}
          {position === 'tokenChecked' ? <ContractConfirmation onSubmit={this.gotoProjectInfo} /> : ''}
          {position === 'projectInfo' ? <InputProjectData form={createProject} onClick={this.returnToTokenAddress} /> : ''}
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
        <Button className="btn--default btn--black" disabled={form.loading} type="submit">
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
      {t('headings:checkingTokensConfirm.subheading')}
    </Heading>
    <form>
      <div className="form__token">
        <div className="form__token-half">
          <p className="form__token-label">Символ токена</p>
          <p className="form__token-value">{ERC.symbol}</p>
        </div>
        <div className="form__token-divider" />
        <div className="form__token-half">
          <p className="form__token-label">Баланс</p>
          <p className="form__token-value">{ERC.totalSupply}</p>
        </div>
      </div>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="button" onClick={() => { onSubmit(); }}>
          {t('buttons:continue')}
        </Button>
      </div>
    </form>
  </FormBlock>
))));

const InputProjectData = withTranslation()(({ t, form, onClick }) => (
  <FormBlock>
    <Heading>
      {t('headings:projectCreating.heading')}
      {t('headings:projectCreating.subheading')}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <Input field={form.$('password')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" disabled={form.loading} type="submit">
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
  <div className="step-indicator">
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
  appStore: propTypes.object.isRequired,
  userStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};
InputTokenAddress.propTypes = {
  form: propTypes.object.isRequired,
};
ContractConfirmation.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
InputProjectData.propTypes = {
  form: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
};
StepIndicator.propTypes = {
  step: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
};

export default CreateNewProjectWithTokens;
