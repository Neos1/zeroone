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

import styles from './Login.scss';


@inject('userStore', 'appStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { appStore } = this.props;
    appStore.readWalletList();
  }

  render() {
    const { appStore } = this.props;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Вход в систему'}
              {'Приготовьтесь к новой эре в сфере голосования'}
            </Heading>
            <Dropdown options={appStore.wallets}>
              <CreditCard />
            </Dropdown>
            <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
              <Password />
            </Input>
            <div className={styles.form__submit}>
              <Button className="btn--default btn--black" onClick={() => false}> Войти </Button>
              <NavLink to="/create">
                <Button className="btn--link"> Создать новый ключ </Button>
              </NavLink>
              <NavLink to="/restore">
                <Button className="btn--link"> Забыли пароль? </Button>
              </NavLink>
            </div>
          </FormBlock>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  appStore: propTypes.shape({
    readWalletList: propTypes.func.isRequired,
    wallets: propTypes.arrayOf(propTypes.object).isRequired,
  }).isRequired,

};

export default Login;
