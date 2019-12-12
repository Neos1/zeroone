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
    this.rawList = list;
    this.pagination = new PaginationStore({
      totalItemsCount: this.rawList.length,
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
   * Method for filter by date
   *
   * @returns {Array} list from date range
   */
  @computed
  get filteredByDateList() {
    let resultList = [];
    const rulesKeys = Object.keys(this.rules);
    if (rulesKeys.length) {
      rulesKeys.forEach((key) => {
        if (key === 'date') {
          const { start, end } = this.rules[key];
          // Filter list with startTime by start & end date rule
          const filtered = this.rawList.filter(
            (item) => (
              parseInt(item.startTime, 10) >= start
              && parseInt(item.startTime, 10) <= end
            ),
          );
          resultList = resultList.concat(filtered);
          // If result by date not found
          // return rawList
        } else if (resultList.length === 0) {
          resultList = this.rawList;
        }
      });
    } else {
      resultList = this.rawList;
    }
    return resultList;
  }

  /**
   * Method for getting list filtered
   * by filter rules
   *
   * @returns {Array} correct list
   */
  filteredList() {
    let resultList = [];
    const listByDate = this.filteredByDateList;
    const rulesKeys = Object.keys(this.rules);
    // If rules not exist return list by date
    if (!rulesKeys.length) {
      this.pagination.update({
        key: 'totalItemsCount',
        value: listByDate.length,
      });
      return listByDate;
    }
    rulesKeys.forEach((key) => {
      if (key !== 'date') {
        const filtered = listByDate.filter(
          (item) => (
            item[key] === this.rules[key]
            // Check that the item has not been added to the resultList
            && !resultList.find((included) => Object.is(included, item))
          ),
        );
        resultList = resultList.concat(filtered);
        // If exist only date rule result is list by date
      } else if (rulesKeys.length === 1) {
        resultList = listByDate;
      }
    });
    this.pagination.update({
      key: 'totalItemsCount',
      value: resultList.length,
    });
    return resultList;
  }

  /**
   * Method for getting list filtered
   * by filter rules & pagination
   *
   * @returns {Array} actual list
   */
  list() {
    const range = this.paginationRange;
    return this.filteredList().slice(range[0], range[1] + 1);
  }

  /** List with all the data */
  @observable rawList;

  /** List of rules for filtering data */
  @observable rules = {};

  /**
   * Method for adding (or rewrite)
   * a list filter rule
   *
   * @param {object} rule filter rule
   */
  @action
  addFilterRule = (rule) => {
    this.pagination.update({
      key: 'activePage',
      value: 1,
    });
    Object.keys(rule).forEach((key) => {
      this.rules[key] = rule[key];
    });
  }

  /**
   * Method for reset state this store
   */
  @action
  reset = () => {
    this.rules = {};
  }
}

export default DataManagerStore;
