import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CircularProgress, LinearProgress, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import VideoIcon from '@material-ui/icons/MovieOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '../IconButton';
import { FILE_STATUS } from '../../store/file/file.constants';
import { getIsConversionRunning } from '../../store/conversion/conversion.selectors';

const useStyles = makeStyles(theme => ({
    file: {
        '&:last-child': {
            marginBottom: 0,
        },
        marginBottom: theme.spacing(),
    },
    progressWrapper: {
        height: 4,
    },
    successIcon: {
        color: theme.palette.success.main,
    },
}));

const File = ({ file, onDeleteFile }) => {
    const { name, path, progress, status } = file;
    const classes = useStyles();
    const { t } = useTranslation();
    const isConverting = status === FILE_STATUS.converting;
    const isConversionRunning = useSelector(getIsConversionRunning);
    const deleteActionIsDisabled = isConverting || isConversionRunning;

    const icon = useMemo(() => {
        switch (status) {
            case FILE_STATUS.complete:
                return <CheckIcon className={classes.successIcon} />;
            case FILE_STATUS.converting:
                return <CircularProgress size={24} />;
            case FILE_STATUS.error:
                return <ErrorIcon color="error" />;
            default:
                return <VideoIcon color="action" />;
        }
    }, [status]);

    const deleteAction = (
        <IconButton disabled={deleteActionIsDisabled} label={t('removeFile')} onClick={onDeleteFile}>
            <DeleteIcon />
        </IconButton>
    );

    return (
        <Card className={classes.file} variant="outlined">
            <CardHeader action={deleteAction} avatar={icon} title={name} subheader={path} />
            <div className={classes.progressWrapper}>
                {isConverting && <LinearProgress value={progress} variant="determinate" />}
            </div>
        </Card>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
};

export default File;
