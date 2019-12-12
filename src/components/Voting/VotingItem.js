import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import VotingDecisionProgress from './VotingDecisionProgress';
import { EMPTY_DATA_STRING } from '../../constants';
import VotingDecision from './VotingDecision';

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
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  };


  // eslint-disable-next-line class-methods-use-this
  getProgress(date) {
    const startStamp = Number(date.start);
    const endStamp = Number(date.end);
    const dateStart = (new Date()).setTime(startStamp);
    const dateEnd = (new Date()).setTime(endStamp);
    const dateNow = new Date();
    const remainig = dateEnd - dateNow;
    const duration = dateEnd - dateStart;
    return ((remainig / duration) * 100);
  }


  /**
   * Method for render decision state
   *
   * @returns {Node} element for actual
   * state
   */
  // eslint-disable-next-line consistent-return
  renderDecisionState = () => {
    const { props } = this;
    const { actualState, date } = props;
    // eslint-disable-next-line no-unused-vars
    const progress = this.getProgress(date);
    switch (progress) {
      case (progress < 100):
        return (
          <VotingDecisionProgress
            progress={progress}
            remained="22 ч 15 мин"
          />
        );
      case (progress >= 100):
        return this.getVotingDescision(actualState);
      default:
        break;
    }
  }

  getVotingDescision = (actualState) => {
    switch (actualState) {
      case 0:
        return (
          <VotingDecisionProgress
            progress={60}
            remained="22 ч 15 мин"
          />
        );
      case 1:
        return (<VotingDecision prosState />);
      case 2:
        return (<VotingDecision prosState={false} />);
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
