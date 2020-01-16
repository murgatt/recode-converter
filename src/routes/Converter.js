import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import FileList from '../components/FileList';
import BottomBar from '../components/BottomBar';
import { getSourcesById } from '../store/source/source.selectors';

const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles({
    converter: {
        height: '100%',
    },
    fileListWrapper: {
        height: 'calc(100% - 48px)',
    },
});

export default () => {
    const [test, setTest] = useState('');
    const classes = useStyles();
    const sourcesById = useSelector(getSourcesById);

    const handleStartConversion = () => {
        const pathList = Object.values(sourcesById).map(source => source.path);
        ipcRenderer.send('ffmpeg-run-conversion', pathList);
    };

    ipcRenderer.on('conversion-end', () => {
        setTest('ceonversion end');
    });

    return (
        <div className={classes.converter}>
            <div className={classes.fileListWrapper}>
                Test: {test}
                <FileList />
            </div>
            <BottomBar onStartConversion={handleStartConversion} />
        </div>
    );
};
