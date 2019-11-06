import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import propTypes from 'prop-types';
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
    };
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


export default ProjectUploading;
