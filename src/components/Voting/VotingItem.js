import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTranslation, Trans } from 'react-i18next';
import VotingDecisionProgress from './VotingDecisionProgress';
import { EMPTY_DATA_STRING } from '../../constants';

import styles from './Voting.scss';

@withTranslation()
class VotingItem extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    actualState: PropTypes.string.isRequired,
    date: PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
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
    const { actualState } = props;
    switch (actualState) {
      case 'progress':
        return (
          <VotingDecisionProgress
            progress={60}
            remained="22 ч 15 мин"
          />
        );
      case 'pros':
        return (<div>Pros</div>);
      case 'cons':
        return (<div>Cons</div>);
      default:
        return (<div>Voting</div>);
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
      index,
      title,
      description,
      t,
      date,
    } = props;
    return (
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
    );
  }
}

export default VotingItem;
