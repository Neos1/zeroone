/* eslint-disable no-console */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, IconButton } from '../Button';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';
import Header from '../Header';
import Loader from '../Loader';
import Explanation from '../Explanation';
import ConnectProjectForm from '../../stores/FormsStore/ConnectProject';


import styles from '../Login/Login.scss';
import Input from '../Input';
import { Address, TokenName, Login } from '../Icons';

@inject('appStore')
@observer
class AddExistingProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'default',
    };
  }

  connectProject = (form) => {
    const { appStore } = this.props;
    const { name, address } = form.values();
    this.setState({
      step: 'loading',
    });
    appStore.checkProject(address)
      .then(() => {
        this.setState({ step: 'success' });
        appStore.addProjectToList({ name, address });
      })
      .catch(() => {
        appStore.displayAlert('Произошла ошибка, попробуйте еще раз', 3000);
        this.state = {
          step: 'default',
        };
      });
  }

  render() {
    const { appStore } = this.props;
    const { step } = this.state;
    const { connectProject } = this;

    const connectForm = new ConnectProjectForm({
      hooks: {
        onSuccess(form) {
          connectProject(form);
        },
        onError() {
          appStore.displayAlert('Произошла ошибка, проверьте корректность адреса', 3000);
        },
      },
    });
    return (
      <Container>
        <Header />
        <div className={`${styles.form}`}>
          {step === 'default' ? <InputBlock form={connectForm} /> : ''}
          {step === 'loading' ? <LoadingBlock /> : ''}
          {step === 'success' ? <MessageBlock /> : ''}
        </div>
      </Container>

    );
  }
}
const InputBlock = ({ form }) => (
  <FormBlock className="form__block">
    <Heading>
      {'Подключить проект'}
      {'Cоздайте новый или подключите уже существующий'}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input field={form.$('name')}>
        <TokenName />
      </Input>
      <Input field={form.$('address')}>
        <Address />
      </Input>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="submit"> Продолжить </Button>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            Название задается вами и отображается в списке проектов
          </p>
        </Explanation>
        <Explanation>
          <p>
            Адрес сообщает  создатель проекта
          </p>
        </Explanation>
      </div>
    </form>
    <NavLink to="/createProject">
      <Button className="btn--text btn--link btn--noborder" type="submit"> Назад </Button>
    </NavLink>
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
    <IconButton className="btn--default btn--black" type="submit">
      {<Login />}
      {'К подключенному проекту'}
    </IconButton>
    <NavLink to="/projects">
      <Button className="btn--text btn--link btn--noborder" type="submit"> Выбрать другой проект </Button>
    </NavLink>
  </FormBlock>
);
AddExistingProject.propTypes = {
  appStore: propTypes.object.isRequired,
};
InputBlock.propTypes = {
  form: propTypes.object.isRequired,
};
export default AddExistingProject;
