const electron = require('electron');
const ffprobe = require('node-ffprobe');
const ffmpeg = require('./ffmpeg');

const ipcMain = electron.ipcMain;

class ConversionManager {
    constructor(window) {
        this.window = window;
        this.conversionIsInterrupted = false;
        this.callbacks = {
            onConversionEnd: file => this.fileConversionEnd(file),
            onConversionError: file => this.fileConversionError(file),
            onConversionProgress: (file, progress) => this.fileConversionProgress(file, progress),
            onConversionStart: file => this.fileConversionStart(file),
        };

        ipcMain.on('ffmpeg-run-conversion', async (event, { destination, fileList, options }) => {
            this.conversionIsInterrupted = false;
            await this.runFilesConversion(fileList, options, destination);
        });

        ipcMain.on('ffmpeg-pause-conversion', () => {
            this.conversionIsInterrupted = true;
        });

        ipcMain.on('ffprobe-get-files-data', (event, pathList) => {
            for (let i = 0; i < pathList.length; i++) {
                const filePath = pathList[i];
                ffprobe(filePath).then(fileData => {
                    this.window.send('get-file-data', { fileData, filePath });
                });
            }
        });
    }

    fileConversionEnd(filePath) {
        this.window.send('file-conversion-end', { filePath });
    }

    fileConversionError(filePath) {
        this.window.send('file-conversion-error', { filePath });
    }

    fileConversionProgress(filePath, progress) {
        this.window.send('file-conversion-progress', { filePath, progress });
    }

    fileConversionStart(filePath) {
        this.window.send('file-conversion-started', { filePath });
    }

    async runFilesConversion(fileList, options, destination) {
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (this.conversionIsInterrupted) {
                break;
            }
            try {
                await ffmpeg.convert({ file, callbacks: this.callbacks, options, destination });
            } catch (e) {
                // FAIL SILENTLY
            }
        }
    }
}

module.exports = ConversionManager;
