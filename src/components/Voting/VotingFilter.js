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
   * @param {object} selected new sort data
   * @param {string|number} selected.value new sort value
   * @param {string|number} selected.label new sort label
   */
  handleQuestionSelect = (selected) => {
    const question = selected.label;
    const { projectStore: { historyStore: { addFilterRule } } } = this.props;
    addFilterRule({ caption: question });
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

  render() {
    const {
      projectStore: {
        questionStore: { options },
        historyStore: { filter },
      },
    } = this.props;
    const { rules } = filter;
    return (
      <>
        <div className={styles['voting__filter-dropdown']}>
          <SimpleDropdown
            options={options}
            onSelect={this.handleQuestionSelect}
            initLabel={rules.caption}
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
