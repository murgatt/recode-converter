const electron = require('electron');
const ffmpeg = require('./ffmpeg');

const ipcMain = electron.ipcMain;

class Conversion {
    constructor(window) {
        this.window = window;

        ipcMain.on('ffmpeg-run-conversion', async (event, inputList) => {
            await this.runFilesConversion(inputList);
        });
    }

    fileConversionEnd(file) {
        this.window.send('file-conversion-end', { file });
    }

    fileConversionProgress(file, progression) {
        this.window.send('file-conversion-progress', { file, progression });
    }

    fileProgressionStarted(file) {
        this.window.send('file-conversion-started', { file });
    }

    async runFilesConversion(inputList) {
        for (let i = 0; i < inputList.length; i++) {
            const input = inputList[i];
            await ffmpeg.convert({ input });
        }
    };
}

module.exports = Conversion;
