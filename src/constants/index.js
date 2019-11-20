/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */

export const votingStates = {
  default: 0,
  prepared: 1,
  active: 2,
};

export const fs = window.require('fs');
export const path = window.require('path');

const ENV = process.env.NODE_ENV || 'development';
window.__ENV = ENV;

const devPath = window.process.env.INIT_CWD;
const prodPath = window.process.env.PORTABLE_EXECUTABLE_DIR || path.join(window.__dirname, '../src');

export const ROOT_DIR = window.__ENV === 'production'
  ? prodPath
  : path.join(devPath, './src/');

export const PATH_TO_WALLETS = window.__ENV === 'production'
  ? path.join(prodPath, './wallets/')
  : path.join(devPath, './src/wallets/');

export const PATH_TO_CONTRACTS = window.__ENV === 'production'
  ? path.join(prodPath, './contracts/')
  : path.join(devPath, './src/contracts/');

export const SOL_PATH_REGEXP = new RegExp(/(\"|\')((\.{1,2}\/){1,})(\w+\/){0,}?(\w+\.(?:sol))(\"|\')/g);
export const SOL_IMPORT_REGEXP = new RegExp(/(import)*.(\"|\')((\.{1,2}\/){1,})(\w+\/){0,}?(\w+\.(?:sol))(\"|\')(;)/g);
export const SOL_VERSION_REGEXP = new RegExp(/(pragma).(solidity).((\^)?)([0-9](.)?){1,}/g);

export const EMPTY_DATA_STRING = '-/-';
