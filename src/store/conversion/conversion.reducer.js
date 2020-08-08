import {
    PAUSE_CONVERSION,
    START_CONVERSION,
    CONVERSION_END,
    SET_CONVERSION_LIST,
    CLEAR_CONVERSION_LIST,
} from './conversion.actions';
import { CONVERSION_STATUS } from './conversion.constants';

const initialState = {
    conversionList: [],
    status: CONVERSION_STATUS.pause,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PAUSE_CONVERSION:
        case CONVERSION_END:
            return {
                ...state,
                status: CONVERSION_STATUS.pause,
            };
        case START_CONVERSION:
            return {
                ...state,
                status: CONVERSION_STATUS.converting,
            };
        case SET_CONVERSION_LIST:
            return {
                ...state,
                conversionList: action.conversionList,
            };
        case CLEAR_CONVERSION_LIST:
            return {
                ...state,
                conversionList: [],
            };
        default:
            return state;
    }
};
