/* eslint-disable import/prefer-default-export */

export const votingStates = {
  default: 0,
  prepared: 1,
  active: 2,
};

export const fs = window.require('fs');
export const path = window.require('path');

export const ROOT_DIR = window.__ENV === 'production'
  ? window.process.env.PORTABLE_EXECUTABLE_DIR
  : path.join(window.process.env.INIT_CWD, './src/');

export const PATH_TO_WALLETS = window.__ENV === 'production'
  ? path.join(window.process.env.PORTABLE_EXECUTABLE_DIR, './wallets/')
  : path.join(window.process.env.INIT_CWD, './src/wallets/');

export const PATH_TO_CONTRACTS = window.__ENV === 'production'
  ? path.join(window.process.env.PORTABLE_EXECUTABLE_DIR, './contracts/')
  : path.join(window.process.env.INIT_CWD, './src/contracts/');
