/* eslint-disable no-useless-escape */
export const votingStates = {
  default: 0,
  prepared: 1,
  active: 2,
};

export const SOL_PATH_REGEXP = new RegExp(/(\"|\')((\.{1,2}\/){1,})(\w+\/){0,}?(\w+\.(?:sol))(\"|\')/g);
export const SOL_IMPORT_REGEXP = new RegExp(/(import)*.(\"|\')((\.{1,2}\/){1,})(\w+\/){0,}?(\w+\.(?:sol))(\"|\')(;)/g);
export const SOL_VERSION_REGEXP = new RegExp(/(pragma).(solidity).((\^)?)([0-9](.)?){1,}/g);

export const walletHdPath = "m/44'/60'/0'/0/0";
