import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uniqKey from 'react-id-generator';
import { computed } from 'mobx';
import SimpleDropdown from '../SimpleDropdown';
import { QuestionIcon } from '../Icons';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import DatePicker from '../DatePicker';

import styles from './Voting.scss';

@inject('projectStore')
@observer
class VotingFilter extends React.PureComponent {
  static propTypes = {
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
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
    } = this.props;
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
        </div>
        <div className={styles['voting__filter-date']}>
          <DatePicker
            onDatesSet={this.handleDateSelect}
            onDatesClear={this.handleDateClear}
            init={this.dateInit}
          />
        </div>
      </>
    );
  }
}

export default VotingFilter;
