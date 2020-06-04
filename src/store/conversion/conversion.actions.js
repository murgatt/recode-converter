import { FILE_STATUS } from '../file/file.constants';
import { openSnackbar } from '../snackbar/snackbar.actions';
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
    const { conversionSettings, file } = getState();
    const { destination, filesById } = file;
    const fileList = Object.values(filesById).filter(fileObject => fileObject.status === FILE_STATUS.initial);

    if (fileList.length) {
        dispatch({ type: START_CONVERSION });
        ipcRenderer.send('ffmpeg-run-conversion', { destination, fileList, options: conversionSettings });
    }
};

export const endConversion = dispatch => dispatch({ type: CONVERSION_END });
