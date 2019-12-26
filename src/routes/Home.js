import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import FileSelector from '../components/FileSelector';

const useStyles = makeStyles({
    root: {
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
    },
});

export default () => {
    const classes = useStyles();
    const history = useHistory();

    const handleFilesSelected = selectedFiles => {
        console.log('selected files:', selectedFiles);
        history.push('/converter');
    };

    return (
        <div className={classes.root}>
            <FileSelector onFilesSelected={handleFilesSelected} />
        </div>
    );
};
