import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Drawer, MenuItem, Select, Toolbar, Typography, makeStyles } from '@material-ui/core';

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
                <Typography variant="subtitle1">{t('conversionSettings')}</Typography>
            </Toolbar>
            <DialogContent>
                <Select value="ac3" variant="outlined">
                    <MenuItem value="ac3">AC3</MenuItem>
                    <MenuItem value="dts">DTS</MenuItem>
                </Select>
            </DialogContent>
        </Drawer>
    );
};

export default ConversionDrawer;
