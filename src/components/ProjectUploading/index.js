/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Container from '../Container';

import styles from '../Login/Login.scss';
import ProgressBlock from './ProgressBlock';
import {
  CompilingIcon, SendingIcon, TxHashIcon, TxRecieptIcon, QuestionUploadingIcon, Login,
} from '../Icons';
import { Button, IconButton } from '../Button';

@inject('userStore', 'appStore')
@observer
class ProjectUploading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      address: '',
      loading: true,
    };
  }

  componentDidMount() {
    const { appStore, appStore: { deployArgs, name, password } } = this.props;
    this.setState({
      step: 1,
    });
    appStore.deployContract('project', deployArgs, password)
      .then((txHash) => {
        this.setState({
          step: 3,
        });
        const interval = setInterval(() => {
          appStore.checkReceipt(txHash).then((receipt) => {
            if (receipt) {
              this.setState({
                step: 4,
                address: receipt.contractAddress,
              });
              appStore.addProjectToList({ name, address: receipt.contractAddress });
              clearInterval(interval);
              appStore.deployQuestions(receipt.contractAddress).then(() => {
                this.setState({
                  loading: false,
                });
              });
            }
          }).catch(() => { appStore.displayAlert('Нет соединения с хостом, проверьте подключение к сети', 3000); });
        }, 2000);
      });
  }

  render() {
    const { step, loading } = this.state;
    return (
      <Container>
        <div className={`${styles.form} ${loading ? styles['form--ultrawide'] : ''}`}>
          {
            loading ? <Progress step={step} /> : <AlertBlock />
          }
        </div>
        <NavLink to="/projects">projects</NavLink>
      </Container>
    );
  }
}

const Progress = inject('appStore')(observer(({ appStore, step }) => (
  <FormBlock>
    <Heading>
      {'Загружаем контракт'}
      {'Это может занять до 5 минут'}
    </Heading>
    <div className={styles.progress}>
      <ProgressBlock
        text="Компиляция"
        index={0}
        state={step}
      >
        <CompilingIcon />
      </ProgressBlock>
      <ProgressBlock
        text="Отправка"
        index={1}
        state={step}
      >
        <SendingIcon />
      </ProgressBlock>
      <ProgressBlock
        text="Получение хэша"
        index={2}
        state={step}
      >
        <TxHashIcon />
      </ProgressBlock>
      <ProgressBlock
        text="Получение чека"
        index={3}
        state={step}
      >
        <TxRecieptIcon />
      </ProgressBlock>
      <ProgressBlock
        text="Загрузка вопросов"
        index={4}
        state={step}
        noline
      >
        <QuestionUploadingIcon />
        <span>
          {appStore.uploadedQuestion}
          {'/'}
          {appStore.countOfQuestions}
        </span>
      </ProgressBlock>
    </div>

  </FormBlock>
)));

const AlertBlock = () => (
  <FormBlock>
    <Heading>
      {'Проект успешно создан!'}
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

// //ProjectUploading.propTypes = {};
ProjectUploading.propTypes = {
  appStore: propTypes.object.isRequired,
};
Progress.propTypes = {
  step: propTypes.number.isRequired,
  appStore: propTypes.object.isRequired,
};

export default ProjectUploading;
