import moment from 'moment';

/**
 * Method for get progress by date range
 *
 * @param {object} date date range in sec
 * @param {string} date.start start range date in sec
 * @param {string} date.end end range date in sec
 * @returns {number} progress value NOW in %
 */
const progressByDateRange = (date) => {
  if (!date || !date.start || !date.end) throw new Error('Incorrect date provided');
  const nowFormatted = moment().valueOf() / 1000;
  const percentValue = (Number(date.end) - Number(date.start)) / 100;
  const progressValue = Math.floor((nowFormatted - Number(date.start)) / percentValue);
  if (progressValue < 0) return 0;
  if (progressValue > 100) return 100;
  return progressValue;
};

/**
 * Method for getting correct moment
 * locale name
 *
 * @param {string} locale locale for convert
 * @returns {string} correct moment locale
 */
const getCorrectMomentLocale = (locale) => {
  switch (locale) {
    case 'RUS':
      return 'ru';
    case 'ENG':
      return 'en-gb';
    default:
      return 'en-gb';
  }
};

export default progressByDateRange;

export {
  progressByDateRange,
  getCorrectMomentLocale,
};
