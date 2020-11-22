import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { getIsFfmpegAlertOpen } from '../../store/ui/ui.selectors';
import { closeFfmpegAlert } from '../../store/ui/ui.actions';

const FfmpegAlert = () => {
    const isFfmpegAlertOpen = useSelector(getIsFfmpegAlertOpen);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleButtonClick = useCallback(() => {
        dispatch(closeFfmpegAlert);
    }, [dispatch]);

    return (
        <Dialog open={isFfmpegAlertOpen}>
            <DialogTitle>{t('alert.ffmpegAlert.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('alert.ffmpegAlert.description')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleButtonClick}>
                    {t('global.ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FfmpegAlert;
