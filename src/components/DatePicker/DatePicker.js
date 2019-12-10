import React from 'react';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';
import './DatePicker.scss';

class DatePicker extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
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
    const { placeholder } = props;
    return (
      <div>
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
          startDatePlaceholderText={placeholder}
          endDatePlaceholderText=""
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
