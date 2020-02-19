import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import FileList from '../components/FileList';
import BottomBar from '../components/BottomBar';
import ConversionDrawer from '../components/ConversionDrawer';
import { getDestination, getFilesById } from '../store/file/file.selectors';
import { getConversionSettings } from '../store/conversionSettings/conversionSettings.selectors';

const { ipcRenderer } = window.require('electron');

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
    const classes = useStyles();
    const filesById = useSelector(getFilesById);
    const conversionSettings = useSelector(getConversionSettings);
    const destination = useSelector(getDestination);

    const handleStartConversion = () => {
        const inputList = Object.values(filesById).map(file => file.path);
        ipcRenderer.send('ffmpeg-run-conversion', { destination, inputList, options: conversionSettings });
    };

    return (
        <div className={classes.converter}>
            <div className={classes.fileListWrapper}>
                <FileList />
                <ConversionDrawer />
            </div>
            <BottomBar onStartConversion={handleStartConversion} />
        </div>
    );
};
