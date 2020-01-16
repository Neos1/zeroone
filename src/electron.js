const {
  app, BrowserWindow, shell, ipcMain,
} = require('electron');
const electronLocalShortcut = require('electron-localshortcut');
const isDev = require('electron-is-dev');
const path = require('path');
const solc = require('solc');

let mainWindow;
let loadingScreen;

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
    alwaysOnTop: true,
  });
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(`file://${__dirname}/splash.html`);
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
