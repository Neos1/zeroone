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
  };

  constructor() {
    super();
    this.state = {
      start: null,
      end: null,
      focusedInput: null,
    };
  }

  render() {
    const { start, end, focusedInput } = this.state;
    const { props } = this;
    const { t } = props;
    return (
      <div className={styles['date-picker']}>
        <div className={styles['date-picker__icon']}>
          <DateIcon />
        </div>
        <DateRangePicker
          startDate={start}
          startDateId="your_unique_start_date_id"
          endDate={end}
          endDateId="your_unique_end_date_id"
          onDatesChange={
            ({ startDate, endDate }) => {
              this.setState({ start: startDate, end: endDate });
            }
          }
          customArrowIcon="-"
          startDatePlaceholderText={t('fields:dateFrom')}
          endDatePlaceholderText={t('fields:dateTo')}
          focusedInput={focusedInput}
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
