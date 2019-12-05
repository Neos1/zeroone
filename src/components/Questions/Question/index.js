import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { StartIcon } from '../../Icons';

import styles from './Question.scss';

// eslint-disable-next-line no-unused-vars
const startBlock = () => (
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
);

const ParametersBlock = () => (
  <div className={styles.question__right}>
    <p className={styles['question__parameter-heading']}>Параметры</p>
    <div className={styles.question__parameter}>
      <p className={styles['question__parameter-label']}>Дата применения</p>
      <p className={styles['question__parameter-text']}>
      старое
      </p>
    </div>
    <div className={styles.question__parameter}>
      <p className={styles['question__parameter-label']}>Дата применения</p>
      <p className={styles['question__parameter-text']}>
      Начать
      </p>
    </div>
    <div className={styles.question__parameter}>
      <p className={styles['question__parameter-label']}>Дата применения</p>
      <p className={styles['question__parameter-text']}>голосование</p>
    </div>
  </div>
);

const ShortDescription = () => (
  <p className={styles.question__description}>
    {`Иногда описания могут не влазить, потому что для важных вопросов 
    нужно много описать, чтобы даже дурак все понял и принял правильное 
    решение, тогда делаем что то типо того, ща еще чуть чуть чтобы прям
    забить строчку эту и еще чуть чуть.`}
  </p>
);

const FullDescription = () => (
  <p className={styles.question__description}>
    {`Иногда описания могут не влазить, потому что для важных вопросов 
    нужно много описать, чтобы даже дурак все понял и принял правильное 
    решение, тогда делаем что то типо того, ща еще чуть чуть чтобы прям
    забить строчку эту и еще чуть чуть.`}
    {`Иногда описания могут не влазить, потому что для важных вопросов 
    нужно много описать, чтобы даже дурак все понял и принял правильное 
    решение, тогда делаем что то типо того, ща еще чуть чуть чтобы прям
    забить строчку эту и еще чуть чуть.`}
    {`Иногда описания могут не влазить, потому что для важных вопросов 
    нужно много описать, чтобы даже дурак все понял и принял правильное 
    решение, тогда делаем что то типо того, ща еще чуть чуть чтобы прям
    забить строчку эту и еще чуть чуть.`}
  </p>
);

const FormulaBlock = () => (
  <p className={styles.question__formula}>
    Формула голосования: (group (0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54)→condition (quorum=20%))
  </p>
);

// eslint-disable-next-line no-unused-vars
const Question = ({ id, extended }) => (
  <div className={`${styles.question} ${extended ? styles['question--extended'] : ''}`}>
    <NavLink className={styles.question__left} to={`/question/${id}`}>
      <div>
        <p className={styles.question__id}>{`#${id}`}</p>
        <p className={styles.question__caption}>Я очень люблю писать рыбные заголовки</p>
        {extended ? FullDescription() : ShortDescription()}
      </div>
    </NavLink>
    {extended ? ParametersBlock() : startBlock()}
    {extended ? FormulaBlock() : null}
  </div>
);

Question.propTypes = {
  id: propTypes.number.isRequired,
  extended: propTypes.bool,
};
Question.defaultProps = {
  extended: false,
};


export default Question;
