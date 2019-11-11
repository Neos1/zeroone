import React, { Component } from 'react';
import propTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Password, BackIcon } from '../Icons';
import Input from '../Input';
import { Button, IconButton } from '../Button';
import Explanation from '../Explanation';
import Indicator from '../Indicator';
import styles from '../Login/Login.scss';
import passwordValidation from '../../utils/PasswordValidation';


class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validity: {},
    };
  }

  handleInput = (value) => {
    const validity = passwordValidation(value);
    this.setState({ validity });
  }

  render() {
    const { state, form } = this.props;
    const { validity } = this.state;

    return (
      <FormBlock>
        <Heading>
          {'Создание пароля'}
          {'Будет использоваться для входа в кошелек и подтверждения транзакций'}
        </Heading>
        <form form={form} onSubmit={form.onSubmit}>
          <Input type="password" field={form.$('password')} onInput={this.handleInput}>
            <Password />
          </Input>
          <Input type="password" field={form.$('passwordConfirm')}>
            <Password />
          </Input>
          <div className={styles.form__submit}>
            <Button type="submit" className="btn--default btn--black"> Продолжить </Button>
          </div>
          <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
            <Explanation>
              <p>
              Пароль задается на английской раскладке
                <br />
              И должен содержать:
              </p>
              <p>
                <ul>
                  <li>
                    <Indicator checked={validity.Num} />
                    {' '}
                  цифру
                    {' '}
                  </li>
                  <li>
                    <Indicator checked={validity.High} />
                    {' '}
                  заглавную букву
                    {' '}
                  </li>
                  <li>
                    <Indicator checked={validity.Char} />
                    {' '}
                  спецсимвол
                  </li>
                  <li>
                    <Indicator checked={validity.Length} />
                    {' '}
                  не менее 6 знаков
                  </li>
                </ul>
              </p>
            </Explanation>
          </div>
        </form>
        <NavLink to={`${state ? '/restore' : '/'}`}>
          <IconButton className="btn--link btn--noborder btn--back">
            <BackIcon />
           Назад
          </IconButton>
        </NavLink>
      </FormBlock>

    );
  }
}

PasswordForm.propTypes = {
  state: propTypes.bool.isRequired,
  form: propTypes.func.isRequired,
};
export default PasswordForm;
