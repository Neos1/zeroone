import FilterStore from '.';

describe('FilterStore', () => {
  describe('data with date', () => {
    let filter;
    const dataList = [
      {
        data: 1,
        test: 1,
        startTime: '1566383552',
        endTime: '1566383852',
      },
      {
        data: 2,
        test: 2,
        startTime: '1566384552',
        endTime: '1566384852',
      },
      {
        data: 3,
        test: 3,
        startTime: '1566385552',
        endTime: '1566385852',
      },
      {
        data: 4,
        test: 4,
        startTime: '1566386552',
        endTime: '1566386852',
      },
    ];

    beforeEach(() => {
      filter = new FilterStore();
    });

    it('addFilterRule by date should change rules object & filteredByDateList should be correct', () => {
      expect(filter.rules).toEqual({});
      filter.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(filter.rules).toEqual({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(filter.filteredByDateList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
        {
          data: 2,
          test: 2,
          startTime: '1566384552',
          endTime: '1566384852',
        },
        {
          data: 3,
          test: 3,
          startTime: '1566385552',
          endTime: '1566385852',
        },
      ]);
    });

    it('filteredList should be correct only with date rule', () => {
      expect(filter.rules).toEqual({});
      filter.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(filter.rules).toEqual({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(filter.filteredByDateList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
        {
          data: 2,
          test: 2,
          startTime: '1566384552',
          endTime: '1566384852',
        },
        {
          data: 3,
          test: 3,
          startTime: '1566385552',
          endTime: '1566385852',
        },
      ]);
      expect(filter.filteredList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
        {
          data: 2,
          test: 2,
          startTime: '1566384552',
          endTime: '1566384852',
        },
        {
          data: 3,
          test: 3,
          startTime: '1566385552',
          endTime: '1566385852',
        },
      ]);
    });

    it('filteredList should be correct with date & other rule', () => {
      expect(filter.rules).toEqual({});
      filter.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      filter.addFilterRule({ data: 1 });
      expect(filter.rules).toEqual({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
        data: 1,
      });
      expect(filter.filteredByDateList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
        {
          data: 2,
          test: 2,
          startTime: '1566384552',
          endTime: '1566384852',
        },
        {
          data: 3,
          test: 3,
          startTime: '1566385552',
          endTime: '1566385852',
        },
      ]);
      expect(filter.filteredList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
      ]);
    });

    it('filteredList should be correct with different filter for one item', () => {
      expect(filter.rules).toEqual({});
      filter.addFilterRule({ data: 1, test: 1 });
      expect(filter.rules).toEqual({ data: 1, test: 1 });
      expect(filter.filteredList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
      ]);
    });

    it('reset should clear filter rules', () => {
      expect(filter.rules).toEqual({});
      filter.addFilterRule({ data: 1 });
      expect(filter.rules).toEqual({ data: 1 });
      filter.reset();
      expect(filter.rules).toEqual({});
    });

    it('filteredByDateList & filteredList should be correct with date, then with other rule', () => {
      expect(filter.rules).toEqual({});
      filter.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(filter.filteredByDateList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
        {
          data: 2,
          test: 2,
          startTime: '1566384552',
          endTime: '1566384852',
        },
        {
          data: 3,
          test: 3,
          startTime: '1566385552',
          endTime: '1566385852',
        },
      ]);
      expect(filter.filteredList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
        {
          data: 2,
          test: 2,
          startTime: '1566384552',
          endTime: '1566384852',
        },
        {
          data: 3,
          test: 3,
          startTime: '1566385552',
          endTime: '1566385852',
        },
      ]);
      filter.addFilterRule({ data: 1 });
      expect(filter.filteredByDateList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
      ]);
      expect(filter.filteredList(dataList)).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
      ]);
    });
  });
});
