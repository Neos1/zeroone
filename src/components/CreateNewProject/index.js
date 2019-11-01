import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import { Ethereum, CreateToken } from '../Icons';

import styles from '../Login/Login.scss';

@observer
class CreateNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={`${styles.form} ${styles['form--wide']}`}>
          <FormBlock className="form__block--wide">
            <Heading>
              {'Создание нового проекта'}
              {'Выберите подходящий вам вариант'}
            </Heading>
            <div className={styles.create}>
              <NavLink to="/addExisting">
                <IconButton className="btn--big btn--white icon--top">
                  <Ethereum />
                  Подключить контракт и создать проект
                </IconButton>
              </NavLink>
              <NavLink to="/newProject">
                <IconButton className="btn--big btn--white icon--top">
                  <CreateToken />
                  Создать новые токены и проект
                </IconButton>
              </NavLink>
            </div>
          </FormBlock>
        </div>
      </Container>
    );
  }
}

CreateNewProject.propTypes = {

};


export default CreateNewProject;
