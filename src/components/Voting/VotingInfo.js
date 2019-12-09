import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import Container from '../Container';
import { EMPTY_DATA_STRING } from '../../constants';
import { VerifyIcon, RejectIcon } from '../Icons';

import styles from './Voting.scss';

@withTranslation()
class VotingInfo extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    /** Index voting in list */
    index: PropTypes.number.isRequired,
    /** Duration of circulation in blocks */
    duration: PropTypes.number.isRequired,
    /** Description voting */
    description: PropTypes.string.isRequired,
    /** Title voting */
    title: PropTypes.string.isRequired,
    /** Address contract */
    addressContract: PropTypes.string.isRequired,
    /** Formula */
    formula: PropTypes.string.isRequired,
    /** All needed date for voting */
    date: PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
      application: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    onVerifyClick: PropTypes.func.isRequired,
    onRejectClick: PropTypes.func.isRequired,
  };

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
          date: moment(date).format('DD.MM.YYYY'),
          time: moment(date).format('HH:mm'),
        }}
      />
    );
  }

  render() {
    const { props } = this;
    const {
      t,
      date,
      description,
      index,
      title,
      duration,
      addressContract,
      formula,
      onVerifyClick,
      onRejectClick,
    } = props;
    return (
      <div
        className={styles['voting-info']}
      >
        <Container>
          <div
            className={styles['voting-info__back']}
          >
            <Link
              to="/"
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
                  <div
                    className={styles['voting-info__data-title']}
                  >
                    {t('other:dateOfApplication')}
                  </div>
                  <div
                    className={styles['voting-info__data-value']}
                  >
                    {this.getDateString(date.application)}
                  </div>
                  <div
                    className={styles['voting-info__data-title']}
                  >
                    {t('other:durationInBlocks')}
                  </div>
                  <div
                    className={styles['voting-info__data-value']}
                  >
                    {duration}
                  </div>
                  <div
                    className={styles['voting-info__data-title']}
                  >
                    {t('other:newAddressContract')}
                  </div>
                  <div
                    className={styles['voting-info__data-value']}
                  >
                    {addressContract}
                  </div>
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
        </Container>
      </div>
    );
  }
}

export default VotingInfo;
