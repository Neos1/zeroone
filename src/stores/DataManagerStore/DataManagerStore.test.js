import DataManagerStore from '.';

describe('DataManagerStore', () => {
  describe('itemsCountPerPage 2', () => {
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
        itemsCountPerPage: 2,
      });
    });

    it('paginationRange should return correct arrays', () => {
      expect(dataManager.paginationRange).toEqual([0, 1]);
      dataManager.pagination.handleChange(2);
      expect(dataManager.paginationRange).toEqual([2, 3]);
    });

    it('filteredList should be correct', () => {
      expect(dataManager.filteredList).toEqual([{ data: 1 }, { data: 2 }]);
      dataManager.pagination.handleChange(2);
      expect(dataManager.filteredList).toEqual([{ data: 3 }, { data: 4 }]);
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
