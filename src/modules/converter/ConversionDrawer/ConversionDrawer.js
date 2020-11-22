import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Drawer, Toolbar, Typography, makeStyles } from '@material-ui/core';
import ConversionSettingsForm from '../ConversionSettingsForm';

const useStyles = makeStyles({
    conversionDrawer: {
        width: 400,
    },
    drawerPaper: {
        position: 'static',
    },
});

const ConversionDrawer = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Drawer
            anchor="right"
            className={classes.conversionDrawer}
            classes={{ paper: classes.drawerPaper }}
            open
            variant="persistent"
        >
            <Toolbar>
                <Typography variant="subtitle1">{t('converter.conversionSettings.title')}</Typography>
            </Toolbar>
            <DialogContent>
                <ConversionSettingsForm />
            </DialogContent>
        </Drawer>
    );
};

export default ConversionDrawer;
