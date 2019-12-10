import React from 'react';
import { observer } from 'mobx-react';
import VotingFilterForm from '../../stores/FormsStore/VotingFilterForm';
import Dropdown from '../Dropdown';
import { QuestionIcon, Stats } from '../Icons';
import DatePicker from '../DatePicker/DatePicker';

import styles from './Voting.scss';

@observer
class VotingFilter extends React.PureComponent {
  form = new VotingFilterForm({
    hooks: {
      onSuccess: () => Promise.resolve(),
      onError() {
        /* eslint-disable-next-line */
        console.error('error');
      },
    },
  });

  render() {
    const { form } = this;
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
            fieldBefore={form.$('date_before')}
            fieldAfter={form.$('date_after')}
            onDatesSet={() => {}}
          />
        </div>
      </form>
    );
  }
}

export default VotingFilter;
