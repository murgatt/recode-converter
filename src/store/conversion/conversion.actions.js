import { openSnackbar } from '../snackbar/snackbar.actions';
import { getConversionSettings } from '../conversionSettings/conversionSettings.selectors';
import { getDestination, getFilesToConvert } from '../file/file.selectors';
import { getConversionList } from './conversion.selectors';
import i18n from '../../i18n';

const { ipcRenderer } = window.require('electron');

export const PAUSE_CONVERSION = 'conversion/PAUSE_CONVERSION';
export const START_CONVERSION = 'conversion/START_CONVERSION';
export const CONVERSION_END = 'conversion/CONVERSION_END';
export const SET_CONVERSION_LIST = 'conversion/ADD_FILES_TO_CONVERSION_LIST';
export const CLEAR_CONVERSION_LIST = 'conversion/CLEAR_CONVERSION_LIST';

export const addFilesToConversionList = fileList => dispatch => {
    const conversionList = fileList.map(file => file.path);
    dispatch({ conversionList, type: SET_CONVERSION_LIST });
};

export const clearConversionList = dispatch => dispatch({ type: CLEAR_CONVERSION_LIST });

export const removeFileFromConversionList = filePath => (dispatch, getState) => {
    const conversionList = getConversionList(getState());
    const index = conversionList.indexOf(filePath);

    if (index > -1) {
        conversionList.splice(index, 1);
        dispatch({ conversionList, type: SET_CONVERSION_LIST });
    }
};

export const pauseConversion = dispatch => {
    dispatch(clearConversionList);
    dispatch({ type: PAUSE_CONVERSION });
    dispatch(openSnackbar(i18n.t('converter.conversion.conversionPauseMessage')));
    ipcRenderer.send('ffmpeg-pause-conversion');
};

export const startConversion = (dispatch, getState) => {
    const conversionSettings = getConversionSettings(getState());
    const selectedDestination = getDestination(getState());
    const destination = selectedDestination === i18n.t('global.sameAsSource') ? '' : selectedDestination;
    const fileList = getFilesToConvert(getState());

    if (fileList.length) {
        dispatch(addFilesToConversionList(fileList));
        dispatch({ type: START_CONVERSION });
        ipcRenderer.send('ffmpeg-run-conversion', { destination, fileList, options: conversionSettings });
    }
};

export const endConversion = dispatch => dispatch({ type: CONVERSION_END });

export const checkConversionProgress = (dispatch, getState) => {
    const conversionList = getConversionList(getState());
    if (conversionList.length === 0) {
        dispatch(endConversion);
    }
};
