import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uniqKey from 'react-id-generator';
import { withTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import { Collapse } from 'react-collapse';
import {
  EMPTY_DATA_STRING,
  statusStates,
  votingStates,
  userVotingStates,
} from '../../constants';
import {
  VerifyIcon,
  RejectIcon,
  Stats,
  NoQuorum,
} from '../Icons';
import Button from '../Button/Button';
import VotingStats from './VotingStats';
import ProgressBar from '../ProgressBar/ProgressBar';
import progressByDateRange from '../../utils/Date';

import styles from './Voting.scss';

@withTranslation()
class VotingInfo extends React.PureComponent {
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
      status: PropTypes.string.isRequired,
      descision: PropTypes.string.isRequired,
      userVote: PropTypes.string.isRequired,
    }).isRequired,
    params: PropTypes.arrayOf(PropTypes.array).isRequired,
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

  /**
   * Method for change isOpen state
   */
  toggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
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

  /**
   * Method for render icon with text
   *
   * @param {string} state state for icon
   * @returns {Node} ready node element
   */
  renderDecisionIcon = (state) => {
    const { props } = this;
    const { t } = props;
    switch (state) {
      case '0':
        return (
          <div className={styles['voting-info__decision-icon']}>
            <NoQuorum width={14} height={14} />
            {t('other:notAccepted')}
          </div>
        );
      case '1':
        return (
          <div className={styles['voting-info__decision-icon']}>
            <VerifyIcon width={14} height={14} />
            {t('other:pros')}
          </div>
        );
      case '2':
        return (
          <div className={styles['voting-info__decision-icon']}>
            <RejectIcon width={14} height={14} />
            {t('other:cons')}
          </div>
        );
      default:
        return EMPTY_DATA_STRING;
    }
  }

  /**
   * Method for render user decision
   *
   * @returns {Node} user decision Node element
   */
  renderUserDecision = () => {
    const { props } = this;
    const { voting: { userVote }, t } = props;
    switch (userVote) {
      case userVotingStates.decisionFor:
        return (
          <div className={styles['voting-info__decision']}>
            <div className={styles['voting-info__decision-text']}>
              {t('other:youVoted')}
            </div>
            {this.renderDecisionIcon(userVotingStates.decisionFor)}
          </div>
        );
      case userVotingStates.decisionAgainst:
        return (
          <div className={styles['voting-info__decision']}>
            <div className={styles['voting-info__decision-text']}>
              {t('other:youVoted')}
            </div>
            {this.renderDecisionIcon(userVotingStates.decisionAgainst)}
          </div>
        );
      default:
        return null;
    }
  }

  /**
   * Method for render decision buttons
   *
   * @returns {Node} element with decision buttons
   */
  renderDecisionButtons = () => {
    const { props } = this;
    const {
      onVerifyClick,
      onRejectClick,
      t,
    } = props;
    return (
      <div
        className={styles['voting-info__buttons']}
      >
        <button
          type="button"
          onClick={onVerifyClick}
        >
          <div
            className={styles['voting-info__button-icon']}
          >
            <VerifyIcon />
          </div>
          {t('other:iAgree')}
        </button>
        <button
          type="button"
          onClick={onRejectClick}
        >
          <div
            className={styles['voting-info__button-icon']}
          >
            <RejectIcon />
          </div>
          {t('other:iAmAgainst')}
        </button>
      </div>
    );
  }

  /**
   * Method for render complete vote button
   *
   * @returns {Node} button
   */
  renderCompleteVoteButton = () => {
    const { props } = this;
    const { t, onCompleteVoteClick } = props;
    return (
      <button
        type="button"
        onClick={onCompleteVoteClick}
        className={styles['voting-info__button--close']}
      >
        {t('buttons:completeTheVote')}
      </button>
    );
  }

  renderResultDecision = () => {
    const { props } = this;
    const {
      voting: { userVote, descision },
      date,
      t,
    } = props;
    const startDate = moment(date.start * 1000);
    const endDate = moment(date.end * 1000);
    return (
      <div
        className={styles['voting-info__result']}
      >
        <div
          className={styles['voting-info__result-item']}
        >
          {t('other:decisionWasMade')}
          <div>
            {this.renderDecisionIcon(descision)}
          </div>
        </div>
        <div
          className={styles['voting-info__result-item']}
        >
          {t('other:yourDecision')}
          <div>
            {this.renderDecisionIcon(userVote)}
          </div>
        </div>
        <div
          className={styles['voting-info__result-item']}
        >
          {t('other:totalVoted')}
          <div
            className={styles['voting-info__result-item-value']}
          >
            {/* TODO add total from stats */}
            {EMPTY_DATA_STRING}
          </div>
        </div>
        <div
          className={styles['voting-info__result-item']}
        >
          {t('other:theVoteLasted')}
          <div
            className={styles['voting-info__result-item-value']}
          >
            {endDate.from(startDate)}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Method for render dynamic content
   * based on voting status
   *
   * @returns {Node} user decision Node element
   */
  renderDynamicContent = () => {
    const { props } = this;
    const {
      voting: { userVote, status, descision },
      date,
    } = props;
    const progress = progressByDateRange(date);
    switch (true) {
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote === userVotingStates.notAccepted
        && progress < 100
      ):
        return this.renderDecisionButtons();
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote !== userVotingStates.notAccepted
        && progress < 100
      ):
        return this.renderUserDecision();
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote === userVotingStates.notAccepted
        && progress >= 100
      ):
        return this.renderCompleteVoteButton();
      case (
        status === statusStates.active
        && descision === votingStates.default
        && userVote !== userVotingStates.notAccepted
        && progress >= 100
      ):
        return this.renderUserDecision();
      case (
        status === statusStates.closed
      ):
        return this.renderResultDecision();
      default:
        return null;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { props } = this;
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
    } = props;
    const progress = progressByDateRange(date);
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
            {this.getDateString(date.start)}
          </span>
          <span>
            {t('other:end')}
            :
            {this.getDateString(date.end)}
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
          {this.renderDynamicContent()}
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
              />
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default VotingInfo;
