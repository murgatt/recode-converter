import _ from 'lodash-es';
import { areFilesFromSameDirectory, getDirPathFromFilePath } from './file.utils';
import { FILE_STATUS } from './file.constants';
import { CONVERSION_END } from '../conversion/conversion.actions';
import i18n from '../../i18n';

export const ADD_FILES = 'file/ADD_FILES';
export const CLEAR_FILES = 'file/CLEAR_FILES';
export const SET_FILES = 'file/SET_FILES';
export const UPDATE_FILES = 'file/UPDATE_FILES';
export const DELETE_FILES = 'file/DELETE_FILES';
export const SET_DESTINATION = 'file/SET_DESTINATION';

const fileToObject = file => ({
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    path: file.path,
    progress: 0,
    size: file.size,
    status: FILE_STATUS.initial,
    type: file.type,
    webkitRelativePath: file.webkitRelativePath,
});

const normalizeFiles = files => files.map(fileToObject);

export const setDestination = (destination, isDestinationManuallySet = false) => dispatch =>
    dispatch({ destination, isDestinationManuallySet, type: SET_DESTINATION });
export const setDestinationFromFiles = (dispatch, getState) => {
    const { isDestinationManuallySet, filesById } = getState().file;
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

export const addFiles = files => dispatch => {
    dispatch({ files: normalizeFiles(files), type: ADD_FILES });
    dispatch(setDestinationFromFiles);
};
export const setFiles = files => dispatch => {
    dispatch({ files: normalizeFiles(files), type: SET_FILES });
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
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        progress: 100,
        status: FILE_STATUS.complete,
    };
    await dispatch({ files: file, type: UPDATE_FILES });

    const areAllFilesComplete = _.every(filesById, (fileObject, id) => {
        return fileObject.status === FILE_STATUS.complete || fileObject.status === FILE_STATUS.error || id === fileId;
    });
    if (areAllFilesComplete) {
        dispatch({ type: CONVERSION_END });
    }
};

export const setFileConversionError = fileId => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        status: FILE_STATUS.error,
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileConversionProgress = (fileId, progress) => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        progress: Math.round(progress.percent),
        status: FILE_STATUS.converting,
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileConversionStart = fileId => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        progress: 0,
        status: FILE_STATUS.converting,
    };
    dispatch({ files: file, type: UPDATE_FILES });
};
