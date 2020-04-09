import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Typography, makeStyles } from '@material-ui/core';
import DropIcon from '@material-ui/icons/GetAppOutlined';
import FileInput from '../components/FileInput';
import Dropzone from '../components/Dropzone';
import { setFiles } from '../store/file/file.actions';

const useStyles = makeStyles({
    dropIcon: {
        fontSize: 274,
        opacity: 0.1,
        position: 'absolute',
    },
    home: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
    },
});

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const handleFilesSelected = useCallback(
        files => {
            dispatch(setFiles(Object.values(files)));
            history.push('/converter');
        },
        [dispatch, history],
    );

    return (
        <div className={classes.home}>
            <Dropzone onDrop={handleFilesSelected}>
                <DropIcon className={classes.dropIcon} color="action" fontSize="large" />
                <Typography gutterBottom variant="subtitle1">
                    {t('home.dropFiles')}
                </Typography>
                <Typography paragraph variant="subtitle2">
                    {t('home.or')}
                </Typography>
                <Button color="primary" component="label" variant="outlined">
                    {t('home.browseFiles')}
                    <FileInput onChange={handleFilesSelected} />
                </Button>
            </Dropzone>
        </div>
    );
};
