/* eslint-disable no-console */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { Button, IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
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
    appStore.checkErc(address).then(({ totalSupply, symbol }) => {
      console.log(totalSupply, symbol);
      this.setState({
        position: 'tokenChecked',
        step: 2,
      });
    });
  }

  gotoProjectInfo = () => {
    this.setState({
      position: 'projectInfo',
      step: 3,
    });
  }

  gotoUploading = () => {
    this.setState({
      position: 'uploading',
    });
  }

  render() {
    const { position, step } = this.state;
    if (position === 'uploading') return <Redirect to="/uploading" />;
    const { gotoUploading, checkToken } = this;
    const connectToken = new ConnectTokenForm({
      hooks: {
        onSuccess(form) {
          checkToken(form);
        },
        onError(form) {
          console.log(`ALARM ${form}`);
        },
      },
    });

    const createProject = new CreateProjectForm({
      hooks: {
        onSuccess(form) {
          gotoUploading();
          console.log(form.values());
        },
        onError(form) {
          console.log(form);
        },
      },
    });
    return (
      <Container>
        <Header />
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

const InputTokenAddress = ({ form }) => (
  <FormBlock>
    <Heading>
      {'Подключение контракта'}
      {'Владелец этого контракта будет считаться и владельцем создаваемого проекта'}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('address')}>
        <Address />
      </Input>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="submit"> Продолжить </Button>
      </div>
      <NavLink to="/newProject">
        <IconButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          Назад
        </IconButton>
      </NavLink>
    </form>
  </FormBlock>
);

const LoadingBlock = () => (
  <FormBlock>
    <Heading>
      {'Проверяем адрес контракта'}
      {'Это не займет много времени'}
    </Heading>
    <Loader />
  </FormBlock>
);

const ContractConfirmation = inject('appStore')(observer(({ appStore: { ERC }, onSubmit }) => (
  <FormBlock>
    <Heading>
      {'Контракт успешно подключен!'}
      {'Проверьте правильность данных перед тем, как продолжить'}
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
        <Button className="btn--default btn--black" type="button" onClick={() => { onSubmit(); }}> Продолжить </Button>
      </div>
    </form>
  </FormBlock>
)));

const InputProjectData = ({ form, onClick }) => (
  <FormBlock>
    <Heading>
      {'Создание проекта'}
      {'Контракт проекта будет загружен в сеть при помощи кошелька'}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <Input field={form.$('password')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="submit"> Продолжить </Button>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            Название задается вами и отображается в списке проектов
          </p>
        </Explanation>
      </div>
      <IconButton className="btn--link btn--noborder btn--back" onClick={() => { onClick(); }}>
        <BackIcon />
          Назад
      </IconButton>
    </form>
  </FormBlock>
);

const StepIndicator = ({ step, count }) => (
  <div className="step-indicator">
    <p>
      Шаг
      {' '}
      <span>{step}</span>
      {' '}
      из
      {' '}
      <span>{count}</span>
    </p>
    <p>
      <Indicator checked={step >= 1} />
      <Indicator checked={step >= 2} />
      <Indicator checked={step >= 3} />
    </p>
  </div>
);

CreateNewProjectWithTokens.propTypes = {
  appStore: propTypes.object.isRequired,
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
