import { openSnackbar } from '../snackbar/snackbar.actions';
import { getConversionSettings } from '../conversionSettings/conversionSettings.selectors';
import { getAreAllFilesComplete, getDestination, getFilesToConvert } from '../file/file.selectors';
import i18n from '../../i18n';

const { ipcRenderer } = window.require('electron');

export const PAUSE_CONVERSION = 'conversion/PAUSE_CONVERSION';
export const START_CONVERSION = 'conversion/START_CONVERSION';
export const CONVERSION_END = 'conversion/CONVERSION_END';

export const pauseConversion = dispatch => {
    dispatch({ type: PAUSE_CONVERSION });
    dispatch(openSnackbar(i18n.t('conversion.conversionPauseMessage')));
    ipcRenderer.send('ffmpeg-pause-conversion');
};

export const startConversion = (dispatch, getState) => {
    const conversionSettings = getConversionSettings(getState());
    const destination = getDestination(getState());
    const fileList = getFilesToConvert(getState());

    if (fileList.length) {
        dispatch({ type: START_CONVERSION });
        ipcRenderer.send('ffmpeg-run-conversion', { destination, fileList, options: conversionSettings });
    }
};

export const endConversion = dispatch => dispatch({ type: CONVERSION_END });

export const checkConversionProgress = (dispatch, getState) => {
    const areAllFilesComplete = getAreAllFilesComplete(getState());
    if (areAllFilesComplete) {
        dispatch(endConversion);
    }
};
