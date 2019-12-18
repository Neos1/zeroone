import {
  action,
  set,
  entries,
  computed,
  observable,
} from 'mobx';

class FilterStore {
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
    let resultList = [];
    const listByDate = this.filteredByDateList(rawList);
    const rulesKeys = Object.keys(this.rules);
    // If _rules not exist return list by date
    if (!rulesKeys.length) {
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
    return resultList;
  }

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
  addFilterRule = (rule, cb) => {
    Object.keys(rule).forEach((key) => {
      set(this._rules, key, rule[key]);
    });
    if (cb) cb();
  }

  /**
   * Method for reset state this store
   */
  @action
  reset = () => {
    this._rules = {};
  }
}

export default FilterStore;
