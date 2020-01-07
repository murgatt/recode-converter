import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import FileSelector from '../components/FileSelector';
import { setSources } from '../store/source/source.actions';

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
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFilesSelected = selectedFiles => {
        dispatch(setSources(Object.values(selectedFiles)));
        history.push('/converter');
    };

    return (
        <div className={classes.root}>
            <FileSelector onFilesSelected={handleFilesSelected} />
        </div>
    );
};
