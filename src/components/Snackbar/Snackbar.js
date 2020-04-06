import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Snackbar as MUISnackbar, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '../IconButton';
import { getSnackbarState } from '../../store/snackbar/snackbar.selectors';
import { closeSnackbar } from '../../store/snackbar/snackbar.actions';

const useStyles = makeStyles({
    snackbar: {
        bottom: 80,
    },
});

const Snackbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { message, open } = useSelector(getSnackbarState);

    const handleClose = useCallback(() => dispatch(closeSnackbar), []);

    const action = (
        <IconButton color="inherit" label={t('close')} onClick={handleClose} size="small">
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <MUISnackbar
            action={action}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
            }}
            autoHideDuration={6000}
            className={classes.snackbar}
            message={message}
            onClose={handleClose}
            open={open}
        />
    );
};

export default Snackbar;
