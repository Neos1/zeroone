import { observable, computed, action } from 'mobx';
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

  /**
   * Method for getting list filtered
   * by rules and pagination
   *
   * @returns {Array} correct list
   */
  @computed
  get filteredList() {
    let resultList = [];
    // const range = this.paginationRange;
    const rulesKeys = Object.keys(this.rules);
    if (rulesKeys.length) {
      rulesKeys.forEach((key) => {
        const filtered = this.list.filter((item) => item[key] === this.rules[key]);
        resultList = resultList.concat(filtered);
      });
    } else {
      resultList = this.list;
    }
    return resultList;
    // return this.list.slice(range[0], range[1] + 1);
  }

  /** List with all the data */
  @observable list;

  /** List of rules for filtering data */
  @observable rules = {};

  /**
   * Method for adding (or rewrite)
   * a list filter rule
   *
   * @param {object} rule filter rule
   */
  @action
  addRule = (rule) => {
    Object.keys(rule).forEach((key) => {
      this.rules[key] = rule[key];
    });
  }
}

export default DataManagerStore;
