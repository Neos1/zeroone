import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { StartIcon } from '../../Icons';

import styles from './Question.scss';

const Question = ({ id }) => (
  <div className={styles.question}>
    <NavLink className={styles.question__left} to={`/question/${id}`}>
      <div>
        <p className={styles.question__id}>{`#${id}`}</p>
        <p className={styles.question__caption}>Я очень люблю писать рыбные заголовки</p>
        <p className={styles.question__description}>
          {`Иногда описания могут не влазить, потому что для важных вопросов 
          нужно много описать, чтобы даже дурак все понял и принял правильное 
          решение, тогда делаем что то типо того, ща еще чуть чуть чтобы прям
          забить строчку эту и еще чуть чуть.`}
        </p>
      </div>
    </NavLink>
    <div className={styles.question__right}>
      <div className={styles.question__start}>
        <p className={styles['question__start-icon']}>
          <StartIcon />
        </p>
        <p className={styles['question__start-label']}>
          Начать новое голосование
        </p>
      </div>
    </div>
  </div>
);

Question.propTypes = {
  id: propTypes.number.isRequired,
};

export default Question;
