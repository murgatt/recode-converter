import store from './store';
import {
    setFileConversionEnd,
    setFileConversionError,
    setFileConversionProgress,
    setFileConversionStart,
    setFileData,
} from './store/file/file.actions';
import { openFfmpegAlert } from './store/ui/ui.actions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('file-conversion-end', (event, data) => {
    const { filePath } = data;
    store.dispatch(setFileConversionEnd(filePath));
});

ipcRenderer.on('file-conversion-error', (event, data) => {
    const { filePath } = data;
    store.dispatch(setFileConversionError(filePath));
});

ipcRenderer.on('file-conversion-progress', (event, data) => {
    const { filePath, progress } = data;
    store.dispatch(setFileConversionProgress(filePath, progress));
});

ipcRenderer.on('file-conversion-started', (event, data) => {
    const { filePath } = data;
    store.dispatch(setFileConversionStart(filePath));
});

ipcRenderer.on('get-file-data', (event, data) => {
    const { fileData, filePath } = data;
    store.dispatch(setFileData(filePath, fileData));
});

ipcRenderer.on('ffmpeg-not-found', () => {
    store.dispatch(openFfmpegAlert);
});
