import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Input from '../Input';
import { TokenName, DateIcon } from '../Icons';
import InputTextarea from '../Input/InputTextarea';
import Button from '../Button/Button';

import styles from './CreateNewQuestion.scss';

@withTranslation()
class FormBasic extends React.Component {
  static propTypes = {
    formBasic: PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
      $: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { props } = this;
    const { formBasic, t } = props;
    return (
      <form
        form={formBasic}
        onSubmit={formBasic.onSubmit}
        className={styles['create-question__form--basic']}
      >
        <div className={styles['create-question__form-row']}>
          <div className={styles['create-question__form-col']}>
            <Input field={formBasic.$('question_title')}>
              <TokenName />
            </Input>
          </div>
          <div className={styles['create-question__form-col']}>
            <Input field={formBasic.$('question_life_time')}>
              <DateIcon />
            </Input>
          </div>
        </div>
        <div className={styles['create-question__form-row']}>
          <div className={styles['create-question__form-col']}>
            <Input field={formBasic.$('param_question')}>
              <TokenName />
            </Input>
          </div>
          <div className={styles['create-question__form-col']}>
            <Input field={formBasic.$('voting_formula')}>
              <TokenName />
            </Input>
          </div>
        </div>
        <div className={styles['create-question__form-row']}>
          <div
            className={`
              ${styles['create-question__form-col']}
              ${styles['create-question__form-col--full']}
            `}
          >
            <InputTextarea
              field={formBasic.$('description')}
            />
          </div>
        </div>
        <div className={styles['create-question__form-row']}>
          <div className={styles['create-question__form-col']} />
          <div className={styles['create-question__form-col']}>
            <Button type="submit">{t('buttons:nextStep')}</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default FormBasic;
