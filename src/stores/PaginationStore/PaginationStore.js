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
  handleChange = (page) => {
    let activePage = page;
    if (page > this.lastPage) activePage = this.lastPage;
    if (page < 1) activePage = 1;
    this.activePage = activePage;
  }
}

export default PaginationStore;
