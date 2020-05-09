import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Toolbar, makeStyles } from '@material-ui/core';
import StartIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseIcon from '@material-ui/icons/Pause';
import AddFileFab from '../AddFileFab';
import IconButton from '../IconButton';
import DestinationInput from '../DestinationInput';
import { getIsConversionRunning } from '../../store/conversion/conversion.selectors';
import { getHasFilesToConvert } from '../../store/file/file.selectors';

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

const BottomBar = ({ onPauseConversion, onStartConversion }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const isConversionRunning = useSelector(getIsConversionRunning);
    const hasFiles = useSelector(getHasFilesToConvert);

    return (
        <Toolbar className={classes.toolbar}>
            <DestinationInput />
            {isConversionRunning ? (
                <IconButton onClick={onPauseConversion}>
                    <PauseIcon />
                </IconButton>
            ) : (
                <IconButton disabled={!hasFiles} label={t('conversion.startConversion')} onClick={onStartConversion}>
                    <StartIcon />
                </IconButton>
            )}
            <AddFileFab />
        </Toolbar>
    );
};

BottomBar.propTypes = {
    onPauseConversion: PropTypes.func,
    onStartConversion: PropTypes.func,
};

BottomBar.defaultProps = {
    onPauseConversion: () => {},
    onStartConversion: () => {},
};

export default BottomBar;
