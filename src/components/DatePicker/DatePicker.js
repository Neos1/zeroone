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
    fieldBefore: PropTypes.shape({
      name: PropTypes.string.isRequired,
      set: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }).isRequired,
    fieldAfter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      set: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }).isRequired,
    onDatesSet: PropTypes.func,
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
    const { fieldBefore, fieldAfter, onDatesSet } = props;
    this.setState({ start: startDate, end: endDate });
    if (startDate) fieldBefore.set(startDate.format('DD.MM.YYYY'));
    if (endDate) fieldAfter.set(endDate.format('DD.MM.YYYY'));
    if (startDate && endDate) onDatesSet();
  }

  render() {
    const { start, end, focusedInput } = this.state;
    const { props } = this;
    const { t, fieldBefore, fieldAfter } = props;
    return (
      <div className={styles['date-picker']}>
        <div className={styles['date-picker__icon']}>
          <DateIcon />
        </div>
        <DateRangePicker
          startDate={start}
          startDateId={fieldBefore.name}
          endDate={end}
          endDateId={fieldAfter.name}
          onDatesChange={this.handleDatesChange}
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
