import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import uniqKey from 'react-id-generator';
import SimpleDropdown from '../SimpleDropdown';
import { QuestionIcon } from '../Icons';
import DatePicker from '../DatePicker/DatePicker';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';

import styles from './Voting.scss';

@inject('projectStore')
@observer
class VotingFilter extends React.PureComponent {
  static propTypes = {
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
  };

  /**
   * Method for handle sort
   *
   * @param {string} selected new sort value
   */
  handleQuestionSelect = (selected) => {
    // TODO change after refactor SimpleDropdown to value & rule by questionId
    const question = selected.split('. ')[1];
    const { projectStore: { historyStore: { dataManager } } } = this.props;
    dataManager.addFilterRule({ caption: question });
  }

  /**
   * Method for handle date change
   */
  handleDateSelect = ({
    startDate,
    endDate,
  }) => {
    const { projectStore: { historyStore: { dataManager } } } = this.props;
    dataManager.addFilterRule({
      // TODO not work
      date: {
        // Convert to vote time format
        start: startDate.valueOf() / 1000,
        end: endDate.valueOf() / 1000,
      },
    });
  }

  render() {
    const { projectStore: { questionStore: { options } } } = this.props;
    return (
      <>
        <div className={styles['voting__filter-dropdown']}>
          <SimpleDropdown
            options={options}
            onSelect={this.handleQuestionSelect}
          >
            <QuestionIcon />
          </SimpleDropdown>
        </div>
        <div className={styles['voting__filter-date']}>
          <DatePicker
            id={uniqKey()}
            onDatesSet={this.handleDateSelect}
          />
        </div>
      </>
    );
  }
}

export default VotingFilter;
