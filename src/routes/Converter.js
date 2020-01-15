import React from 'react';
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
    const classes = useStyles();
    const sourcesById = useSelector(getSourcesById);

    const handleStartConversion = () => {
        const pathList = Object.values(sourcesById).map(source => source.path);
        ipcRenderer.sendSync('ffmpeg-run-conversion', pathList);
    };

    return (
        <div className={classes.converter}>
            <div className={classes.fileListWrapper}>
                <FileList />
            </div>
            <BottomBar onStartConversion={handleStartConversion} />
        </div>
    );
};
