import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { StartIcon } from '../../Icons';

import styles from './Question.scss';

const startBlock = () => (
  <div className={styles.question__right}>
    <NavLink
      className={styles.question__start}
      to="/votings"
    >
      <p className={styles['question__start-icon']}>
        <StartIcon />
      </p>
      <p className={styles['question__start-label']}>
        Начать новое голосование
      </p>
    </NavLink>
  </div>
);

const ParametersBlock = (params, t) => (
  <div className={styles.question__right}>
    <p className={styles['question__parameter-heading']}>{t('other:parameters')}</p>
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

const FormulaBlock = (formula, t) => (
  <p className={styles.question__formula}>
    {`${t('other:votingFormula')}: ${formula}`}
  </p>
);

const Content = (id, caption, text, extended) => (
  <div>
    <p className={styles.question__id}>{`#${id}`}</p>
    <p className={styles.question__caption}>{caption}</p>
    {extended ? FullDescription(text) : ShortDescription(text)}
  </div>
);

// eslint-disable-next-line no-unused-vars
const Question = withTranslation()(({
  t,
  extended, id,
  caption,
  text,
  formula,
  params,
}) => (
  <div className={`${styles.question} ${extended ? styles['question--extended'] : ''}`}>
    {
      !extended
        ? (
          <NavLink className={styles.question__left} to={`/questions/${id}`}>
            {Content(id, caption, text, extended)}
          </NavLink>
        )
        : (
          <div className={styles.question__left}>
            {Content(id, caption, text, extended)}
          </div>
        )
    }
    {extended ? ParametersBlock(params, t) : startBlock()}
    {extended ? FormulaBlock(formula, t) : null}
  </div>
));
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
