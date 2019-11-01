import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import { CreateToken } from '../Icons';

import styles from '../Login/Login.scss';


const AddNewProject = () => (
  <Container>
    <Header isMenu isLogged={false} />
    <div className={`${styles.form}`}>
      <FormBlock className="form__block">
        <Heading>
          {'Создание нового проекта'}
          {'Выберите подходящий вам вариант'}
        </Heading>
        <div className={styles.create}>
          <NavLink to="/newProject">
            <IconButton className="btn--white">
              <CreateToken />
                Создать
            </IconButton>
          </NavLink>
          <NavLink to="/addExisting">
            <IconButton className="btn--white">
              <CreateToken />
              Подключить
            </IconButton>
          </NavLink>
        </div>
      </FormBlock>
    </div>
  </Container>
);

export default AddNewProject;
