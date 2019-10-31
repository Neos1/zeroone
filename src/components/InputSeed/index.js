/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import Heading from '../Heading';
import Input from '../Input';
import { seedForm } from '../../stores/FormsStore';

import styles from '../Login/Login.scss';
import FormBlock from '../FormBlock';
import { Button, IconButton } from '../Button';
import { BackIcon } from '../Icons';

@inject('appStore', 'userStore')
@observer

class InputSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userStore } = this.props;
    const { _mnemonic: seed } = userStore;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Проверка резервной фразы'}
              {'Введите  фразу, которую вы записали'}
            </Heading>
            <form>
              <div className={styles.seed}>
                {seed.map((word, index) => (
                  <Input type="text" field={seedForm.$(`word_${index + 1}`)} placeholder="">
                    <span>{index + 1}</span>
                  </Input>
                ))}
              </div>
              <div className={styles.form__submit}>
                <Button className="btn--default btn--black"> Продолжить </Button>
              </div>
            </form>
          </FormBlock>
          <NavLink to="/showSeed">
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

InputSeed.propTypes = {
  userStore: propTypes.object.isRequired,

};

export default InputSeed;
