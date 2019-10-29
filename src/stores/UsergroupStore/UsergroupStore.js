import { observable, action } from 'mobx';
/**
 * class for working with userGroup
 */
class UsergroupStore {
  @observable id = '';

  @observable alias = '';

  @observable description = '';

  @observable address = '';

  @observable totalSupply = 0;

  @observable tokenSymbol = '';

  @observable tokenType = '';

  @observable usersList = [];

  /**
   * @constructor
   * @param {object} groupInfo  Contains info about group
   * @param {string} groupInfo.id id of usergroup
   * @param {string} groupInfo.alias Name of the group in contract
   * @param {string} groupInfo.description Description about userGroup
   * @param {string} groupInfo.address Address of smart-contract
   * @param {number} groupInfo.totalSupply Total token balance of smart-contract
   * @param {string} groupInfo.tokenSymbol Short token symbol
   * @param {Array} groupInfo.usersList List of users
   */
  constructor({
    id, alias, description, address, totalSupply, tokenSymbol, tokenType, usersList,
  }) {
    this.id = id;
    this.alias = alias;
    this.description = description;
    this.address = address;
    this.totalSupply = totalSupply;
    this.tokenSymbol = tokenSymbol;
    this.tokenType = tokenType;
    this.usersList = usersList;
  }

  /**
   * Getting user token balance from contract
   * @function
   * @param {string} address Address of user
   */
  @action getUserBalance = async (address) => {
    /* web3.eth.getBalance(address).call({from:'userAddress'})
      .then((balance) => {
        this.addUser(address, balance);
      }) */
    this.address = address;
    return (this.address, address);
  }

  /**
   * Adding user with his balance into array
   * @function
   * @param {string} address Address of user wallet
   * @param {number} tokenBalance user token balance in this usergroup
   */
  @action addUser = (address, tokenBalance) => {
    const { groupInfo } = this;
    groupInfo.usersList.push({ address, tokenBalance });
  }

  /**
   * Transfering tokens between users
   * @param {string} from address, who will send tokens
   * @param {address} to  address, who will recieve tokens
   * @param {number} count number of tokens
   */
  @action transferTokens(from, to, count) {
    return (this.tokenType, from, to, count);
  }
}


export default UsergroupStore;
