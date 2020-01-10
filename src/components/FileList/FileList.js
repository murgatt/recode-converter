import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, List, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import File from '../File';
import FileInput from '../FileInput';
import { getSourceIds, getSourcesById } from '../../store/source/source.selectors';
import { addSources } from '../../store/source/source.actions';

const useStyles = makeStyles(theme => ({
    fab: {
        bottom: theme.spacing(2),
        position: 'absolute',
        right: theme.spacing(2),
    },
    root: {
        height: '100vh',
        position: 'relative',
    },
}));

const FileList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const sourceIds = useSelector(getSourceIds);
    const sourcesById = useSelector(getSourcesById);

    const handleFilesSelected = useCallback(selectedFiles => {
        dispatch(addSources(Object.values(selectedFiles)));
    }, []);

    return (
        <div className={classes.root}>
            <List>
                {sourceIds.map(sourceId => (
                    <File file={sourcesById[sourceId]} />
                ))}
            </List>
            <Fab className={classes.fab} component="label" color="primary" aria-label="add">
                <AddIcon />
                <FileInput onChange={handleFilesSelected} />
            </Fab>
        </div>
    );
};

export default FileList;
