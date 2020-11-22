import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import FileList from '../modules/converter/FileList';
import BottomBar from '../modules/converter/BottomBar';
import ConversionDrawer from '../modules/converter/ConversionDrawer';
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

const ConverterPage = () => {
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

export default ConverterPage;
