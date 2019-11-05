import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { Button } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import Loader from '../Loader';
import Indicator from '../Indicator';


import styles from '../Login/Login.scss';

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

  checkToken = () => {
    this.setState({
      position: 'check',
    });
    setTimeout(() => {
      this.setState({
        position: 'tokenChecked',
        step: 2,
      });
    }, 2000);
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
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          <StepIndicator step={step} count={3} />
          {position === 'token' ? <InputTokenAddress onSubmit={this.checkToken} /> : ''}
          {position === 'check' ? <LoadingBlock /> : ''}
          {position === 'tokenChecked' ? <ContractConfirmation onSubmit={this.gotoProjectInfo} /> : ''}
          {position === 'projectInfo' ? <InputProjectData onSubmit={this.gotoUploading} /> : ''}
        </div>
      </Container>

    );
  }
}

const InputTokenAddress = ({ onSubmit }) => (
  <FormBlock>
    <Heading>
      {'Подключение контракта'}
      {'Владелец этого контракта будет считаться и владельцем создаваемого проекта'}
    </Heading>
    <form>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="button" onClick={() => { onSubmit(); }}> Продолжить </Button>
      </div>
    </form>
    <NavLink to="/uploading">upload</NavLink>
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

const ContractConfirmation = ({ onSubmit }) => (
  <FormBlock>
    <Heading>
      {'Контракт успешно подключен!'}
      {'Проверьте правильность данных перед тем, как продолжить'}
    </Heading>
    <form>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="button" onClick={() => { onSubmit(); }}> Продолжить </Button>
      </div>
    </form>
  </FormBlock>
);

const InputProjectData = ({ onSubmit }) => (
  <FormBlock>
    <Heading>
      {'Создание проекта'}
      {'Контракт проекта будет загружен в сеть при помощи кошелька'}
    </Heading>
    <form>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="button" onClick={() => { onSubmit(); }}> Продолжить </Button>
      </div>
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


InputTokenAddress.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
ContractConfirmation.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
InputProjectData.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
StepIndicator.propTypes = {
  step: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
};

export default CreateNewProjectWithTokens;
