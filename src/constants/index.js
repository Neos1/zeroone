/* eslint-disable no-useless-escape */
export const statusStates = {
  active: '0',
  closed: '1',
};

export const votingStates = {
  default: '0',
  decisionFor: '1',
  decisionAgainst: '2',
};

export const userVotingStates = {
  notAccepted: 0,
  decisionFor: 1,
  decisionAgainst: 2,
};

export const SOL_PATH_REGEXP = new RegExp(/(\"|\')((\.{1,2}\/){1,})(\w+\/){0,}?(\w+\.(?:sol))(\"|\')/g);
export const SOL_IMPORT_REGEXP = new RegExp(/(import)*.(\"|\')((\.{1,2}\/){1,})(\w+\/){0,}?(\w+\.(?:sol))(\"|\')(;)/g);
export const SOL_VERSION_REGEXP = new RegExp(/(pragma).(solidity).((\^)?)([0-9](.)?){1,}/g);

export const EMPTY_DATA_STRING = '-/-';
export const walletHdPath = "m/44'/60'/0'/0/0";
export const GAS_LIMIT = 7900000;
