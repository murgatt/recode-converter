const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fixPath = require('fix-path');

fixPath();

const ConversionManager = require('./conversionManager');
const ffmpeg = require('./ffmpeg');

let mainWindow;
let conversionManager;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        minWidth: 830,
        minHeight: 400,
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
    mainWindow.webContents.on('dom-ready', () => {
        ffmpeg.checkFfmpegInstallation(isFfmpegInstalled => {
            if (!isFfmpegInstalled) {
                mainWindow.send('ffmpeg-not-found');
            }
        });

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

ipcMain.on('quit-app', () => {
    app.quit()
});
