import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Drawer, Tooltip, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import routes from '../../routes';
import MenuItem from './MenuItem';

const useStyles = makeStyles(theme => ({
    button: {
        '& + &': {
            marginTop: theme.spacing(),
        },
        minWidth: 'initial',
    },
    drawer: {
        width: '57px',
    },
    drawerPaper: {
        justifyContent: 'space-between',
        padding: theme.spacing(2, 1),
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const AppMenu = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Drawer className={classes.drawer} PaperProps={{ className: classes.drawerPaper }} variant="permanent">
            <nav className={classes.nav}>
                {routes.map(route => (
                    <MenuItem key={route.name} {...route} />
                ))}
            </nav>
            <Tooltip title={t('appSettings')} enterDelay={500} enterNextDelay={500}>
                <Button aria-label={t('appSettings')} className={classes.button}>
                    <SettingsIcon />
                </Button>
            </Tooltip>
        </Drawer>
    );
};

export default AppMenu;
