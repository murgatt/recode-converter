import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Toolbar, makeStyles } from '@material-ui/core';
import StartIcon from '@material-ui/icons/PlayArrowOutlined';
import AddFileFab from '../AddFileFab';
import IconButton from '../IconButton';
import DestinationInput from '../DestinationInput';

const useStyles = makeStyles(theme => ({
    bottomBar: {
        bottom: 0,
        top: 'auto',
    },
    toolbar: {
        background: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        borderTopStyle: 'solid',
        borderTopWidth: 1,
        bottom: 0,
        justifyContent: 'space-between',
        top: 'auto',
    },
}));

const BottomBar = ({ onStartConversion }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <DestinationInput />
            <IconButton label={t('startConversion')} onClick={onStartConversion}>
                <StartIcon />
            </IconButton>
            <AddFileFab />
        </Toolbar>
    );
};

BottomBar.propTypes = {
    onStartConversion: PropTypes.func,
};

BottomBar.defaultProps = {
    onStartConversion: () => {},
};

export default BottomBar;
