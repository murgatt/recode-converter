import store from './store';
import {
    setFileConversionEnd,
    setFileConversionError,
    setFileConversionProgress,
    setFileConversionStart,
    setFileData,
} from './store/file/file.actions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('file-conversion-end', (event, data) => {
    const { file } = data;
    store.dispatch(setFileConversionEnd(file));
});

ipcRenderer.on('file-conversion-error', (event, data) => {
    const { file } = data;
    store.dispatch(setFileConversionError(file));
});

ipcRenderer.on('file-conversion-progress', (event, data) => {
    const { file, progress } = data;
    store.dispatch(setFileConversionProgress(file, progress));
});

ipcRenderer.on('file-conversion-started', (event, data) => {
    const { file } = data;
    store.dispatch(setFileConversionStart(file));
});

ipcRenderer.on('get-file-data', (event, data) => {
    const { file, fileData } = data;
    store.dispatch(setFileData(file, fileData));
});
