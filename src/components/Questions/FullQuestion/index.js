/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Container from '../../Container';
import Question from '../Question';
import Button from '../../Button/Button';

import styles from '../Questions.scss';


const FullQuestion = withTranslation()(inject('projectStore')(observer(({ t, projectStore }) => {
  const { id: pageid } = useParams();
  const { goBack } = useHistory();
  const { questionStore } = projectStore;
  const [question] = questionStore.getQuestionById(pageid);
  // eslint-disable-next-line no-console
  console.log(question);
  return (
    <Container className="container--small">
      <div className={styles.questions}>
        <div className={styles.questions__head}>
          <div className={styles['questions__head-create']}>
            <Button theme="white" onClick={goBack}>
              {t('buttons:back')}
            </Button>
          </div>
        </div>
        <div className={styles.questions__wrapper}>
          <Question {...question} extended />
        </div>
      </div>
    </Container>
  );
})));

export default FullQuestion;
