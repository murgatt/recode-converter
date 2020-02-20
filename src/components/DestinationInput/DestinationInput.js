import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAdornment, OutlinedInput, makeStyles } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import IconButton from '../IconButton';
import { setDestination } from '../../store/file/file.actions';
import { getDestination } from '../../store/file/file.selectors';

const { dialog } = window.require('electron').remote;

const useStyles = makeStyles({
    destinationInput: {
        width: '40%',
    },
});

const DestinationInput = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const destination = useSelector(getDestination);
    const classes = useStyles();

    const handleDestinationChange = useCallback(async () => {
        const path = await dialog.showOpenDialog({
            properties: ['openDirectory'],
        });

        if (path && path.filePaths.length) {
            dispatch(setDestination(path.filePaths[0], true));
        }
    }, []);

    const endAdornment = (
        <InputAdornment position="end">
            <IconButton onClick={handleDestinationChange} component="label" size="small" label={t('selectDestination')}>
                <FolderIcon />
            </IconButton>
        </InputAdornment>
    );

    return (
        <OutlinedInput
            className={classes.destinationInput}
            disabled
            endAdornment={endAdornment}
            labelWidth={0}
            margin="dense"
            placeholder={t('destination')}
            value={destination}
            variant="outlined"
        />
    );
};

export default DestinationInput;
