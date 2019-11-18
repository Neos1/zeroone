/* eslint-disable react/no-unused-state */
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
      onSuccess: (form) => new Promise((resolve, reject) => {
        this.createToken(form).then(resolve()).catch(reject());
      }),
      onError: () => {
        this.showValidationError();
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      position: 'token',
      step: 1,
      tokenAddr: '',
      disabled: false,
    };
  }


  returnToContractConnecting = () => {
    this.setState({
      position: 'tokenCreated',
    });
  }

  createToken = (form) => {
    const { appStore, userStore, t } = this.props;
    this.setState({
      position: 'creation',
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
                // eslint-disable-next-line no-unused-vars
                  const interval = setInterval(() => {
                  // eslint-disable-next-line consistent-return
                    appStore.checkReceipt(hash).then((receipt) => {
                      if (receipt) {
                        this.setState({
                          tokenAddr: receipt.contractAddress,
                          position: 'tokenCreated',
                        });
                        appStore.deployArgs = [receipt.contractAddress];
                        clearInterval(interval);
                      }
                    }).catch(() => { appStore.displayAlert(t('errors:hostUnreachable'), 3000); });
                  }, 5000);
                });
                resolve();
              } else {
                this.setState({
                  position: 'token',
                  step: 1,
                });
                appStore.displayAlert(t('errors:lowBalance'), 3000);
                reject();
              }
            });
          }
        }).catch(() => {
          this.setState({
            position: 'token',
            step: 1,
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
    this.setState({
      position: 'projectInfo',
      step: 2,
    });
  }


  gotoUploading = (form) => {
    const { userStore, appStore, t } = this.props;
    const { name, password } = form.values();
    appStore.name = name;
    appStore.password = password;
    this.setState({ disabled: true });
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
                disabled: false,
              });
              appStore.displayAlert(t('errors:lowBalance'), 3000);
            }
          });
      })
      .catch(() => {
        this.setState({
          position: 'projectInfo',
          step: 2,
          disabled: false,
        });
        appStore.displayAlert(t('errors:tryAgain'), 3000);
      });
  }

  render() {
    const { appStore, t } = this.props;
    const { position, step, disabled } = this.state;
    if (position === 'uploading') return <Redirect to="/uploadWithNewTokens" />;
    const { gotoUploading } = this;
    const CreateProject = new CreateProjectForm({
      hooks: {
        onSuccess(form) {
          return new Promise(() => {
            gotoUploading(form);
          });
        },
        onError() {
          appStore.displayAlert(t('errors:validationError'), 3000);
        },
      },
    });
    return (
      <Container>
        <div className={styles.form}>
          <StepIndicator step={step} count={2} />
          {position === 'token' ? <CreateTokenData form={this.form} /> : ''}
          {position === 'creation' ? <LoadingBlock /> : ''}
          {position === 'tokenCreated' ? <TokenCreationAlert onSubmit={this.gotoProjectInfo} /> : ''}
          {position === 'projectInfo' ? <InputProjectData form={CreateProject} disabled={disabled} onClick={this.returnToContractConnecting} /> : ''}
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
                {(balances[address.replace('0x', '')] / 1.0e18).toFixed(5)}
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
        <Button className="btn--default btn--black btn--310" type="submit" disabled={form.loading}>{t('buttons:create')}</Button>
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
        <IconButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          {t('buttons:back')}
        </IconButton>
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
        <Button className="btn--default btn--black btn--240" type="button" onClick={() => { onSubmit(); }}>
          {t('buttons:continue')}
        </Button>
      </div>
    </form>
  </FormBlock>
));

const InputProjectData = withTranslation()(({
  form, disabled, onClick, t,
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
        <Button className="btn--default btn--black btn--310" disabled={disabled} type="submit"> Продолжить </Button>
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
        { step }
        {' '}
      </span>
      {t('other:from')}
      <span>
        {' '}
        { count }
        {' '}
      </span>
    </p>
    <p>
      <Indicator checked={step >= 1} />
      <Indicator checked={step >= 2} />
    </p>
  </div>
));

CreateNewProjectWithoutTokens.propTypes = {
  appStore: propTypes.object.isRequired,
  userStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};
CreateTokenData.propTypes = {
  form: propTypes.object.isRequired,
};
TokenCreationAlert.propTypes = {
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

export default CreateNewProjectWithoutTokens;
