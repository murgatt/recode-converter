import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, LinearProgress, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import LoadIcon from '@material-ui/icons/Loop';
import VideoIcon from '@material-ui/icons/MovieOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '../IconButton';

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

    const icon = useMemo(() => {
        switch (status) {
            case 'complete':
                return <CheckIcon className={classes.successIcon} />;
            case 'conversion':
                return <LoadIcon />;
            case 'error':
                return <ErrorIcon color="error" />;
            default:
                return <VideoIcon color="action" />;
        }
    }, [status]);

    const deleteAction = (
        <IconButton label={t('removeFile')} onClick={onDeleteFile}>
            <DeleteIcon />
        </IconButton>
    );

    return (
        <Card className={classes.file} variant="outlined">
            <CardHeader action={deleteAction} avatar={icon} title={name} subheader={path} />
            <div className={classes.progressWrapper}>
                {status === 'conversion' && <LinearProgress value={progress} variant="determinate" />}
            </div>
        </Card>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
};

export default File;
