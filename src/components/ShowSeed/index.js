/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { NavLink, Redirect } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { IconButton, Button } from '../Button';
import { BackIcon } from '../Icons';

import styles from '../Login/Login.scss';

@inject('userStore', 'appStore')
@observer
class ShowSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }


  toggleWords = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  redirectToInput() {
    return <Redirect to="/checkSeed" />;
  }

  render() {
    const { userStore } = this.props;
    const { visible } = this.state;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Резервная фраза'}
              {'Нужна для восстановления пароля'}
            </Heading>
            <div className={styles.seed}>
              {userStore._mnemonic.map((word, id) => (
                <SeedWord {...{ word, id, visible }} />
              ))}
            </div>
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

const SeedWord = ({ word, id, visible }) => (
  <p className="seed__word">
    <span className="seed__word-id">{id + 1}</span>
    <span className="seed__word-text">{visible ? word : ('*').repeat(word.length)}</span>
  </p>
);

ShowSeed.propTypes = {
  userStore: propTypes.object.isRequired,
  appStore: propTypes.object.isRequired,
};
SeedWord.propTypes = {
  id: propTypes.number.isRequired,
  word: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
};

export default ShowSeed;
