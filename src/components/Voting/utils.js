import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import { EMPTY_DATA_STRING } from '../../constants';
import { RejectIcon, NoQuorum, VerifyIcon } from '../Icons';

import styles from './Voting.scss';

/**
 * Method for render icon with text
 *
 * @param {string} state state for icon
 * @returns {Node} ready node element
 */
const renderDecisionIcon = ({
  state,
  t,
}) => {
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
};


/**
 * Method for getting formatted date string
 *
 * @param {Date} date date for formatting
 * @returns {string} formatted date
 */
const getDateString = (date) => {
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
};

export default withTranslation()(renderDecisionIcon);

export {
  getDateString,
};
