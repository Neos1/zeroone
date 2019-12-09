import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
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

  getDateString = (date) => {
    if (
      !date
      || date instanceof Date !== true
    ) return EMPTY_DATA_STRING;
    return `${moment(date).format('DD.MM.YYYY')}`;
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
