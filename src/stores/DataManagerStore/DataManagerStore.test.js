import DataManagerStore from '.';

describe('DataManagerStore', () => {
  describe('data with date', () => {
    let dataManager;

    beforeEach(() => {
      dataManager = new DataManagerStore({
        list: [
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
        ],
        itemsCountPerPage: 2,
      });
    });

    it('addFilterRule by date should change rules object & filteredByDateList should be correct', () => {
      expect(dataManager.rules).toEqual({});
      dataManager.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(dataManager.rules).toEqual({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(dataManager.filteredByDateList).toEqual([
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
      expect(dataManager.rules).toEqual({});
      dataManager.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(dataManager.rules).toEqual({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      expect(dataManager.filteredByDateList).toEqual([
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
      expect(dataManager.filteredList()).toEqual([
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
      expect(dataManager.rules).toEqual({});
      dataManager.addFilterRule({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
      });
      dataManager.addFilterRule({ data: 1 });
      expect(dataManager.rules).toEqual({
        date: {
          start: 1566383552,
          end: 1566385552,
        },
        data: 1,
      });
      expect(dataManager.filteredByDateList).toEqual([
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
      expect(dataManager.filteredList()).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
      ]);
    });

    it('filteredList should be correct with different filter for one item', () => {
      expect(dataManager.rules).toEqual({});
      dataManager.addFilterRule({ data: 1, test: 1 });
      expect(dataManager.rules).toEqual({ data: 1, test: 1 });
      expect(dataManager.filteredList()).toEqual([
        {
          data: 1,
          test: 1,
          startTime: '1566383552',
          endTime: '1566383852',
        },
      ]);
    });
  });

  describe('itemsCountPerPage 2', () => {
    let dataManager;

    beforeEach(() => {
      dataManager = new DataManagerStore({
        list: [
          {
            data: 1,
            test: 1,
          },
          {
            data: 2,
            test: 2,
          },
          {
            data: 3,
            test: 3,
          },
          {
            data: 4,
            test: 4,
          },
        ],
        itemsCountPerPage: 2,
      });
    });

    it('paginationRange should return correct arrays', () => {
      expect(dataManager.paginationRange).toEqual([0, 1]);
      dataManager.pagination.handleChange(2);
      expect(dataManager.paginationRange).toEqual([2, 3]);
    });

    it('filteredList & list should be correct', () => {
      expect(dataManager.filteredList()).toEqual([
        {
          data: 1,
          test: 1,
        },
        {
          data: 2,
          test: 2,
        },
        {
          data: 3,
          test: 3,
        },
        {
          data: 4,
          test: 4,
        },
      ]);
      expect(dataManager.list()).toEqual([{ data: 1, test: 1 }, { data: 2, test: 2 }]);
      dataManager.pagination.handleChange(2);
      expect(dataManager.list()).toEqual([{ data: 3, test: 3 }, { data: 4, test: 4 }]);
    });

    it('addFilterRule should change rules object & filteredList should be correct', () => {
      expect(dataManager.rules).toEqual({});
      dataManager.addFilterRule({ data: 1 });
      expect(dataManager.rules).toEqual({ data: 1 });
      expect(dataManager.filteredList()).toEqual([
        { data: 1, test: 1 },
      ]);
      dataManager.addFilterRule({ test: 2 });
      expect(dataManager.rules).toEqual({ data: 1, test: 2 });
      expect(dataManager.filteredList()).toEqual([
        { data: 1, test: 1 },
        { data: 2, test: 2 },
      ]);
    });

    it('reset should clear filter rules', () => {
      expect(dataManager.rules).toEqual({});
      dataManager.addFilterRule({ data: 1 });
      expect(dataManager.rules).toEqual({ data: 1 });
      dataManager.reset();
      expect(dataManager.rules).toEqual({});
    });
  });

  describe('itemsCountPerPage 10', () => {
    let dataManager;

    beforeEach(() => {
      dataManager = new DataManagerStore({
        list: [
          {
            data: 1,
          },
          {
            data: 2,
          },
          {
            data: 3,
          },
          {
            data: 4,
          },
        ],
        itemsCountPerPage: 10,
      });
    });

    it('paginationRange with  should return correct arrays', () => {
      expect(dataManager.paginationRange).toEqual([0, 9]);
      // It's not trigger change activePage, as list length
      // has only 4 elements
      dataManager.pagination.handleChange(2);
      expect(dataManager.paginationRange).toEqual([0, 9]);
    });
  });
});
