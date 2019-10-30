import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Dropdown from '../Dropdown';
import { CreditCard, Password } from '../Icons';
import Input from '../Input';
import { Button } from '../Button';
import Loader from '../Loader';

import styles from './Login.scss';


@inject('userStore', 'appStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { appStore } = this.props;
    appStore.readWalletList();
  }

  Login = () => {
    const { userStore } = this.props;
    this.setState({
      loading: true,
    });
    userStore.login();
  }

  render() {
    const { appStore } = this.props;
    const { loading } = this.state;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          {!loading ? <InputForm appStore={appStore} submit={this.Login} /> : <LoadingBlock /> }
        </div>
      </Container>
    );
  }
}

const InputForm = ({ appStore, submit }) => (
  <FormBlock>
    <Heading>
      {'Вход в систему'}
      {'Приготовьтесь к новой эре в сфере голосования'}
    </Heading>
    <Dropdown options={appStore.wallets} onSelect={appStore.selectWallet}>
      <CreditCard />
    </Dropdown>
    <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
      <Password />
    </Input>
    <div className={styles.form__submit}>
      <Button className="btn--default btn--black" onClick={() => submit()}> Войти </Button>
      <NavLink to="/create">
        <Button className="btn--link"> Создать новый ключ </Button>
      </NavLink>
      <NavLink to="/restore">
        <Button className="btn--link"> Забыли пароль? </Button>
      </NavLink>
    </div>
  </FormBlock>
);

const LoadingBlock = () => (
  <FormBlock>
    <Heading>
      {'Вход в систему'}
      {'Приготовьтесь к новой эре в сфере голосования'}
    </Heading>
    <Loader />
  </FormBlock>
);

Login.propTypes = {
  appStore: propTypes.object.isRequired,
  userStore: propTypes.object.isRequired,
};
InputForm.propTypes = {
  appStore: propTypes.object.isRequired,
  submit: propTypes.func.isRequired,
};


export default Login;
