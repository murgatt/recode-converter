import { areFilesFromSameDirectory, getDirPathFromFilePath, normalizeFiles } from './file.utils';
import { FILE_STATUS } from './file.constants';
import { getFilesById, getIsDestinationManuallySet } from './file.selectors';
import { checkConversionProgress } from '../conversion/conversion.actions';
import i18n from '../../i18n';

const { ipcRenderer } = window.require('electron');

export const ADD_FILES = 'file/ADD_FILES';
export const CLEAR_FILES = 'file/CLEAR_FILES';
export const SET_FILES = 'file/SET_FILES';
export const UPDATE_FILES = 'file/UPDATE_FILES';
export const DELETE_FILES = 'file/DELETE_FILES';
export const SET_DESTINATION = 'file/SET_DESTINATION';

export const setDestination = (destination, isDestinationManuallySet = false) => dispatch =>
    dispatch({ destination, isDestinationManuallySet, type: SET_DESTINATION });

export const setDestinationFromFiles = (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const isDestinationManuallySet = getIsDestinationManuallySet(getState());
    const files = Object.values(filesById);
    if (isDestinationManuallySet) return;

    if (!files.length) {
        dispatch(setDestination(''));
    } else if (areFilesFromSameDirectory(files)) {
        const path = getDirPathFromFilePath(files[0].path);
        dispatch(setDestination(path));
    } else {
        dispatch(setDestination(i18n.t('sameAsSource')));
    }
};

export const getFilesData = files => {
    const filePaths = files.map(file => file.path);
    ipcRenderer.send('ffprobe-get-files-data', filePaths);
};

export const addFiles = files => dispatch => {
    const normalizedFiles = normalizeFiles(files);
    dispatch({ files: normalizedFiles, type: ADD_FILES });
    getFilesData(normalizedFiles);
    dispatch(setDestinationFromFiles);
};
export const setFiles = files => dispatch => {
    const normalizedFiles = normalizeFiles(files);
    dispatch({ files: normalizedFiles, type: SET_FILES });
    getFilesData(normalizedFiles);
    dispatch(setDestinationFromFiles);
};
export const deleteFiles = filesIds => dispatch => {
    dispatch({ filesIds, type: DELETE_FILES });
    dispatch(setDestinationFromFiles);
};
export const clearFiles = dispatch => {
    dispatch({ type: CLEAR_FILES });
    dispatch(setDestination(''));
};

export const setFileConversionEnd = fileId => async (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const file = {
        ...filesById[fileId],
        progress: 100,
        status: FILE_STATUS.complete,
    };
    dispatch({ files: file, type: UPDATE_FILES });
    dispatch(checkConversionProgress);
};

export const setFileConversionError = fileId => (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const file = {
        ...filesById[fileId],
        status: FILE_STATUS.error,
    };
    dispatch({ files: file, type: UPDATE_FILES });
    dispatch(checkConversionProgress);
};

export const setFileConversionProgress = (fileId, progress) => (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const file = {
        ...filesById[fileId],
        progress: Math.round(progress.percent),
        status: FILE_STATUS.converting,
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileConversionStart = fileId => (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const file = {
        ...filesById[fileId],
        progress: 0,
        status: FILE_STATUS.converting,
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileData = (fileId, fileData) => (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const file = {
        ...filesById[fileId],
        ...fileData,
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const addStreamToIgnore = (fileId, streamIndex) => (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const { ignoredStreams } = filesById[fileId];
    if (!ignoredStreams.includes(streamIndex)) {
        ignoredStreams.push(streamIndex);
        const file = {
            ...filesById[fileId],
            ignoredStreams,
        };
        dispatch({ files: file, type: UPDATE_FILES });
    }
};

export const removeStreamToIgnore = (fileId, streamIndex) => (dispatch, getState) => {
    const filesById = getFilesById(getState());
    const { ignoredStreams } = filesById[fileId];
    const indexOfIgnoredStream = ignoredStreams.indexOf(streamIndex);
    if (indexOfIgnoredStream !== -1) {
        ignoredStreams.splice(indexOfIgnoredStream, 1);
        const file = {
            ...filesById[fileId],
            ignoredStreams,
        };
        dispatch({ files: file, type: UPDATE_FILES });
    }
};
