import React from 'react';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { DateIcon } from '../Icons';
import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';
import styles from './DatePicker.scss';

@withTranslation()
class DatePicker extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onDatesSet: PropTypes.func,
    id: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onDatesSet: () => {},
  }

  constructor() {
    super();
    this.state = {
      start: null,
      end: null,
      focusedInput: null,
    };
  }

  handleDatesChange = ({ startDate, endDate }) => {
    const { props } = this;
    const { onDatesSet } = props;
    this.setState({ start: startDate, end: endDate });
    if (startDate && endDate) onDatesSet({ startDate, endDate });
  }

  render() {
    const { start, end, focusedInput } = this.state;
    const { props } = this;
    const { t, id } = props;
    return (
      <div className={styles['date-picker']}>
        <div className={styles['date-picker__icon']}>
          <DateIcon />
        </div>
        <DateRangePicker
          startDate={start}
          startDateId={`date_start--${id}`}
          endDate={end}
          endDateId={`date_end--${id}`}
          onDatesChange={this.handleDatesChange}
          customArrowIcon="-"
          startDatePlaceholderText={t('fields:dateFrom')}
          endDatePlaceholderText={t('fields:dateTo')}
          focusedInput={focusedInput}
          // Allow past dates see: https://github.com/airbnb/react-dates/issues/239#issuecomment-302574295
          isOutsideRange={() => false}
          onFocusChange={
            (focusedInputChanged) => {
              this.setState({ focusedInput: focusedInputChanged });
            }
          }
        />
      </div>
    );
  }
}

export default DatePicker;
