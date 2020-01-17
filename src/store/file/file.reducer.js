import { ADD_FILES, CLEAR_FILES, SET_FILES, UPDATE_FILES } from './file.actions';
import Normalizer from '../normalizer';

const initialState = {
    fileIds: [],
    filesById: {},
};

const fileNormalizer = new Normalizer('fileIds', 'filesById', 'path');

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILES:
            return fileNormalizer.append(state, action.files);
        case SET_FILES:
            return fileNormalizer.set(state, action.files);
        case CLEAR_FILES:
            return initialState;
        case UPDATE_FILES:
            return fileNormalizer.update(state, action.files);
        default:
            return state;
    }
};
