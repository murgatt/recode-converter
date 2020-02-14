export const ADD_FILES = 'file/ADD_FILES';
export const CLEAR_FILES = 'file/CLEAR_FILES';
export const SET_FILES = 'file/SET_FILES';
export const UPDATE_FILES = 'file/UPDATE_FILES';
export const DELETE_FILES = 'file/DELETE_FILES';

const fileToObject = file => ({
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    path: file.path,
    progress: 0,
    size: file.size,
    status: 'initial',
    type: file.type,
    webkitRelativePath: file.webkitRelativePath,
});

const normalizeFiles = files => files.map(fileToObject);

export const addFiles = files => dispatch => dispatch({ files: normalizeFiles(files), type: ADD_FILES });
export const clearFiles = dispatch => dispatch({ type: CLEAR_FILES });
export const setFiles = files => dispatch => dispatch({ files: normalizeFiles(files), type: SET_FILES });
export const deleteFiles = filesIds => dispatch => dispatch({ filesIds, type: DELETE_FILES });

export const setFileConversionEnd = fileId => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        progress: 100,
        status: 'complete',
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileConversionError = fileId => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        status: 'error',
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileConversionProgress = (fileId, progress) => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        progress: Math.round(progress.percent),
        status: 'conversion',
    };
    dispatch({ files: file, type: UPDATE_FILES });
};

export const setFileConversionStart = fileId => (dispatch, getState) => {
    const { filesById } = getState().file;
    const file = {
        ...filesById[fileId],
        progress: 0,
        status: 'conversion',
    };
    dispatch({ files: file, type: UPDATE_FILES });
};
