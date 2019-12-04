// eslint-disable-next-line no-undef
const fs = jest.genMockFromModule('fs');

let mockFiles = {};

function __setMockFiles(files) {
  mockFiles = {};

  const keys = Object.keys(files);

  keys.forEach((filePath) => {
    if (!mockFiles[filePath]) {
      mockFiles[filePath] = '';
    }
    mockFiles[filePath] = files[filePath];
  });
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
