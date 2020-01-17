import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import FileList from '../components/FileList';
import BottomBar from '../components/BottomBar';
import { getFilesById } from '../store/file/file.selectors';

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
    const filesById = useSelector(getFilesById);

    const handleStartConversion = () => {
        const pathList = Object.values(filesById).map(file => file.path);
        ipcRenderer.send('ffmpeg-run-conversion', pathList);
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
