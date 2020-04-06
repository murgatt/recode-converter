import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './snackbar.actions';

const initialState = {
    message: '',
    open: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLOSE_SNACKBAR:
            return initialState;
        case OPEN_SNACKBAR:
            return { message: action.message, open: true };
        default:
            return state;
    }
};
