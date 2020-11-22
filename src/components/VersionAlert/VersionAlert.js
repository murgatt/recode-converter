import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { getIsVersionAlertOpen } from '../../store/ui/ui.selectors';
import { closeVersionAlert } from '../../store/ui/ui.actions';
import { APP_WEBSITE_URL } from '../../constants';

const { shell } = window.require('electron');

const VersionAlert = () => {
    const isVersionAlertOpen = useSelector(getIsVersionAlertOpen);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleConfirmButtonClick = useCallback(() => {
        shell.openExternal(APP_WEBSITE_URL);
    }, []);

    const handleCancelButtonClick = useCallback(() => {
        dispatch(closeVersionAlert);
    }, [dispatch]);

    return (
        <Dialog open={isVersionAlertOpen}>
            <DialogTitle>{t('alert.versionAlert.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('alert.versionAlert.description')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleCancelButtonClick}>
                    {t('global.cancel')}
                </Button>
                <Button color="primary" onClick={handleConfirmButtonClick}>
                    {t('alert.versionAlert.button')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VersionAlert;
