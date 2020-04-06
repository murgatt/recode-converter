export const CLOSE_SNACKBAR = 'snackbar/CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'snackbar/OPEN_SNACKBAR';

export const closeSnackbar = dispatch => dispatch({ type: CLOSE_SNACKBAR });
export const openSnackbar = message => dispatch => dispatch({ message, type: OPEN_SNACKBAR });
