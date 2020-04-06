import { FILE_STATUS } from '../file/file.constants';

const { ipcRenderer } = window.require('electron');

export const PAUSE_CONVERSION = 'conversion/PAUSE_CONVERSION';
export const START_CONVERSION = 'conversion/START_CONVERSION';
export const CONVERSION_END = 'conversion/CONVERSION_END';

export const pauseConversion = dispatch => {
    dispatch({ type: PAUSE_CONVERSION });
    ipcRenderer.send('ffmpeg-pause-conversion');
};

export const startConversion = (dispatch, getState) => {
    const { conversionSettings, file } = getState();
    const { destination, filesById } = file;
    const inputList = Object.values(filesById)
        .filter(fileObject => fileObject.status === FILE_STATUS.initial)
        .map(fileObject => fileObject.path);

    if (inputList.length) {
        dispatch({ type: START_CONVERSION });
        ipcRenderer.send('ffmpeg-run-conversion', { destination, inputList, options: conversionSettings });
    }
};

export const endConversion = dispatch => dispatch({ type: CONVERSION_END });
