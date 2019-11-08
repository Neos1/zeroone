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
import Header from '../Header';

import styles from '../Login/Login.scss';
import ProgressBlock from './ProgressBlock';
import {
  CompilingIcon, SendingIcon, TxHashIcon, TxRecieptIcon, QuestionUploadingIcon,
} from '../Icons';

@inject('userStore', 'appStore')
@observer
class ProjectUploading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      address: '',
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
        console.log(txHash);
        const interval = setInterval(() => {
          appStore.checkReceipt(txHash).then((receipt) => {
            if (typeof receipt === 'object') {
              this.setState({
                step: 4,
                address: receipt.contractAddress,
              });
              appStore.addProjectToList({ name, address: receipt.contractAddress });
              clearInterval(interval);
              appStore.deployQuestions().then(() => {
                // eslint-disable-next-line no-alert
                alert('success');
              });
            }
          });
        }, 2000);
      });
  }

  deployQuestions() {

  }

  render() {
    const { step } = this.state;
    return (
      <Container>
        <Header />
        <div className={`${styles.form} ${styles['form--ultrawide']}`}>
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
              </ProgressBlock>
            </div>

          </FormBlock>
        </div>
        <NavLink to="/projects">projects</NavLink>
      </Container>
    );
  }
}

// //ProjectUploading.propTypes = {};
ProjectUploading.propTypes = {
  appStore: propTypes.object.isRequired,
};

export default ProjectUploading;
