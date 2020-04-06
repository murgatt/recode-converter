import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import FileList from '../components/FileList';
import BottomBar from '../components/BottomBar';
import ConversionDrawer from '../components/ConversionDrawer';
import { pauseConversion, startConversion } from '../store/conversion/conversion.actions';

const useStyles = makeStyles({
    converter: {
        height: '100%',
    },
    fileListWrapper: {
        display: 'flex',
        height: 'calc(100% - 64px)',
    },
});

export default () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleStartConversion = useCallback(() => dispatch(startConversion), [dispatch]);
    const handlePauseConversion = useCallback(() => dispatch(pauseConversion), [dispatch]);

    return (
        <div className={classes.converter}>
            <div className={classes.fileListWrapper}>
                <FileList />
                <ConversionDrawer />
            </div>
            <BottomBar onPauseConversion={handlePauseConversion} onStartConversion={handleStartConversion} />
        </div>
    );
};
