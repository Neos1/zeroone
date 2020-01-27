import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Litepicker from 'litepicker';
import moment from 'moment';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import { ThinArrow, Arrow, DateIcon } from '../Icons';

import styles from './DatePicker.scss';

@observer
class DateTest extends React.Component {
  @observable start = null;

  @observable end = null;

  ref;

  picker;

  componentDidMount() {
    this.picker = new Litepicker({
      element: this.minRef,
      elementEnd: this.maxRef,
      format: 'DD.MM.YYYY',
      firstDay: 1,
      numberOfMonths: 2,
      numberOfColumns: 2,
      minDate: null,
      maxDate: null,
      minDays: null,
      maxDays: null,
      singleMode: false,
      autoApply: true,
      showWeekNumbers: false,
      showTooltip: true,
      disableWeekends: false,
      splitView: true,
      onSelect: this.handleSelect,
      buttonText: {
        previousMonth: ReactDOMServer.renderToStaticMarkup(
          <ThinArrow
            width={18}
            height={18}
          />,
        ),
        nextMonth: ReactDOMServer.renderToStaticMarkup(
          <ThinArrow
            width={18}
            height={18}
            reverse
          />,
        ),
      },
    });
    console.log('mount', this.picker);
  }

  componentWillUnmount() {
  }

  @computed
  get startDate() {
    return this.start;
  }

  @computed
  get endDate() {
    return this.end;
  }

  @action
  handleSelect = (startDate, endDate) => {
    this.start = moment(startDate);
    this.end = moment(endDate);
    console.log('startDate', startDate, 'endDate', endDate);
  }

  render() {
    const { start, end } = this;
    console.log('startDate', start, 'endDate', end);
    return (
      <div
        className={styles['date-picker']}
      >
        { /* eslint-disable-next-line */}
        <label>
          <div className={styles['date-picker__icon']}>
            <DateIcon />
          </div>
          <input
            className={styles['date-picker__min']}
            ref={
              (el) => {
                this.minRef = el;
              }
            }
          />
          <span />
        </label>
        <div className={styles['date-picker__arrow--basic']}>
          <Arrow />
        </div>
        { /* eslint-disable-next-line */}
        <label>
          <input
            className={styles['date-picker__max']}
            ref={
              (el) => {
                this.maxRef = el;
              }
            }
          />
          <span />
        </label>
      </div>
    );
  }
}

export default DateTest;
