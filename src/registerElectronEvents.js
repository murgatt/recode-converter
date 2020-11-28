import store from './store';
import {
    setFileConversionEnd,
    setFileConversionError,
    setFileConversionProgress,
    setFileConversionStart,
    setFileData,
} from './store/file/file.actions';
import { openFfmpegAlert, openVersionAlert } from './store/ui/ui.actions';
import { compareVersions } from './utils';
import { GITHUB_API_URL } from './constants';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('file-conversion-end', (event, data) => {
    const { filePath } = data;
    store.dispatch(setFileConversionEnd(filePath));
});

ipcRenderer.on('file-conversion-error', (event, data) => {
    const { filePath, err, stderr, stdout } = data;
    store.dispatch(setFileConversionError(filePath));
    // eslint-disable-next-line no-console
    console.error(`Conversion error for file ${filePath}`, err, stderr, stdout);
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

ipcRenderer.on('app-version', async (event, data) => {
    const { version } = data;
    const response = await fetch(GITHUB_API_URL);

    if (!response.ok) {
        return;
    }

    const latestRelease = await response.json();
    const latestReleaseVersion = latestRelease.name.replace('v', '');
    const compare = compareVersions(latestReleaseVersion, version);

    if (compare === 1) {
        store.dispatch(openVersionAlert);
    }
});
