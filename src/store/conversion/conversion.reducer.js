import { PAUSE_CONVERSION, START_CONVERSION, CONVERSION_END } from './conversion.actions';
import { CONVERSION_STATUS } from './conversion.constants';

const initialState = {
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
        default:
            return state;
    }
};
