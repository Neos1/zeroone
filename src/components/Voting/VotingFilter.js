import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import VotingFilterForm from '../../stores/FormsStore/VotingFilterForm';
import Dropdown from '../Dropdown';
import { QuestionIcon, Stats } from '../Icons';
import DatePicker from '../DatePicker/DatePicker';

import styles from './Voting.scss';

@withTranslation()
class VotingFilter extends React.PureComponent {
  form = new VotingFilterForm({
    hooks: {
      onSuccess() {
        return Promise.resolve();
      },
      onError() {
        /* eslint-disable-next-line */
        console.error('error');
      },
    },
  });

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { form } = this;
    const { props } = this;
    const { t } = props;
    return (
      <form form={form} onSubmit={form.onSubmit}>
        <div className={styles['voting__filter-dropdown']}>
          <Dropdown
            options={[{ label: '1. Первый вопрос' }]}
            field={form.$('question')}
            onSelect={() => {}}
          >
            <QuestionIcon />
          </Dropdown>
        </div>
        <div className={styles['voting__filter-dropdown']}>
          <Dropdown
            options={[{ label: 'На голосовании' }]}
            field={form.$('status')}
            onSelect={() => {}}
          >
            <Stats />
          </Dropdown>
        </div>
        <div className={styles['voting__filter-date']}>
          <DatePicker
            placeholder={t('fields:date')}
          />
        </div>
      </form>
    );
  }
}

export default VotingFilter;
