import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import { CreateToken, ChainIcon, BackIcon } from '../Icons';

import styles from '../Login/Login.scss';


const AddNewProject = () => (
  <Container>
    <Header />
    <div className={`${styles.form}`}>
      <FormBlock className="form__block">
        <Heading>
          {'Добавление проекта'}
          {'Cоздайте новый или подключите уже существующий'}
        </Heading>
        <div className={styles['add-project']}>
          <NavLink to="/newProject">
            <IconButton className="btn--white">
              <CreateToken />
                Создать
            </IconButton>
          </NavLink>
          <NavLink to="/addExisting">
            <IconButton className="btn--white">
              <ChainIcon />
              Подключить
            </IconButton>
          </NavLink>
        </div>
      </FormBlock>
      <NavLink to="/projects">
        <IconButton className="btn--link btn--noborder btn--back">
          <BackIcon />
          Назад
        </IconButton>
      </NavLink>
    </div>
  </Container>
);

export default AddNewProject;
