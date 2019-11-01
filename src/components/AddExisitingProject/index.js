import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import Loader from '../Loader';


import styles from '../Login/Login.scss';

class AddExistingProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'default',
    };
  }

  connectProject = () => {
    this.setState({
      step: 'loading',
    });

    setTimeout(() => {
      this.setState({
        step: 'success',
      });
    }, 5000);
  }

  render() {
    const { step } = this.state;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={`${styles.form}`}>
          {step === 'default' ? <InputBlock onSubmit={this.connectProject} /> : ''}
          {step === 'loading' ? <LoadingBlock /> : ''}
          {step === 'success' ? <MessageBlock /> : ''}
          <NavLink to="/projects"> К списку проектов </NavLink>
        </div>
      </Container>

    );
  }
}
const InputBlock = ({ onSubmit }) => (
  <FormBlock className="form__block">
    <Heading>
      {'Создание нового проекта'}
      {'Выберите подходящий вам вариант'}
    </Heading>
    <form>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="text" onClick={() => { onSubmit(); }}> Продолжить </Button>
      </div>
    </form>
  </FormBlock>
);

const LoadingBlock = () => (
  <FormBlock>
    <Heading>
      {'Проверяем адрес проекта'}
      {'Это не займет много времени'}
    </Heading>
    <Loader />
  </FormBlock>
);
const MessageBlock = () => (
  <FormBlock>
    <Heading>
      {'Проект успешно подключен!'}
      {'Теперь можно начать работу с ним или выбрать другой проект'}
    </Heading>
    <Button className="btn--default btn--black" type="submit"> К подключенному проекту </Button>
    <NavLink to="/projects">
      <Button className="btn--text btn--noborder" type="submit"> Выбрать другой проект </Button>
    </NavLink>
  </FormBlock>
);

InputBlock.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
export default AddExistingProject;
