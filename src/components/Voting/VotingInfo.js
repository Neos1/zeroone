import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uniqKey from 'react-id-generator';
import { withTranslation } from 'react-i18next';
import { Collapse } from 'react-collapse';
import { observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';
import {
  statusStates,
  votingStates,
  userVotingStates,
} from '../../constants';
import {
  Stats,
} from '../Icons';
import { getDateString } from './utils';
import Button from '../Button/Button';
import VotingStats from './VotingStats';
import ProgressBar from '../ProgressBar/ProgressBar';
import progressByDateRange from '../../utils/Date';
import VotingInfoButtons from './VotingInfoButtons';
import VotingInfoResult from './VotingInfoResult';
import VotingInfoUserDecision from './VotingInfoUserDecision';

import styles from './Voting.scss';

@withTranslation()
@observer
class VotingInfo extends React.PureComponent {
  @observable progress;

  intervalProgress = 5000;

  static propTypes = {
    t: PropTypes.func.isRequired,
    /** Index voting in list */
    index: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    /** Description voting */
    description: PropTypes.string.isRequired,
    /** Title voting */
    title: PropTypes.string.isRequired,
    /** Formula */
    formula: PropTypes.string.isRequired,
    /** All needed date for voting */
    date: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
    voting: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      status: PropTypes.string.isRequired,
      descision: PropTypes.string.isRequired,
      userVote: PropTypes.number.isRequired,
      closeVoteInProgress: PropTypes.bool,
    }).isRequired,
    params: PropTypes.arrayOf(PropTypes.array).isRequired,
    dataStats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        pros: PropTypes.number.isRequired,
        cons: PropTypes.number.isRequired,
        abstained: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    onVerifyClick: PropTypes.func.isRequired,
    onRejectClick: PropTypes.func.isRequired,
    onCompleteVoteClick: PropTypes.func.isRequired,
    onBarClick: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

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
   * Method for render dynamic content
   * based on voting status
   *
   * @returns {Node} user decision Node element
   */
  @computed
  get renderDynamicContent() {
    const { props, progress } = this;
    const {
      voting,
      voting: {
        userVote,
        status,
        descision,
        closeVoteInProgress,
      },
      date,
      onVerifyClick,
      onRejectClick,
      onCompleteVoteClick,
      t,
    } = props;
    // TODO refactor this switch
    switch (true) {
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote === userVotingStates.notAccepted
        && progress < 100
      ):
        return (
          <VotingInfoButtons
            onVerifyClick={onVerifyClick}
            onRejectClick={onRejectClick}
          />
        );
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote !== userVotingStates.notAccepted
        && progress < 100
      ):
        return (
          <VotingInfoUserDecision
            voting={voting}
          />
        );
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote === userVotingStates.notAccepted
        && progress >= 100
      ):
        return (
          <button
            type="button"
            onClick={onCompleteVoteClick}
            className={styles['voting-info__button--close']}
            disabled={closeVoteInProgress}
          >
            {t('buttons:completeTheVote')}
          </button>
        );
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote !== userVotingStates.notAccepted
        && progress >= 100
      ):
        return (
          <VotingInfoUserDecision
            voting={voting}
          />
        );
      case (
        status === statusStates.closed
      ):
        return (
          <VotingInfoResult
            voting={voting}
            date={date}
          />
        );
      default:
        return null;
    }
  }

  /**
   * Method for change isOpen state
   */
  toggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { props, progress } = this;
    const {
      t,
      date,
      description,
      index,
      title,
      formula,
      params,
      voting,
      onBarClick,
      dataStats,
    } = props;
    return (
      <div
        className={styles['voting-info']}
      >
        <div
          className={styles['voting-info__back']}
        >
          <Link
            to="/votings"
            className={styles.voting__back}
          >
            {t('buttons:back')}
          </Link>
        </div>
        <div
          className={styles['voting-info__date']}
        >
          {
            voting.status === statusStates.active
            && voting.descision === votingStates.default
            && progress < 100
              ? (
                <span className={styles['voting-info__progress-container']}>
                  {t('other:votingInProgress')}
                  :
                  <ProgressBar className={styles['voting-info__progress']} progress={progress} />
                </span>
              )
              : (
                <span className={styles['voting-info__progress-container']}>
                  {t('other:votingDone')}
                </span>
              )
          }
          <span>
            {t('other:start')}
            :
            {getDateString(date.start)}
          </span>
          <span>
            {t('other:end')}
            :
            {getDateString(date.end)}
          </span>
        </div>
        <div
          className={styles['voting-info__card']}
        >
          <div
            className={styles['voting-info__card-inner']}
          >
            <div
              className={styles['voting-info__index']}
            >
              #
              {index}
            </div>
            <div
              className={styles['voting-info__title']}
            >
              {title}
            </div>
            <div
              className={styles['voting-info__main']}
            >
              <div
                className={styles['voting-info__description']}
              >
                {description}
              </div>
              <div
                className={styles['voting-info__data']}
              >
                {params.map((item) => (
                  <div
                    key={uniqKey()}
                  >
                    <div
                      className={styles['voting-info__data-title']}
                    >
                      {item[0]}
                    </div>
                    <div
                      className={styles['voting-info__data-value']}
                    >
                      {item[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={styles['voting-info__formula']}
            >
              {`${t('other:votingFormula')}: ${formula}`}
            </div>
          </div>
          {this.renderDynamicContent}
        </div>
        <div
          className={styles['voting-info__stats']}
        >
          <div
            className={styles['voting-info__stats-button']}
          >
            <Button
              theme="white"
              icon={(<Stats />)}
              onClick={this.toggleOpen}
            >
              {t('other:statistics')}
            </Button>
          </div>
          <Collapse isOpened={isOpen}>
            <div
              className={styles['voting-info__stats-content']}
            >
              <VotingStats
                onBarClick={onBarClick}
                data={dataStats}
              />
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default VotingInfo;
