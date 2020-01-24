const {
  app, BrowserWindow, shell, ipcMain, dialog,
} = require('electron');
const electronLocalShortcut = require('electron-localshortcut');
const isDev = require('electron-is-dev');
const path = require('path');
const solc = require('solc');

let mainWindow;
let loadingScreen;

/**
 *
 */
function createLoadingScreen() {
  loadingScreen = new BrowserWindow({
    minWidth: 539,
    minHeight: 539,
    width: 539,
    height: 539,
    center: true,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    frame: false,
    skipTaskbar: true,
    resizable: false,
    alwaysOnTop: false,
  });
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(`file://${__dirname}/splash.html`);
  // eslint-disable-next-line no-return-assign
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}
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
    // show to false mean than the window will proceed with its
    // lifecycle, but will not render until we will show it up
    show: false,
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  process.env.NODE_ENV = isDev
    ? 'production'
    : 'development';

  mainWindow.setMenu(null);

  // eslint-disable-next-line no-return-assign
  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  electronLocalShortcut.register(mainWindow, 'F12', () => {
    mainWindow.webContents.toggleDevTools();
  });

  // keep listening on the did-finish-load event, when the mainWindow content has loaded
  mainWindow.webContents.on('did-finish-load', () => {
    // then close the loading screen window and show the main window
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
  });

  ipcMain.on('config-problem', (event, filePath) => {
    dialog.showErrorBox('File reading error', `File ${filePath} is corrupted, please check it`);
    loadingScreen.close();
  });

  ipcMain.on('change-language:request', ((event, value) => {
    mainWindow.webContents.send('change-language:confirm', value);
  }));

  ipcMain.on('compile-request', ((event, input) => {
    const { contract, type } = input;
    const data = {
      language: 'Solidity',
      sources: {
        'test.sol': {
          content: contract,
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
    mainWindow.webContents.send('contract-compiled', output.contracts['test.sol'][type]);
  }));
}

app.on('ready', () => {
  createLoadingScreen();
  createWindow();
});

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
