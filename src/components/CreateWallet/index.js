import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Password, BackIcon } from '../Icons';
import Input from '../Input';
import { Button, IconButton } from '../Button';

import styles from '../Login/Login.scss';


@inject('userStore', 'appStore')
@observer
class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Создание пароля'}
              {'Будет использоваться для входа в кошелек и подтверждения транзакций'}
            </Heading>
            <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
              <Password />
            </Input>
            <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
              <Password />
            </Input>
            <div className={styles.form__submit}>
              <NavLink to="/checkSeed">
                <Button className="btn--default btn--black"> Продолжить </Button>
              </NavLink>
            </div>
          </FormBlock>
          <NavLink to="/">
            <IconButton className="btn--link btn--noborder btn--back">
              <BackIcon />
              Назад
            </IconButton>
          </NavLink>
        </div>


      </Container>
    );
  }
}

CreateWallet.propTypes = {};

export default CreateWallet;
