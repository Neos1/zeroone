import {
  action,
  set,
  remove,
  entries,
  computed,
  observable,
} from 'mobx';

class FilterStore {
  /** List of _rules for filtering data */
  @observable _rules = {};

  @computed
  get rules() {
    const result = {};
    const ruleEntries = entries(this._rules);
    ruleEntries.forEach((key) => {
      const ruleKey = key[0];
      const ruleValue = key[1];
      result[ruleKey] = ruleValue;
    });
    return result;
  }

  /**
   * Method for adding (or rewrite)
   * a list filter rule
   *
   * @param {object} rule filter rule
   * @param {Function} cb callback
   */
  @action
  addFilterRule(rule, cb) {
    Object.keys(rule).forEach((key) => {
      set(this._rules, key, rule[key]);
    });
    if (cb) cb();
  }

  /**
   * Method for removing rule from list rules
   *
   * @param {string} rule rule name for removing
   * @param {Function} cb callback function
   */
  @action
  removeFilterRule(rule, cb) {
    remove(this._rules, rule);
    if (cb) cb();
  }

  /**
   * Method for reset state this store
   */
  @action
  reset() {
    this._rules = {};
  }

  /**
   * Method for filter by date
   *
   * @param {Array} rawList raw data
   * @returns {Array} list from date range
   */
  filteredByDateList(rawList) {
    let resultList = [];
    const rulesKeys = Object.keys(this.rules);
    if (rulesKeys.length) {
      if (!this.rules.date) return rawList;
      rulesKeys.forEach((key) => {
        if (key === 'date') {
          const { start, end } = this.rules.date;
          // Filter list with startTime by start & end date rule
          const filtered = rawList.filter(
            (item) => (
              parseInt(item.startTime, 10) >= start
              && parseInt(item.startTime, 10) <= end
            ),
          );
          resultList = resultList.concat(filtered);
        }
      });
    } else {
      resultList = rawList;
    }
    return resultList;
  }

  /**
   * Method for getting list filtered
   * by filter rules
   *
   * @param {Array} data raw data
   * @returns {Array} correct list
   */
  filteredList(data) {
    const rawList = data;
    const listByDate = this.filteredByDateList(rawList);
    const rulesKeys = Object.keys(this.rules);
    // If _rules not exist return list by date
    if (!rulesKeys.length) {
      return listByDate;
    }
    let resultList = listByDate;
    rulesKeys.forEach((key) => {
      if (key !== 'date') {
        if (this.rules[key] !== '*') {
          resultList = this.filterByKey(resultList, key, this.rules[key]);
        }
        // If exist only date rule result is list by date
      } else if (rulesKeys.length === 1) {
        resultList = listByDate;
      }
    });
    return resultList;
  }

  // eslint-disable-next-line class-methods-use-this
  filterByKey(list, key, value) {
    return list.filter((item) => item[key] === value);
  }
}

export default FilterStore;
