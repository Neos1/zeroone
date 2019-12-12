import PaginationStore from '.';

describe('PaginationStore', () => {
  it('should be with correct data for total 101 & items per page 10', () => {
    const pagination = new PaginationStore({
      totalItemsCount: 101,
    });
    expect(pagination.lastPage).toEqual(11);
    expect(pagination.activePage).toEqual(1);
    expect(pagination.pageRangeDisplayed).toEqual(5);
  });

  it('should be with correct data for total 21 & items per page 2', () => {
    const pagination = new PaginationStore({
      totalItemsCount: 21,
      itemsCountPerPage: 2,
    });
    expect(pagination.lastPage).toEqual(11);
    expect(pagination.activePage).toEqual(1);
    expect(pagination.pageRangeDisplayed).toEqual(5);
  });

  it('handleChange should set correct page', () => {
    const pagination = new PaginationStore({
      totalItemsCount: 100,
      itemsCountPerPage: 10,
    });
    expect(pagination.activePage).toEqual(1);
    pagination.handleChange(0);
    expect(pagination.activePage).toEqual(1);
    pagination.handleChange(5);
    expect(pagination.activePage).toEqual(5);
    expect(pagination.lastPage).toEqual(10);
    pagination.handleChange(11);
    expect(pagination.activePage).toEqual(10);
  });
});
