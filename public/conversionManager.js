const electron = require('electron');
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

        ipcMain.on('ffmpeg-run-conversion', async (event, { destination, inputList, options }) => {
            this.conversionIsInterrupted = false;
            await this.runFilesConversion(inputList, options, destination);
        });

        ipcMain.on('ffmpeg-pause-conversion', () => {
            this.conversionIsInterrupted = true;
        });
    }

    fileConversionEnd(file) {
        this.window.send('file-conversion-end', { file });
    }

    fileConversionError(file) {
        this.window.send('file-conversion-error', { file });
    }

    fileConversionProgress(file, progress) {
        this.window.send('file-conversion-progress', { file, progress });
    }

    fileConversionStart(file) {
        this.window.send('file-conversion-started', { file });
    }

    async runFilesConversion(inputList, options, destination) {
        for (let i = 0; i < inputList.length; i++) {
            const input = inputList[i];
            if (this.conversionIsInterrupted) {
                break;
            }
            await ffmpeg.convert({ input, callbacks: this.callbacks, options, destination });
        }
    }
}

module.exports = ConversionManager;
