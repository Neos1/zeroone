/* eslint-disable no-useless-escape */
export const statusStates = {
  active: '1',
  closed: '0',
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
  addingNewQuestion: 0,
  connectGroupUsers: 1,
  connectGroupQuestions: 2,
  assignGroupAdmin: 3,
};

export const tokenTypes = {
  ERC20: '0',
  Custom: '1',
};

export const votingDecisionStates = {
  default: 0,
  agree: 1,
  reject: 2,
};

export const languages = {
  RUS: 'ru',
  ENG: 'en',
};

export const transactionSteps = {
  compileOrSign: 0,
  sending: 1,
  txHash: 2,
  txReceipt: 3,
  questionsUploading: 4,
  success: 5,
};

export const SOL_PATH_REGEXP = new RegExp(/(\"|\')(((\.{1,2}\/){1,})||(zeroone-voting-vm\/))(\w+\/){0,}?(\w+\.(?:sol))(\"|\')/g);
export const VM_IMPORT_REGEXP = new RegExp(/(zeroone-voting-vm)([\/\\]\w+[\/\\]).{1,}(\w+\.(?:sol))/g);
export const SOL_IMPORT_REGEXP = new RegExp(/(import)*.(\"|\')((\.{1,}\/)||(zeroone-voting-vm\/))+((\w+\/*())+(\w+\.(?:sol)))(\"|\')(;)/g);
export const SOL_ENCODER_REGEXP = new RegExp(/(pragma experimental ABIEncoderV2;)/g);
export const SOL_VERSION_REGEXP = new RegExp(/(pragma).(solidity).((\^)?)([0-9](.)?){1,}.(;)/g);


export const EMPTY_DATA_STRING = '-/-';
export const walletHdPath = "m/44'/60'/0'/0/0";
