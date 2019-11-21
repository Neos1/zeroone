import { observable, computed, action } from 'mobx';
import MembersGroup from './MembersGroup';

/**
 * Store for manage Members groups
 */
class MembersStore {
  /**
   * Constructor
   *
   * @param {Array} groups groups with members
   */
  constructor(groups) {
    if (
      Array.isArray(groups) === false
    ) throw new Error('Incorrect groups provided');
    groups.forEach((group) => {
      this.addToGroups(group);
    });
  }

  @observable groups = [];

  @action
  /**
   * Method for adding new group
   *
   * @param {object} group data for group
   */
  addToGroups = (group) => {
    // TODO maybe fix for duplicate
    this.groups.push(new MembersGroup(group));
  }

  @computed
  get list() {
    return this.groups;
  }
}

export default MembersStore;
