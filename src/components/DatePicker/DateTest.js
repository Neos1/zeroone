import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Litepicker from 'litepicker';
import moment from 'moment';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import { withTranslation } from 'react-i18next';
import {
  ThinArrow,
  Arrow,
  DateIcon,
  CloseIcon,
} from '../Icons';

import styles from './DatePicker.scss';

@withTranslation()
@observer
class DateTest extends React.Component {
  @observable start = null;

  @observable end = null;

  ref;

  picker;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

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
      scrollToDate: true,
      showWeekNumbers: false,
      showTooltip: true,
      disableWeekends: false,
      splitView: true,
      onSelect: this.handleSelect,
      buttonText: {
        previousMonth: ReactDOMServer.renderToStaticMarkup(
          <ThinArrow
            width={8}
            height={12}
            color="transparent"
          />,
        ),
        nextMonth: ReactDOMServer.renderToStaticMarkup(
          <ThinArrow
            width={8}
            height={12}
            color="transparent"
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

  @action
  handleClear = () => {
    if (this.picker) {
      this.picker.clearSelection();
    }
    this.start = null;
    this.end = null;
  }

  render() {
    const { start, end, props } = this;
    const { t } = props;
    const filled = Boolean(start && end);
    console.log('startDate', start, 'endDate', end);
    console.log('filled', filled);
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
            placeholder={t('fields:dateFrom')}
            className={`
              ${styles['date-picker__input']}
              ${styles['date-picker__min']}
            `}
            ref={
              (el) => {
                this.minRef = el;
              }
            }
          />
          <div className={styles['date-picker__input-after']}>
            <span className={styles['date-picker__input-placeholder']}>
              {t('fields:dateFrom')}
            </span>
            <span className={styles['date-picker__input-line']} />
          </div>
        </label>
        <div className={styles['date-picker__arrow--basic']}>
          <Arrow />
        </div>
        { /* eslint-disable-next-line */}
        <label>
          <input
            placeholder={t('fields:dateTo')}
            className={`
              ${styles['date-picker__input']}
              ${styles['date-picker__max']}
            `}
            ref={
              (el) => {
                this.maxRef = el;
              }
            }
          />
          <div className={styles['date-picker__input-after']}>
            <span className={styles['date-picker__input-placeholder']}>
              {t('fields:dateTo')}
            </span>
            <span className={styles['date-picker__input-line']} />
          </div>
        </label>
        <button
          type="button"
          className={`
            ${styles['date-picker__clear']}
            ${
              filled ? styles['date-picker__clear--visible'] : ''
            }
          `}
          onClick={this.handleClear}
        >
          <CloseIcon
            fill="currentColor"
          />
        </button>
      </div>
    );
  }
}

export default DateTest;
