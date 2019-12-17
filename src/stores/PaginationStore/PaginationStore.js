import { observable, action, computed } from 'mobx';

const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE_RANGE = 5;

class PaginationStore {
  constructor({
    totalItemsCount,
    itemsCountPerPage,
    pageRangeDisplayed,
  }) {
    this.totalItemsCount = totalItemsCount;
    this.itemsCountPerPage = itemsCountPerPage || DEFAULT_ITEMS_PER_PAGE;
    this.pageRangeDisplayed = pageRangeDisplayed || DEFAULT_PAGE_RANGE;
  }

  @observable activePage = 1;

  @computed
  get lastPage() {
    return Math.ceil(this.totalItemsCount / this.itemsCountPerPage);
  }

  @observable itemsCountPerPage;

  @observable totalItemsCount;

  @observable pageRangeDisplayed;

  @action
  update = (newState) => {
    Object.keys(newState).forEach((key) => {
      this[key] = newState[key];
    });
  }

  @action
  handleChange = (page) => {
    let activePage = page;
    if (page > this.lastPage) activePage = this.lastPage;
    if (page < 1) activePage = 1;
    this.activePage = activePage;
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
    const { activePage, itemsCountPerPage } = this;
    const lowRange = (activePage - 1) * itemsCountPerPage;
    const highRange = (activePage) * itemsCountPerPage - 1;
    return [lowRange, highRange];
  }
}

export default PaginationStore;
