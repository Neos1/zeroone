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
class CreateNewProjectWithoutTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'token',
      step: 1,
    };
  }

  createToken = () => {
    this.setState({
      position: 'creation',
    });
    setTimeout(() => {
      this.setState({
        position: 'tokenCreated',
      });
    }, 2000);
  }

  gotoProjectInfo = () => {
    this.setState({
      position: 'projectInfo',
      step: 2,
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
          <StepIndicator step={step} count={2} />
          {position === 'token' ? <CreateTokenData onSubmit={this.createToken} /> : ''}
          {position === 'creation' ? <LoadingBlock /> : ''}
          {position === 'tokenCreated' ? <TokenCreationAlert onSubmit={this.gotoProjectInfo} /> : ''}
          {position === 'projectInfo' ? <InputProjectData onSubmit={this.gotoUploading} /> : ''}
        </div>
      </Container>
    );
  }
}

const CreateTokenData = ({ onSubmit }) => (
  <FormBlock>
    <Heading>
      {'Создание токенов'}
      {''}
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
      {'Создаем токены ERC20'}
      {'Это не займет много времени'}
    </Heading>
    <Loader />
  </FormBlock>
);

const TokenCreationAlert = ({ onSubmit }) => (
  <FormBlock>
    <Heading>
      {'Токены успешно созданы!'}
      {'Теперь нужно создать проект'}
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
    </p>
  </div>
);


CreateTokenData.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
TokenCreationAlert.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
InputProjectData.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
StepIndicator.propTypes = {
  step: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
};

export default CreateNewProjectWithoutTokens;
