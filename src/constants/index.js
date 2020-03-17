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

export const systemQuestionsId = {
  addingNewQuestion: 1,
  connectGroupUsers: 2,
  connectGroupQuestions: 3,
  assignGroupAdmin: 4,
};

export const tokenTypes = {
  ERC20: '0',
  Custom: '1',
};

export const languages = {
  RUS: 'ru',
  ENG: 'en',
};

export const SOL_PATH_REGEXP = new RegExp(/(\"|\')(((\.{1,2}\/){1,})||(zeroone-voting-vm\/))(\w+\/){0,}?(\w+\.(?:sol))(\"|\')/g);
export const VM_IMPORT_REGEXP = new RegExp(/(zeroone-voting-vm)([\/\\]\w+[\/\\]).{1,}(\w+\.(?:sol))/g);
export const SOL_IMPORT_REGEXP = new RegExp(/(import)*.(\"|\')((\.{1,}\/)||(zeroone-voting-vm\/))+((\w+\/*())+(\w+\.(?:sol)))(\"|\')(;)/g);
export const SOL_ENCODER_REGEXP = new RegExp(/(pragma experimental ABIEncoderV2;)/g);
export const SOL_VERSION_REGEXP = new RegExp(/(pragma).(solidity).((\^)?)([0-9](.)?){1,}.(;)/g);


export const EMPTY_DATA_STRING = '-/-';
export const walletHdPath = "m/44'/60'/0'/0/0";
