import path from 'node:path';
import { initialize, trackEvent } from '@aptabase/electron/main';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { ConversionManager } from './ConversionManager';
import { handleOpenDirectory, handleOpenExternalLink } from './electron';

const DIST = path.join(__dirname, '../dist');
const VITE_PUBLIC = app.isPackaged ? DIST : path.join(DIST, '../public');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

let conversionManager: ConversionManager;

initialize('A-EU-7747122999');

function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: path.join(VITE_PUBLIC, 'icon.png'),
    minWidth: 768,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(DIST, 'index.html'));
  }

  if (conversionManager) {
    conversionManager.mainWindow = mainWindow;
  } else {
    conversionManager = new ConversionManager(mainWindow);
  }

  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);

    return { action: 'deny' };
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  trackEvent('app_started');
  trackEvent('page_view', { path: '/' });
  ipcMain.handle('dialog:openDirectory', handleOpenDirectory);
  ipcMain.handle('shell:openExternalLink', (_event, url: string) => handleOpenExternalLink(url));
  createWindow();
});
