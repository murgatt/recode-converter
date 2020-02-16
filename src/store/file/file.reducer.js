import { ADD_FILES, CLEAR_FILES, SET_FILES, UPDATE_FILES, DELETE_FILES, SET_DESTINATION } from './file.actions';
import Normalizer from '../normalizer';

const initialState = {
    destination: '',
    fileIds: [],
    filesById: {},
    isDestinationManuallySet: false,
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
        case DELETE_FILES:
            return fileNormalizer.delete(state, action.filesIds);
        case SET_DESTINATION:
            return {
                ...state,
                destination: action.destination,
                isDestinationManuallySet: action.isDestinationManuallySet,
            };
        default:
            return state;
    }
};
