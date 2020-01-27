import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uniqKey from 'react-id-generator';
import { withTranslation } from 'react-i18next';
import { computed } from 'mobx';
import SimpleDropdown from '../SimpleDropdown';
import { QuestionIcon, DescisionIcon } from '../Icons';
import DatePicker from '../DatePicker/DatePicker';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';

import styles from './Voting.scss';

@withTranslation()
@inject('projectStore')
@observer
class VotingFilter extends React.PureComponent {
  static propTypes = {
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    t: PropTypes.func.isRequired,
  };

  @computed
  get dateInit() {
    const {
      projectStore: {
        historyStore: { filter: { rules } },
      },
    } = this.props;
    if (!rules.date) {
      return {
        startDate: null,
        endDate: null,
      };
    }
    return {
      startDate: moment(rules.date.start * 1000),
      endDate: moment(rules.date.end * 1000),
    };
  }

  /**
   * Method for handle sort
   *
   * @param {object} selected new sort data
   * @param {string|number} selected.value new sort value
   * @param {string|number} selected.label new sort label
   */
  handleQuestionSelect = (selected) => {
    const { projectStore: { historyStore: { addFilterRule } } } = this.props;
    addFilterRule({ questionId: selected.value.toString() });
  }

  handleStatusSelect = (selected) => {
    const { projectStore: { historyStore: { addFilterRule } } } = this.props;
    addFilterRule({ descision: selected.value.toString() });
  }

  /**
   * Method for handle date change
   */
  handleDateSelect = ({
    startDate,
    endDate,
  }) => {
    const { projectStore: { historyStore: { addFilterRule } } } = this.props;
    addFilterRule({
      date: {
        // Convert to vote time format
        start: startDate.valueOf() / 1000,
        end: endDate.valueOf() / 1000,
      },
    });
  }

  /**
   * Method for handle clear date
   */
  handleDateClear = () => {
    const { projectStore: { historyStore } } = this.props;
    historyStore.removeFilterRule('date');
  }

  render() {
    const {
      projectStore: {
        questionStore: { options },
        historyStore: { filter: { rules } },
      },
      t,
    } = this.props;

    const statusOptions = [{
      label: t('fields:descision'),
      value: '*',
    }, {
      label: t('other:notAccepted'),
      value: '0',
    }, {
      label: t('other:pros'),
      value: '1',
    }, {
      label: t('other:cons'),
      value: '2',
    }];
    return (
      <>
        <div className={styles['voting__filter-dropdown']}>
          {/* Is not work correctly without key */}
          <SimpleDropdown
            options={options}
            onSelect={this.handleQuestionSelect}
            initIndex={Number(rules.questionId)}
            key={uniqKey()}
          >
            <QuestionIcon />
          </SimpleDropdown>
          <SimpleDropdown
            options={statusOptions}
            onSelect={this.handleStatusSelect}
            initIndex={0}
            key={uniqKey()}
          >
            <DescisionIcon />
          </SimpleDropdown>
        </div>
        <div className={styles['voting__filter-date']}>
          {/* Is not work correctly without key */}
          <DatePicker
            id={uniqKey()}
            onDatesSet={this.handleDateSelect}
            onDatesClear={this.handleDateClear}
            init={this.dateInit}
            key={uniqKey()}
          />
        </div>
      </>
    );
  }
}

export default VotingFilter;
