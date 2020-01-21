import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Input from '../Input';
import { TokenName, DateIcon, Address } from '../Icons';
import InputTextarea from '../Input/InputTextarea';
import Button from '../Button/Button';

import styles from './CreateNewQuestion.scss';

@withTranslation()
@inject('projectStore')
@observer
class FormBasic extends React.Component {
  static propTypes = {
    formBasic: PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
      $: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        isVotingActive: PropTypes.bool.isRequired,
      }),
    }).isRequired,
  };

  render() {
    const { props } = this;
    const { formBasic, t, projectStore: { historyStore } } = props;
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
            <Input field={formBasic.$('voting_formula')}>
              <TokenName />
            </Input>
          </div>
          <div className={styles['create-question__form-col']}>
            <Input field={formBasic.$('target')}>
              <Address />
            </Input>
          </div>
        </div>
        <div className={styles['create-question__form-row']}>
          <div className={styles['create-question__form-col']}>
            <Input field={formBasic.$('methodSelector')}>
              <Address />
            </Input>
            <div className={styles['create-question__field-description']}>
              {t('other:selectorNonexistentFunctionDescription')}
            </div>
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
            <Button
              type="submit"
              disabled={historyStore.isVotingActive}
              hint={
                historyStore.isVotingActive
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
              {t('buttons:nextStep')}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default FormBasic;
