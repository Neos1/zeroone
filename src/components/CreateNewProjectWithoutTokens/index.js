/* eslint-disable react/no-unused-state */
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
import Input from '../Input';
import {
  BackIcon, Password, TokenSymbol, TokenCount, TokenName,
} from '../Icons';

import CreateTokenForm from '../../stores/FormsStore/CreateToken';
import CreateProjectForm from '../../stores/FormsStore/CreateProject';
import styles from '../Login/Login.scss';

@inject('userStore', 'appStore')
@observer
class CreateNewProjectWithoutTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'token',
      step: 1,
      tokenAddr: '',
    };
  }

  returnToContractConnecting = () => {
    this.setState({
      position: 'token',
      step: 1,
    });
  }

  createToken = (form) => {
    const { appStore } = this.props;
    this.setState({
      position: 'creation',
    });

    const { name, symbol, count } = form.values();
    const deployArgs = [name, symbol, count];
    appStore.deployContract('ERC20', deployArgs).then((hash) => {
      console.log(hash);
      // eslint-disable-next-line no-unused-vars
      const interval = setInterval(() => {
        // eslint-disable-next-line consistent-return
        appStore.checkReciept(hash).then((reciept) => {
          if (typeof reciept === 'object') {
            this.setState({
              tokenAddr: reciept.contractAddress,
              position: 'tokenCreated',
            });
            console.log(reciept.contractAddress);
            clearInterval(interval);
          }
        });
      }, 5000);
    });
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
    const { createToken, gotoUploading } = this;
    const CreateToken = new CreateTokenForm({
      hooks: {
        onSuccess(form) {
          createToken(form);
        },
        onError(form) {
          console.log(form);
        },
      },
    });
    const CreateProject = new CreateProjectForm({
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
          <StepIndicator step={step} count={2} />
          {position === 'token' ? <CreateTokenData form={CreateToken} /> : ''}
          {position === 'creation' ? <LoadingBlock /> : ''}
          {position === 'tokenCreated' ? <TokenCreationAlert onSubmit={this.gotoProjectInfo} /> : ''}
          {position === 'projectInfo' ? <InputProjectData form={CreateProject} onClick={this.returnToContractConnecting} /> : ''}
        </div>
      </Container>
    );
  }
}

const CreateTokenData = inject('userStore')(observer(({ userStore: { address }, form }) => (
  <FormBlock>
    <Heading>
      {'Создание токенов'}
      {''}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <div className={`${styles.form__explanation} ${styles['form__explanation--left']}`}>
        <Explanation>
          <p>
            Контракт будет загружен в сеть при помощи кошелька:
            <p>{address}</p>
          </p>
          <p>
            Баланс:
            <p>0,1023147932 ETH </p>
          </p>
          <p>Токены зачислятся на этот кошелек После их можно будет распределить</p>
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
        <Button className="btn--default btn--black" type="submit"> Продолжить </Button>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            Символом токена называется его сокращенно название. Например: ETH, BTC и т.п.
          </p>
        </Explanation>
        <Explanation>
          <p>
            Общее число токенов задаете вы.
            В дальнейшем их можно будет распределить
            между участниками проекта
          </p>
        </Explanation>
      </div>
      <NavLink to="/newProject">
        <IconButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          Назад
        </IconButton>
      </NavLink>
    </form>
  </FormBlock>
)));

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
    </p>
  </div>
);

CreateNewProjectWithoutTokens.propTypes = {
  appStore: propTypes.object.isRequired,
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
