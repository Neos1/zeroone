import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Container from '../../Container';
import Question from '../Question';
import Button from '../../Button/Button';

import styles from '../Questions.scss';


const FullQuestion = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  return (
    <Container className="container--small">
      <div className={styles.questions}>
        <div className={styles.questions__head}>
          <div className={styles['questions__head-create']}>
            <Button theme="white" onClick={goBack}>
              Назад
            </Button>
          </div>
        </div>
        <div className={styles.questions__wrapper}>
          <Question id={id} extended />
        </div>
      </div>
    </Container>
  );
};

export default FullQuestion;
