import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import Litepicker from 'litepicker';
import moment from 'moment';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import { withTranslation } from 'react-i18next';
import { getCorrectPickerLocale } from '../../utils/Date';
import i18n from '../../i18n';
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
    onDatesSet: PropTypes.func.isRequired,
    onDatesClear: PropTypes.func.isRequired,
    init: PropTypes.shape({
      startDate: PropTypes.instanceOf(moment),
      endDate: PropTypes.instanceOf(moment),
    }),
  };

  static defaultProps = {
    init: {
      startDate: null,
      endDate: null,
    },
  }

  componentDidMount() {
    const { props } = this;
    const {
      init: {
        startDate,
        endDate,
      },
    } = props;
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
      startDate,
      endDate,
    });
    this.updateLanguage();
    this.start = startDate;
    this.end = endDate;
    window.ipcRenderer.on('change-language:confirm', () => {
      this.updateLanguage();
    });
  }

  componentWillUnmount() {
    window.ipcRenderer.removeListener('change-language:confirm', () => {
      this.updateLanguage();
    });
  }

  @computed
  get startDate() {
    return this.start;
  }

  @computed
  get endDate() {
    return this.end;
  }

  /**
   * Method for handle date select
   *
   * @param {Date} startDate start date
   * @param {Date} endDate end date
   */
  @action
  handleSelect = (startDate, endDate) => {
    const { props } = this;
    const { onDatesSet } = props;
    const start = moment(startDate);
    // To include the maximum date in the range
    const end = moment(endDate)
      .add('hours', 23)
      .add('minutes', 59)
      .add('seconds', 59);
    this.start = start;
    this.end = end;
    onDatesSet({ startDate: start, endDate: end });
  }

  /**
   * Method for clearing selected date
   */
  @action
  handleClear = () => {
    const { props } = this;
    const { onDatesClear } = props;
    if (this.picker) {
      this.picker.clearSelection();
    }
    this.start = null;
    this.end = null;
    onDatesClear();
  }

  /**
   * Method for getting correct plural
   * text for tooltip
   *
   * @param {string} language actual language
   * @returns {object} correct tooltip text
   */
  getTooltipText = (language) => {
    switch (language) {
      case 'ru-RU':
        return {
          one: 'день',
          many: 'дней',
          few: 'дня',
        };
      case 'en-US':
        return {
          one: 'day',
          other: 'days',
        };
      default:
        return {
          one: 'day',
          other: 'days',
        };
    }
  }

  /**
   * Method for update options in picker
   * on change language event
   */
  updateLanguage = () => {
    const lang = getCorrectPickerLocale(i18n.language);
    const tooltipText = this.getTooltipText(lang);
    if (this.picker) {
      this.picker.setOptions({
        lang: getCorrectPickerLocale(i18n.language),
        tooltipText,
      });
    }
  }

  render() {
    const { start, end, props } = this;
    const { t } = props;
    const filled = Boolean(start && end);
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
