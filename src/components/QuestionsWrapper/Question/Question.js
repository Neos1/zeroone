import React from 'react';
import { StartIcon } from '../../Icons';

import styles from './Question.scss';

const Question = () => (
  <div className={styles.question}>
    <div className={styles.question__left}>
      <p className={styles.question__id}>#1</p>
      <p className={styles.question__caption}>Я очень люблю писать рыбные заголовки</p>
      <p className={styles.question__description}>
        {`Иногда описания могут не влазить, потому что для важных вопросов 
          нужно много описать, чтобы даже дурак все понял и принял правильное 
          решение, тогда делаем что то типо того, ща еще чуть чуть чтобы прям
          забить строчку эту и еще чуть чуть.`}
      </p>
    </div>
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

export default Question;
