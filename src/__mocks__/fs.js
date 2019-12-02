/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const path = require('path');

// eslint-disable-next-line no-undef
const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);

function __setMockFiles(files) {
  mockFiles = Object.create(null);

  for (const file in files) {
    const dir = file;

    if (!mockFiles[dir]) {
      mockFiles[dir] = '';
    }

    mockFiles[dir] = files[file];
  }
}

function readFileSync(src) {
  return mockFiles[src];
}

function existsSync(src) {
  return !!mockFiles[src];
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;
fs.existsSync = existsSync;

module.exports = fs;
