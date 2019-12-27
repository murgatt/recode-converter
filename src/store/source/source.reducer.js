import { ADD_SOURCE, ADD_SOURCES, CLEAR_SOURCES } from './source.actions';

const initialState = {
    sourceIds: [],
    sourcesById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SOURCE:
            return {
                ...initialState,
                sourceIds: [...state.sourceIds, action.source.id],
                sourcesById: {
                    ...state.sourcesById,
                    [action.source.id]: action.source,
                },
            };
        case ADD_SOURCES:
            return {};
        case CLEAR_SOURCES:
            return initialState;
        default:
            return state;
    }
};
