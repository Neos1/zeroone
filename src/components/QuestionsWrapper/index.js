import React, { Component } from 'react';
import Container from '../Container';
import { IconButton } from '../Button';
import { CreateToken } from '../Icons';
import Question from './Question/Question';
import styles from './Questions.scss';
import SimpleDropdown from '../SimpleDropdown';

class QuestionsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const options = [{
      label: '1',
      value: '1',
    }, {
      label: '1',
      value: '1',
    }, {
      label: '1',
      value: '1',
    }];
    return (
      <Container className="container--small">
        <div className={styles.questions}>
          <div className={styles.questions__head}>
            <div className={styles['questions__head-create']}>
              <IconButton className="btn--white">
                <CreateToken />
              Создать группу вопросов
              </IconButton>
              <IconButton className="btn--white">
                <CreateToken />
              Создать вопрос
              </IconButton>
            </div>
            <div className={styles['questions__head-filters']}>
              <SimpleDropdown
                options={options}
              />
            </div>
          </div>
          <div className={styles.questions__wrapper}>
            <Question />
            <Question />
            <Question />
            <Question />
            <Question />
          </div>
        </div>
      </Container>
    );
  }
}

export default QuestionsWrapper;
