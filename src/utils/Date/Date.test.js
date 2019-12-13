import moment from 'moment';
import progressByDateRange from '.';

describe('progressByDateRange', () => {
  it('progressByDateRange should throw without date', () => {
    expect(progressByDateRange).toThrow();
  });

  it('progressByDateRange for yesterday & tomorrow should be 50', () => {
    const tomorrow = moment(new Date()).add(1, 'days').valueOf() / 1000;
    const yesterday = moment(new Date()).add(-1, 'days').valueOf() / 1000;
    expect(progressByDateRange({
      start: yesterday,
      end: tomorrow,
    })).toEqual(50);
  });

  it('progressByDateRange for yesterday & now should be 100', () => {
    const now = moment(new Date()).valueOf() / 1000;
    const yesterday = moment(new Date()).add(-1, 'days').valueOf() / 1000;
    expect(progressByDateRange({
      start: yesterday,
      end: now,
    })).toEqual(100);
  });

  it('progressByDateRange for -2 & -1 day should be 100', () => {
    const day1 = moment(new Date()).add(-2, 'days').valueOf() / 1000;
    const day2 = moment(new Date()).add(-1, 'days').valueOf() / 1000;
    expect(progressByDateRange({
      start: day1,
      end: day2,
    })).toEqual(100);
  });

  it('progressByDateRange for +1 & +2 day should be 0', () => {
    const day1 = moment(new Date()).add(1, 'days').valueOf() / 1000;
    const day2 = moment(new Date()).add(2, 'days').valueOf() / 1000;
    expect(progressByDateRange({
      start: day1,
      end: day2,
    })).toEqual(0);
  });
});
