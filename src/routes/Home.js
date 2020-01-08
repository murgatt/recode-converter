import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, makeStyles } from '@material-ui/core';
import FileInput from '../components/FileInput';
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
    const { t } = useTranslation();

    const handleFilesSelected = useCallback(files => {
        console.log(files);
        dispatch(setSources(Object.values(files)));
        history.push('/converter');
    }, []);

    return (
        <div className={classes.root}>
            <Button color="primary" component="label" variant="outlined">
                {t('selectFiles')}
                <FileInput onChange={handleFilesSelected} />
            </Button>
        </div>
    );
};
