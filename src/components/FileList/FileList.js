import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import File from '../File';
import FileInput from '../FileInput';
import { getFileIds, getFilesById } from '../../store/file/file.selectors';
import { addFiles, deleteFiles } from '../../store/file/file.actions';

const useStyles = makeStyles(theme => ({
    fab: {
        bottom: theme.spacing(2),
        position: 'absolute',
        right: theme.spacing(2),
    },
    fileList: {
        flex: 1,
        height: '100%',
        position: 'relative',
    },
    filesWrapper: {
        height: '100%',
        overflow: 'auto',
        padding: theme.spacing(2),
    },
}));

const FileList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const fileIds = useSelector(getFileIds);
    const filesById = useSelector(getFilesById);

    const handleFilesSelected = useCallback(selectedFiles => dispatch(addFiles(Object.values(selectedFiles))), []);
    const handleDeleteFile = useCallback(fileId => () => dispatch(deleteFiles([fileId])), []);

    return (
        <div className={classes.fileList}>
            <div className={classes.filesWrapper}>
                {fileIds.map(fileId => (
                    <File file={filesById[fileId]} key={fileId} onDeleteFile={handleDeleteFile(fileId)} />
                ))}
            </div>
            <Fab className={classes.fab} component="label" color="primary" aria-label="add">
                <AddIcon />
                <FileInput onChange={handleFilesSelected} />
            </Fab>
        </div>
    );
};

export default FileList;
