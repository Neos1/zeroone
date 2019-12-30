const {
  app, BrowserWindow, shell, ipcMain,
} = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');
const solc = require('solc');

let mainWindow;

/**
 *
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    useContentSize: true,
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // eslint-disable-next-line no-unused-expressions

  isDev
    ? process.env.NODE_ENV = 'production'
    : process.env.NODE_ENV = 'development';

  mainWindow.setMenu(null);

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });


  mainWindow.webContents.browserWindowOptions.solc = solc;

  electronLocalshortcut.register(mainWindow, 'F12', () => {
    mainWindow.webContents.toggleDevTools();
  });

  ipcMain.on('compile-request', ((event, input) => {
    const data = {
      language: 'Solidity',
      sources: {
        'test.sol': {
          content: input,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*'],
          },
        },
      },
    };
    const output = JSON.parse(solc.compile(JSON.stringify(data)));
    console.log(output);
    mainWindow.webContents.send('contract-compiled', output.contracts['test.sol']);
  }));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
