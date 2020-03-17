import React from 'react';
import propTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import { StartIcon } from '../../Icons';
import Button from '../../Button/Button';

import styles from './Question.scss';

/**
 * Component for render start button
 *
 * @param {object} param0 data
 * @param {Function} param0.t method for translate text
 * @param {*} param0.id id question
 * @param {*} param0.history id question
 * @returns {Node} component start button
 */
const startBlock = ({
  t,
  id,
  history,
  votingIsActive,
}) => (
  <div className={styles.question__right}>
    <Button
      theme="question-start"
      iconPosition="top"
      icon={(<StartIcon />)}
      onClick={() => history.push(`/votings?modal=start_new_vote&option=${id}`)}
      disabled={votingIsActive}
      hint={
        votingIsActive
          ? (
            <Trans
              i18nKey="other:hintFunctionalityNotAvailable"
            >
              During active voting, this
              <br />
              functionality is not available.
            </Trans>
          )
          : null
      }
    >
      {t('buttons:startNewVote')}
    </Button>
  </div>
);

startBlock.propTypes = {
  t: propTypes.func.isRequired,
  id: propTypes.oneOfType([
    propTypes.number,
    propTypes.string,
  ]).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  votingIsActive: propTypes.bool.isRequired,
};

const startBlockWithRouter = withRouter(startBlock);

const ParametersBlock = (paramNames, paramTypes, t) => (
  <div className={styles.question__right}>
    <p className={styles['question__parameter-heading']}>{t('other:parameters')}</p>
    {paramNames.map((param, index) => (
      <div className={styles.question__parameter}>
        <p className={styles['question__parameter-label']}>{param}</p>
        <p className={styles['question__parameter-text']}>{paramTypes[index]}</p>
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
  name,
  description,
  formula,
  paramNames,
  paramTypes,
  votingIsActive,
}) => (
  <div className={`
    ${styles.question} 
    ${extended ? styles['question--extended'] : ''}
    ${(paramNames.length > 3 && extended) ? styles['question--short-name'] : ''}
    `}
  >
    {
      !extended
        ? (
          <NavLink className={styles.question__left} to={`/questions/${id}`}>
            {Content(id, name, description, extended)}
          </NavLink>
        )
        : (
          <div className={`${styles.question__left}`}>
            {Content(id, name, description, extended)}
          </div>
        )
    }
    {
      extended
        ? ParametersBlock(paramNames, paramTypes, t)
        : startBlockWithRouter({ t, id, votingIsActive })
    }

    {extended ? FormulaBlock(formula, t) : null}
  </div>
));
Question.propTypes = {
  id: propTypes.number.isRequired,
  extended: propTypes.bool,
  votingIsActive: propTypes.bool.isRequired,
  name: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  formula: propTypes.string.isRequired,
  paramNames: propTypes.arrayOf(propTypes.string).isRequired,
  paramTypes: propTypes.arrayOf(propTypes.string).isRequired,
};
Question.defaultProps = {
  extended: false,
};


export default Question;
