import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import { Collapse } from 'react-collapse';
import { EMPTY_DATA_STRING } from '../../constants';
import { VerifyIcon, RejectIcon, Stats } from '../Icons';
import Button from '../Button/Button';
import VotingStats from './VotingStats';

import styles from './Voting.scss';

@withTranslation()
class VotingInfo extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    /** Index voting in list */
    index: PropTypes.number.isRequired,
    /** Description voting */
    description: PropTypes.string.isRequired,
    /** Title voting */
    title: PropTypes.string.isRequired,
    /** Formula */
    formula: PropTypes.string.isRequired,
    /** All needed date for voting */
    date: PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
      application: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    params: PropTypes.arrayOf(PropTypes.array).isRequired,
    onVerifyClick: PropTypes.func.isRequired,
    onRejectClick: PropTypes.func.isRequired,
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
      || date instanceof Date !== true
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
      onVerifyClick,
      onRejectClick,
      onBarClick,
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
                  <div>
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
