export const fs = window.require('fs');
export const path = window.require('path');

const ENV = process.env.NODE_ENV || 'development';
window.__ENV = ENV;

const devPath = window.process.env.INIT_CWD;
const prodPath = window.process.env.PORTABLE_EXECUTABLE_DIR || path.join(window.__dirname, '');

export const ROOT_DIR = window.__ENV === 'production'
  ? prodPath
  : path.join(devPath, './src/');

export const PATH_TO_CONFIG = window.__ENV === 'production'
  ? path.join(prodPath, '../../build/config.json')
  : path.join(devPath, './src/config.json');

export const PATH_TO_WALLETS = window.__ENV === 'production'
  ? path.join(prodPath, '../../build/wallets')
  : path.join(devPath, './src/wallets/');

export const PATH_TO_CONTRACTS = window.__ENV === 'production'
  ? path.join(prodPath, '../../build/contracts')
  : path.join(devPath, './src/contracts/');

export const PATH_TO_DATA = window.__ENV === 'production'
  ? path.join(prodPath, '../../build/data')
  : path.join(devPath, './src/data/');
