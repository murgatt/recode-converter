import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAdornment, OutlinedInput, makeStyles } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import IconButton from '../IconButton';
import { setDestination } from '../../store/file/file.actions';
import { getDestination } from '../../store/file/file.selectors';
import { getDirPathFromFilePath } from '../../store/file/utils';

const useStyles = makeStyles({
    destinationInput: {
        width: 400,
    },
});

const DestinationInput = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const destination = useSelector(getDestination);
    const classes = useStyles();

    const handleDestinationChange = useCallback(event => {
        const file = event.target.files[0];
        if (file) {
            const path = getDirPathFromFilePath(file.path);
            dispatch(setDestination(path, true));
        }
    }, []);

    const endAdornment = (
        <InputAdornment position="end">
            <IconButton component="label" size="small" label={t('selectDestination')}>
                <FolderIcon />
                <input
                    id="picker"
                    onChange={handleDestinationChange}
                    style={{ display: 'none' }}
                    type="file"
                    webkitdirectory=""
                />
            </IconButton>
        </InputAdornment>
    );

    return (
        <OutlinedInput
            className={classes.destinationInput}
            disabled
            endAdornment={endAdornment}
            margin="dense"
            placeholder={t('destination')}
            size="small"
            value={destination}
            variant="outlined"
        />
    );
};

export default DestinationInput;
