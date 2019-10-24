import { observable, action, computed } from 'mobx';

class UserStore {
  @observable wallet = {};
}

const userStore = new UserStore();

export default userStore;
