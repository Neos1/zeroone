import { observable, computed } from 'mobx';
import PaginationStore from '../PaginationStore';

/**
 * Class for easy manage list data
 */
class DataManagerStore {
  constructor({
    list,
    itemsCountPerPage,
  }) {
    this.list = list;
    this.pagination = new PaginationStore({
      totalItemsCount: this.list.length,
      itemsCountPerPage,
    });
  }

  /**
   * Method for getting pagination range
   *
   * @returns {Array} [lowRange, highRange]
   * lowRange is index first element for current activePage pagination
   * highRange is index last element for current activePage pagination
   */
  @computed
  get paginationRange() {
    const { activePage, itemsCountPerPage } = this.pagination;
    const lowRange = (activePage - 1) * itemsCountPerPage;
    const highRange = (activePage) * itemsCountPerPage - 1;
    return [lowRange, highRange];
  }

  @computed
  get filteredList() {
    const range = this.paginationRange;
    return this.list.slice(range[0], range[1] + 1);
  }

  // Contain all items
  @observable list;
}

export default DataManagerStore;
