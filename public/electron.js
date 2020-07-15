const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const ConversionManager = require('./conversionManager');

let mainWindow;
let conversionManager;
const iconPath = path.join(__dirname, 'icon.png');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        minWidth: 830,
        minHeight: 400,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    if (!conversionManager) {
        conversionManager = new ConversionManager(mainWindow);
    } else {
        conversionManager.window = mainWindow;
    }
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => {
        mainWindow = null;
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
