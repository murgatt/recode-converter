import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import File from '../File';
import { getFileIds, getFilesById } from '../../store/file/file.selectors';
import { deleteFiles } from '../../store/file/file.actions';

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

    const handleDeleteFile = useCallback(fileId => () => dispatch(deleteFiles([fileId])), []);

    return (
        <div className={classes.fileList}>
            <div className={classes.filesWrapper}>
                {fileIds.map(fileId => (
                    <File file={filesById[fileId]} key={fileId} onDeleteFile={handleDeleteFile(fileId)} />
                ))}
            </div>
        </div>
    );
};

export default FileList;
