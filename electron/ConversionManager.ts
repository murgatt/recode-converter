import { ipcMain } from 'electron';
import { convert } from './convert';
import { getMetadata } from './get-metadata';
import type { ConversionSettings, VideoFile } from '../schema';
import type { BrowserWindow } from 'electron';

export class ConversionManager {
  mainWindow: BrowserWindow;
  isConversionInterrupted: boolean;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.isConversionInterrupted = false;

    ipcMain.handle(
      'start-conversion',
      async (
        _event,
        {
          conversionSettings,
          destinationPath,
          files,
        }: { conversionSettings: ConversionSettings; destinationPath: string; files: VideoFile[] },
      ) => {
        this.isConversionInterrupted = false;

        for (let i = 0; i < files.length; i++) {
          if (this.isConversionInterrupted) {
            break;
          }

          try {
            const file = files[i];
            await convert(
              { conversionSettings, file, destinationPath },
              {
                onFileConversionEnd: filePath => this.handleFileConversionEnd(filePath),
                onFileConversionProgress: (filePath, progress) => this.handleFileConversionProgress(filePath, progress),
                onFileConversionStart: (filePath, commandLine) => this.handleFileConversionStart(filePath, commandLine),
                onFileConversionError: (filePath, error) => this.handleFileConversionError(filePath, error),
              },
            );
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }
        this.mainWindow.webContents.send('conversion-end');
      },
    );

    ipcMain.handle('stop-conversion', () => {
      this.isConversionInterrupted = true;
    });

    ipcMain.handle('get-metadata', async (_event, { filePath }: { filePath: string }) => {
      try {
        const metadata = await getMetadata(filePath);
        this.mainWindow.webContents.send('file-metadata', { filePath, metadata });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
  }

  handleFileConversionStart(filePath: string, ffmpegCommand: string) {
    this.mainWindow.webContents.send('file-conversion-start', { filePath, ffmpegCommand });
  }

  handleFileConversionProgress(filePath: string, progress: number) {
    this.mainWindow.webContents.send('file-conversion-progress', { filePath, progress });
  }

  handleFileConversionEnd(filePath: string) {
    this.mainWindow.webContents.send('file-conversion-end', { filePath });
  }

  handleFileConversionError(filePath: string, error: string) {
    this.mainWindow.webContents.send('file-conversion-error', { filePath, error });
  }
}
