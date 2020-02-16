import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FileInput from '../FileInput';
import { addFiles } from '../../store/file/file.actions';

const useStyles = makeStyles({
    addFileFab: {
        left: 0,
        margin: '0 auto',
        position: 'absolute',
        right: 0,
        top: -30,
    },
});

const AddFileFab = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation();

    const handleFilesSelected = useCallback(selectedFiles => dispatch(addFiles(Object.values(selectedFiles))), []);

    return (
        <Fab className={classes.addFileFab} component="label" color="primary" aria-label={t('addFiles')}>
            <AddIcon />
            <FileInput onChange={handleFilesSelected} />
        </Fab>
    );
};

export default AddFileFab;
