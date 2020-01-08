import { ADD_SOURCES, CLEAR_SOURCES, SET_SOURCES } from './source.actions';
import Normalizer from '../normalizer';

const initialState = {
    sourceIds: [],
    sourcesById: {},
};

const sourceNormalizer = new Normalizer('sourceIds', 'sourcesById', 'name');

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SOURCES:
            return sourceNormalizer.append(state, action.sources);
        case SET_SOURCES:
            return sourceNormalizer.set(state, action.sources);
        case CLEAR_SOURCES:
            return initialState;
        default:
            return state;
    }
};
