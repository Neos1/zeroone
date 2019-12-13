import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import VotingDecisionProgress from './VotingDecisionProgress';
import { EMPTY_DATA_STRING, statusStates, votingStates } from '../../constants';
import VotingDecision from './VotingDecision';
import progressByDateRange from '../../utils/Date';

import styles from './Voting.scss';

@withTranslation()
class VotingItem extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    actualStatus: PropTypes.string.isRequired,
    actualDecisionStatus: PropTypes.string.isRequired,
    date: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  };

  /**
   * Method for render decision state
   *
   * @returns {Node} element for actual
   * state
   */
  renderDecisionState = () => {
    const { props } = this;
    const { date } = props;
    const progress = progressByDateRange(date);
    switch (true) {
      case (progress < 100):
        return (
          <VotingDecisionProgress
            progress={progress}
            remained={moment(date.end * 1000).fromNow()}
          />
        );
      case (progress >= 100):
        return this.getVotingDecision();
      default:
        return null;
    }
  }

  getVotingDecision = () => {
    const { props } = this;
    const { actualStatus, actualDecisionStatus } = props;
    switch (true) {
      case (
        actualStatus === statusStates.active
        && actualDecisionStatus === votingStates.default
      ):
        return (
          <VotingDecisionProgress
            progress={100}
            remained=""
          />
        );
      case (
        actualStatus === statusStates.closed
        && actualDecisionStatus === votingStates.decisionFor
      ):
        return (<VotingDecision prosState />);
      case (
        actualStatus === statusStates.closed
        && actualDecisionStatus === votingStates.decisionAgainst
      ):
        return (<VotingDecision prosState={false} />);
      case (
        actualStatus === statusStates.closed
        && actualDecisionStatus === votingStates.default
      ):
        return (<VotingDecision prosState={null} />);
      default:
        return null;
    }
  }


  /**
   * Method for getting formatted date string
   *
   * @param {Date} date date for formatting
   * @returns {string} formatted date
   */
  getDateString = (date) => {
    if (
      !date
      || typeof date !== 'number'
    ) return EMPTY_DATA_STRING;
    return (
      <Trans
        i18nKey="other:dateInFormat"
        values={{
          date: moment(date * 1000).format('DD.MM.YYYY'),
          time: moment(date * 1000).format('HH:mm'),
        }}
      />
    );
  }

  render() {
    const { props } = this;
    const {
      index,
      title,
      description,
      t,
      date,
    } = props;
    return (
      <Link to={`/votingInfo/${index}`}>
        <div
          className={styles.voting__item}
        >
          <div
            className={styles['voting__item-info']}
          >
            <div
              className={styles['voting__item-index']}
            >
              {`#${index}`}
            </div>
            <div
              className={styles['voting__item-title']}
            >
              {title}
            </div>
            <div
              className={styles['voting__item-description']}
            >
              {description}
            </div>
          </div>
          <div
            className={styles['voting__item-date']}
          >
            <div
              className={styles['voting__item-date-block']}
            >
              <div
                className={styles['voting__item-date-text']}
              >
                {t('other:start')}
                <br />
                {this.getDateString(date.start)}
              </div>
            </div>
            <div
              className={styles['voting__item-date-block']}
            >
              <div
                className={styles['voting__item-date-text']}
              >
                {t('other:end')}
                <br />
                {this.getDateString(date.end)}
              </div>
            </div>
          </div>
          <div
            className={styles['voting__item-progress']}
          >
            {this.renderDecisionState()}
          </div>
        </div>
      </Link>
    );
  }
}

export default VotingItem;
