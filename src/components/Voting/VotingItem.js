import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { computed, observable, action } from 'mobx';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import VotingDecisionProgress from './VotingDecisionProgress';
import { statusStates, votingStates } from '../../constants';
import VotingDecision from './VotingDecision';
import { progressByDateRange } from '../../utils/Date';
import { getDateString } from './utils';

import styles from './Voting.scss';

@withTranslation()
@observer
class VotingItem extends React.PureComponent {
  @observable progress = 0;

  intervalProgress = 5000;

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

  componentDidMount() {
    const { props } = this;
    const { date } = props;
    const initProgress = progressByDateRange(date);
    this.setProgress(initProgress);
    if (initProgress !== 100) {
      const intervalId = setInterval(() => {
        this.setProgress(progressByDateRange(date));
        if (this.progress === 100) {
          clearInterval(intervalId);
        }
      }, this.intervalProgress);
    }
  }

  @action
  setProgress = (progress) => {
    this.progress = progress;
  }

  /**
   * Method for render decision state
   *
   * @returns {Node} element for actual
   * state
   */
  @computed
  get renderDecisionState() {
    const { props, progress } = this;
    const { date } = props;
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
      <Link to={`/votings/info/${index}`}>
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
                {getDateString(date.start)}
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
                {getDateString(date.end)}
              </div>
            </div>
          </div>
          <div
            className={styles['voting__item-progress']}
          >
            {this.renderDecisionState}
          </div>
        </div>
      </Link>
    );
  }
}

export default VotingItem;
