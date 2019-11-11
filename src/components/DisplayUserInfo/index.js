import React from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Button } from '../Button';
import styles from '../Login/Login.scss';


const DisplayUserInfo = inject('userStore')(observer(({ userStore: { balance, address } }) => (
  <Container>
    <Header />
    <div className={styles.form}>
      {' '}
      <FormBlock>
        <Heading>
          {'Процесс восстановления кошелька'}
          {'Проверьте правильность данных перед тем, как продолжить'}
        </Heading>
        <form>
          <div className="form__token">
            <div className="form__token-half">
              <p className="form__token-label">Символ токена</p>
              <p className="form__token-value">{`${address.substr(0, 8)}...${address.substr(35, 41)}`}</p>
            </div>
            <div className="form__token-divider" />
            <div className="form__token-half">
              <p className="form__token-label">Баланс</p>
              <p className="form__token-value">{balance}</p>
            </div>
          </div>
          <div className={styles.form__submit}>
            <NavLink to="/recoverPassword">
              <Button className="btn--default btn--black" type="button"> Продолжить </Button>
            </NavLink>
          </div>
        </form>
      </FormBlock>
    </div>
  </Container>
)));

export default DisplayUserInfo;
