const { app, BrowserWindow, shell } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const isDev = require('electron-is-dev');
const path = require('path');

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

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  electronLocalshortcut.register(mainWindow, 'F12', () => {
    mainWindow.webContents.toggleDevTools();
  });
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
