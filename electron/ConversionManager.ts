import { ipcMain } from 'electron';
import type { VideoFile } from '../src/types/file.types';
import type { BrowserWindow } from 'electron';

export class ConversionManager {
  mainWindow: BrowserWindow;
  isConversionInterrupted: boolean;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.isConversionInterrupted = false;

    ipcMain.handle('start-conversion', (_event, { files }: { files: VideoFile[] }) => {
      this.isConversionInterrupted = false;
      this.handleFileConversionStart(files[0].path);
    });

    ipcMain.handle('stop-conversion', () => {
      this.isConversionInterrupted = true;
    });
  }

  handleFileConversionStart(filePath: string) {
    this.mainWindow.webContents.send('file-conversion-start', { filePath });
  }

  handleFileConversionProgress() {
    this.mainWindow.webContents.send('file-conversion-progress');
  }

  handleFileConversionEnd() {
    this.mainWindow.webContents.send('file-conversion-end');
  }

  handleFileConversionError() {
    this.mainWindow.webContents.send('file-conversion-error');
  }
}
