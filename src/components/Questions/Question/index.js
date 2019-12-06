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

const ParametersBlock = (params) => (
  <div className={styles.question__right}>
    <p className={styles['question__parameter-heading']}>Параметры</p>
    {params.map((param) => (
      <div className={styles.question__parameter}>
        <p className={styles['question__parameter-label']}>{param[0]}</p>
        <p className={styles['question__parameter-text']}>{param[1]}</p>
      </div>
    ))}
  </div>
);

const ShortDescription = (text) => (
  <p className={styles.question__description}>
    {text}
  </p>
);

const FullDescription = (text) => (
  <p className={styles.question__description}>
    {text}
  </p>
);

const FormulaBlock = (formula) => (
  <p className={styles.question__formula}>
    {`Формула голосования: ${formula}`}
  </p>
);

// eslint-disable-next-line no-unused-vars
const Question = ({
  extended, id,
  caption,
  text,
  formula,
  params,
}) => (
  <div className={`${styles.question} ${extended ? styles['question--extended'] : ''}`}>
    <NavLink className={styles.question__left} to={`/question/${id}`}>
      <div>
        <p className={styles.question__id}>{`#${id}`}</p>
        <p className={styles.question__caption}>{caption}</p>
        {extended ? FullDescription(text) : ShortDescription(text)}
      </div>
    </NavLink>
    {extended ? ParametersBlock(params) : startBlock()}
    {extended ? FormulaBlock(formula) : null}
  </div>
);
Question.propTypes = {
  id: propTypes.number.isRequired,
  extended: propTypes.bool,
  caption: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  formula: propTypes.arrayOf(propTypes.number).isRequired,
  params: propTypes.arrayOf(propTypes.string).isRequired,
};
Question.defaultProps = {
  extended: false,
};


export default Question;
