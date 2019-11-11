/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import { Button } from '../Button';
import Heading from '../Heading';

import styles from '../Login/Login.scss';


const CreationAlert = ({ success = false, recover = false }) => (
  <Container>
    <Header />
    <div className={styles.form}>
      <FormBlock>
        <Heading>
          {success ? 'Создание кошелька' : recover ? 'Восстановление кошелька' : ''}
          {success ? 'Кошелек успешно создан' : recover ? 'Кошелек успешно восстанолен' : ''}
        </Heading>
        <NavLink to="/">
          <Button className="btn--default btn--black">
          К выбору кошелька
          </Button>
        </NavLink>
      </FormBlock>
    </div>
  </Container>
);
CreationAlert.propTypes = {
  success: propTypes.bool.isRequired,
  recover: propTypes.bool.isRequired,
};
export default CreationAlert;
